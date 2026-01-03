import { spacing } from "@/constants/Dimension";
import { fontFamily, fontSizes } from "@/constants/Fonts";
import useThemeColor from "@/hooks/useThemeColor";
import { WhiteNoise } from "@/types/WhiteNoise";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function SongCardComponent({ whiteNoise }: { whiteNoise: WhiteNoise }) {
  const themeColor = useThemeColor({});
  const ip = 'https://precious-viable-terrapin.ngrok-free.app'
  let imageLink = whiteNoise.linkBackgroundImage.replace("http://localhost:9000", ip);
  // const ip: string = Constants.manifest2?.extra?.expoClient?.hostUri.split(":")[0];
  // const imageLink = whiteNoise.linkBackgroundImage.replace('localhost', ip);
  const styles = StyleSheet.create({
    coverImage: {
      width: 250,
      height: 250,
      borderRadius: 10
    },
    container: {
      height: 250,
      width: 270
    },
    title: {
      color: themeColor.textPrimary,
      fontFamily: fontFamily.medium,
      fontSize: fontSizes.xl,
      textAlign: "center",
      paddingVertical: spacing.md
    },
    subTitle: {
      color: themeColor.textSecondary,
      textAlign: "center",
      fontSize: fontSizes.lg,
      fontFamily: fontFamily.regular
    }
  });
  return (
    <React.Fragment>
      <View style={styles.container}>
        <Image source={{uri: imageLink}} style={styles.coverImage} />
        <Text style={styles.title}>{whiteNoise.titleName}</Text>
        <Text style={styles.subTitle}>{whiteNoise.subTitle}</Text>
      </View>
    </React.Fragment>
  );
}
