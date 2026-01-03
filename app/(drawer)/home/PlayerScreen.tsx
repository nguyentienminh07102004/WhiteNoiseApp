import { instance } from "@/apis/AxiosInstance";
import { getWhitenoiseById } from "@/apis/WhiteNoise";
import ControlComponent from "@/components/ControlComponent";
import { fontFamily, fontSizes } from "@/constants/Fonts";
import useThemeColor from "@/hooks/useThemeColor";
import { WhiteNoiseDetail } from "@/types/WhiteNoise";
import Slider from "@react-native-community/slider";
import * as Audio from "expo-audio";
import Constants from "expo-constants";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";

export default function HomeScreen() {
  const ip: string = Constants.manifest2?.extra?.expoClient?.hostUri.split(":")[0];
  const [playing, setPlaying] = React.useState<boolean>(false);
  const hosting = "https://precious-viable-terrapin.ngrok-free.app";
  const themeStyles = useThemeColor({});
  const { id } = useLocalSearchParams() as { id: string };
  const [whiteNoise, setWhiteNoise] = React.useState<WhiteNoiseDetail | null>(null);
  const playersRef = React.useRef<Map<string, Audio.AudioPlayer>>(new Map());
  const [reload, setReload] = React.useState<boolean>(false);

  const styles = StyleSheet.create({
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    },
    surfaceImage: {
      marginHorizontal: 40,
      height: "40%",
      elevation: 10,
      borderRadius: 15,
      overflow: "hidden",
      shadowColor: "#C0C0C0",
      shadowOffset: { width: 10, height: 14 },
      shadowOpacity: 0.5,
      shadowRadius: 12
    },
    titleName: {
      color: themeStyles.textPrimary,
      fontSize: fontSizes.xl,
      textAlign: "center",
      fontFamily: fontFamily.medium
    },
    subTitle: {
      fontFamily: fontFamily.regular,
      fontSize: fontSizes.lg,
      color: themeStyles.textSecondary,
      textAlign: "center"
    },
    container: {
      flex: 1,
      paddingTop: 200
    },
    contentContainer: {
      flex: 1,
      padding: 36,
      alignItems: "center"
    }
  });
  React.useEffect(() => {
    return () => {
      playersRef.current.forEach((player) => {
        try {
          player.release?.();
        } catch (e) {
          console.warn("Release failed", e);
        }
      });
    };
  }, []);
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await getWhitenoiseById(id);
      setWhiteNoise(res);
    };
    fetchData();
  }, [id]);
  React.useEffect(() => {
    if (whiteNoise) {
      const playerAudio = new Map<string, Audio.AudioPlayer>();
      for (const link of whiteNoise?.linkToAudios || []) {
        if (link) {
          const url = link.url.replace("http://localhost:9000", hosting);
          // const url = link.url.replace('localhost', ip);
          const player = Audio.createAudioPlayer(url);
          playerAudio.set(link.id, player);
          player.loop = true;
          player.volume = 0;
        }
      }
      playersRef.current = playerAudio;
      setReload(!reload);
    }
  }, [whiteNoise]);
  React.useEffect(() => {
    if (playersRef.current) {
      playersRef.current.forEach((player) => (playing ? player.play() : player.pause()));
    }
  }, [playing]);
  return (
    <View className="flex-1 mb-16 mx-4">
      <Stack.Screen options={{ title: whiteNoise?.titleName }} />
      <Surface style={styles.surfaceImage} elevation={5}>
        <Image source={{ uri: whiteNoise?.linkBackgroundImage.replace("http://localhost:9000", hosting) }} style={styles.image} />
      </Surface>
      <ControlComponent playing={playing} setPlaying={setPlaying} />
      <View className="mt-6">
        <Text style={styles.titleName}>{whiteNoise?.titleName || ""}</Text>
        <Text style={styles.subTitle}>{whiteNoise?.subTitle}</Text>
      </View>
      <FlatList
        data={whiteNoise?.linkToAudios}
        keyExtractor={(item) => item.id}
        style={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <Slider
            key={item.id}
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            tapToSeek={false}
            maximumTrackTintColor="#000000"
            value={playersRef.current.get(item.id)?.volume}
            onValueChange={(value) => {
              const player = playersRef.current.get(item.id);
              if (player) {
                player.volume = value;
                playersRef.current.set(item.id, player);
                console.log(value);
              }
            }}
          />
        )}
      />
    </View>
  );
}
