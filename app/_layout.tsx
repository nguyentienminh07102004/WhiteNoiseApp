import { Stack } from "expo-router";
import './global.css';
import { useFonts } from "expo-font";

export default function AppLayout() {
    useFonts({
        "Gilroy-Bold": require("../assets/fonts/Gilroy-Bold.ttf"),
        "Gilroy-Medium": require('../assets/fonts/Gilroy-Medium.ttf'),
        "Gilroy-Light": require('../assets/fonts/Gilroy-Light.ttf'),
        "Gilroy-Regular": require('../assets/fonts/Gilroy-Regular.ttf'),
        "Gilroy-SemiBold": require('../assets/fonts/Gilroy-SemiBold.ttf')
      })
    return <>
        <Stack initialRouteName="(drawer)" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="(drawer)" />
        </Stack>
    </>
}