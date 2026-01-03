import { Message } from "@/types/Message";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FAB, IconButton, Modal, Portal, Snackbar, Text, TextInput } from "react-native-paper";
import { Socket } from "socket.io-client";
import io from "../apis/WebsocketConfiguration";
import ChatItemComponent from "./ChatItemComponent";

function ChatComponent() {
    const socket = React.useRef<Socket | undefined>(undefined);
    const [chatVisible, setChatVisible] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>("");
    const [visibleNotification, setVisibleNotification] = React.useState(false);
    const [notificationContent, setNotificationContent] = React.useState("");
    const [messages, setMessages] = React.useState<Message[]>([]);
    const router = useRouter();
    const [page, setPage] = React.useState<number>(1);
    const [hasMoreMessage, setHasMoreMessage] = React.useState(true);
    const token = SecureStore.getItem('token') as string;
    const email = JSON.parse(atob(token.split('.')[1]))['sub'];
    const removeConnectSocket = (socketIO: Socket) => {
        console.log('disconnect')
        socketIO.off('messages');
        socketIO.off('chat');
        socketIO.disconnect();
    }
    React.useEffect(() => {
        const socketIO = io();
        if (!socketIO) {
            router.replace({
                pathname: "/(drawer)/home/LoginScreen"
            });
            return;
        }
        socketIO.on('exception', () => {
            console.log('Exception');
            router.replace({
                pathname: "/(drawer)/home/LoginScreen",
                params: {
                    exception: 401
                }
            });
            return;
        })
        socket.current = socketIO;
        socketIO.on("connect", () => {
            setNotificationContent("Connect Socket Success!");
            setVisibleNotification(true);
        });
        socketIO.on("messages", (data: Message[]) => {
            if (data.length)
                setMessages(prev => [...prev, ...data]);
            else
                setHasMoreMessage(false);
        });
        socketIO.on('chat', () => {
            if (page > 1) {
                setMessages([]);
                setPage(1);
                setHasMoreMessage(true);
                console.log(page)
            }
            setMessage("");
        });
        return () => removeConnectSocket(socketIO);
    }, []);
    React.useEffect(() => {
        if (hasMoreMessage) {
            socket.current?.emit('messages', {
                page: page
            })
        }
    }, [page]);
    const sendMessage = () => {
        socket.current?.emit("chat", message);
    };
    const styles = StyleSheet.create({
        FABIcon: {
            position: "absolute",
            bottom: 10,
            right: 0,
            marginRight: 5,
            borderRadius: "50%",
            backgroundColor: "#000"
        },
        contentChatModal: {
            backgroundColor: "#ccc",
            padding: 10,
            marginHorizontal: 30,
            marginVertical: 100,
            borderRadius: 20,
            flex: 1,
            justifyContent: "space-between"
        }
    });
    return <>
        <Snackbar visible={visibleNotification} onDismiss={() => setVisibleNotification(false)} duration={7000}>
            {notificationContent}
        </Snackbar>
        <Portal>
            <Modal
                visible={chatVisible}
                onDismiss={() => {
                    setChatVisible(false);
                    removeConnectSocket(socket.current as Socket);
                }}
                contentContainerStyle={styles.contentChatModal}
            >
                <View style={{ flex: 1, backgroundColor: "#ccc" }}>
                    {messages.length ? <FlatList
                        data={messages}
                        renderItem={({ item }) => <ChatItemComponent message={item} email={email} />}
                        keyExtractor={(item) => item._id}
                        onEndReached={() => {
                            if (hasMoreMessage) { setPage(page => page + 1); }
                        }}
                    /> : <Text>No Messages</Text>}
                </View>
                <View
                    style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10 }}
                >
                    <TextInput
                        placeholder="Nhập tin nhắn..."
                        value={message}
                        onChangeText={(value) => setMessage(value)}
                        style={{ flex: 1, borderRadius: 10 }}
                    />
                    <IconButton onPress={sendMessage} icon={"send"} size={25} style={{ borderRadius: 999, backgroundColor: "#000" }} />
                </View>
            </Modal>
        </Portal>
        <FAB
            icon={"message"}
            style={styles.FABIcon}
            onPress={() => setChatVisible(true)}
        />
    </>
}

export default ChatComponent;