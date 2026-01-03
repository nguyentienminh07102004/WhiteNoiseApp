import { instance } from "@/apis/AxiosInstance";
import ChatComponent from "@/components/ChatComponent";
import FloatingPlayerComponent from "@/components/FloatingPlayer";
import HeaderComponent from "@/components/Header";
import SongCardComponent from "@/components/SongCard";
import { spacing } from "@/constants/Dimension";
import { fontFamily, fontSizes } from "@/constants/Fonts";
import useThemeColor from "@/hooks/useThemeColor";
import { WhiteNoise } from "@/types/WhiteNoise";
import { AxiosError } from "axios";
import { router, useRouter } from "expo-router";
import React from "react";
import { FlatList, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { PaperProvider, Text, TouchableRipple } from "react-native-paper";
import * as SecureStore from 'expo-secure-store';
import { getAllWhiteNoises } from "@/apis/WhiteNoise";

export default function HomeScreen() {
  const themeColor = useThemeColor({});
  const [whiteNoises, setWhiteNoises] = React.useState<WhiteNoise[]>([]);
  const navigation = useRouter();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllWhiteNoises();
        setWhiteNoises(res);
      } catch(err) {
        if ((err as AxiosError).status === 401) {
          console.log(err)
          await SecureStore.deleteItemAsync('token');
          router.replace('/(drawer)/home/LoginScreen');
        }
      }
    };
    fetchData();
  }, []);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: themeColor.background,
      flex: 1
    },
    headingText: {
      color: themeColor.textPrimary,
      fontSize: fontSizes.xl,
      fontFamily: fontFamily.bold,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.lg
    }
  });
  return (
    <>
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <PaperProvider>
          <View className="flex-1 relative">
            <HeaderComponent />
            <Text style={styles.headingText}>Recomemended for you</Text>
            <FlatList
              horizontal
              ItemSeparatorComponent={() => <View className="mx-5" />}
              contentContainerStyle={{ paddingHorizontal: spacing.lg }}
              keyExtractor={(item) => item.id}
              data={whiteNoises}
              renderItem={({ item }) => (
                <TouchableRipple
                  key={item.id}
                  onPress={() =>
                    navigation.push({
                      pathname: "/home/PlayerScreen",
                      params: {
                        id: item.id
                      }
                    })
                  }
                >
                  <SongCardComponent whiteNoise={item} />
                </TouchableRipple>
              )}
            />
            <ChatComponent />
          </View>
        </PaperProvider>
        <FloatingPlayerComponent />
      </KeyboardAvoidingView>
    </>
  );
}
