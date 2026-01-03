import { Message } from "@/types/Message";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function ChatItemComponent({ message, email }: { message: Message, email: string }) {
    const isMessageOwner = email === message.user;
    const styles = StyleSheet.create({
        item: {
            color: "white",
            backgroundColor: isMessageOwner ? '#0000ff' : '#b342f5',
            paddingHorizontal: 12,
            paddingVertical: 5,
            borderBottomRightRadius: isMessageOwner ? 10 : 0,
            borderTopRightRadius: isMessageOwner ? 0 : 10,
            borderTopLeftRadius: isMessageOwner ? 10 : 0,
            borderBottomLeftRadius: isMessageOwner ? 0 : 10,
        },
        container: {
            flexDirection: "row",
            justifyContent: isMessageOwner ? "flex-end" : "flex-start",
            marginBottom: 2,
        }
    })
    return <>
        <View style={styles.container}>
            <Text style={styles.item}>{message.message}</Text>
        </View>
    </>
}