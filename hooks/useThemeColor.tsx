import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export default function useThemeColor({ theme }: { theme?: "light" | "dark" }) {
  const themeColor: "light" | "dark" = theme || useColorScheme() || "dark";
  return Colors[themeColor];
}
