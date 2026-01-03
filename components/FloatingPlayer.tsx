import { fontFamily, fontSizes } from "@/constants/Fonts";
import useThemeColor from "@/hooks/useThemeColor";
import { WhiteNoiseDetail } from "@/types/WhiteNoise";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Constants from "expo-constants";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

export default function FloatingPlayerComponent({ whiteNoiseDetail }: { whiteNoiseDetail?: WhiteNoiseDetail }) {
  const defaultImageUrl =
    "https://static.vecteezy.com/system/resources/thumbnails/024/295/098/small_2x/music-notes-background-illustration-ai-generative-free-photo.jpg";
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const ip: string = Constants.manifest2?.extra?.expoClient?.hostUri.split(":")[0];
  const themeColor = useThemeColor({});
  const styles = StyleSheet.create({
    coverImage: {
      width: 70,
      height: 70
    },
    container: {
      height: 70,
      width: '100%',
      borderTopColor: 'white',
      borderTopWidth: 1,
      marginBottom: 45
    },
    title: {
      color: themeColor.textPrimary,
      fontFamily: fontFamily.medium,
      fontSize: fontSizes.lg
    },
    subTitle: {
      color: themeColor.textSecondary,
      fontFamily: fontFamily.regular,
      fontSize: fontSizes.md
    }
  });
  return (
    <TouchableOpacity style={styles.container}>
      <View className="flex-row justify-between items-center pr-6">
        <View className="flex-row items-center gap-5">
          <Image
            source={{ uri: whiteNoiseDetail?.linkBackgroundImage.replace("localhost", ip) || defaultImageUrl }}
            style={styles.coverImage}
          />
          <View className="justify-center gap-2">
            <Text style={styles.title}>Charff and Dust</Text>
            <Text style={styles.subTitle}>HYONNA</Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between gap-3">
          <TouchableOpacity>
            <FontAwesome6 name="backward-step" size={fontSizes.xl} color={themeColor.iconPrimary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsPlaying((isPlaying) => !isPlaying)}>
            <FontAwesome6 name={isPlaying ? "pause" : "play"} size={fontSizes.xl} color={themeColor.iconPrimary} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome6 name="forward-step" size={fontSizes.xl} color={themeColor.iconPrimary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
