import useThemeColor from "@/hooks/useThemeColor";
import { Stack } from "expo-router";

export default function LayoutHomeScreen() {
  const themeColor = useThemeColor({});
  return (
    <>
      <Stack initialRouteName="LoginScreen" screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: themeColor.background
        }

      }}>
        <Stack.Screen name="HomeScreen" />
        <Stack.Screen name="PlayerScreen"/>
        <Stack.Screen name="LoginScreen"/>
        <Stack.Screen name="SignUpScreen" />
      </Stack>
    </>
  );
}
