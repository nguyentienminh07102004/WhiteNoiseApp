import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { StyleSheet, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import useThemeColor from "@/hooks/useThemeColor";
import { iconSizes, spacing } from "@/constants/Dimension";

export default function HeaderComponent() {
    const themeColor = useThemeColor({});
    const styles = StyleSheet.create({
        header: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: spacing.lg,
          paddingHorizontal: spacing.lg
        }
      })
    return <>
        <View style={styles.header}>
            <TouchableRipple>
                <FontAwesome5 name="grip-lines" color={themeColor.iconPrimary} size={iconSizes.md} />
            </TouchableRipple>
            <TouchableRipple>
                <EvilIcons name="search" color={themeColor.iconPrimary} size={iconSizes.md} />
            </TouchableRipple>
        </View>
    </>
}