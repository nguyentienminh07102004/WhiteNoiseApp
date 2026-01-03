import useThemeColor from "@/hooks/useThemeColor";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
  const styleConfigForTheme = useThemeColor({});
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        initialRouteName="home"
        screenOptions={{
          sceneStyle: {
            backgroundColor: styleConfigForTheme.background
          },
          headerStyle: {
            backgroundColor: styleConfigForTheme.background
          },
          headerTitleStyle: {
            color: styleConfigForTheme.textPrimary
          },
          drawerActiveTintColor: styleConfigForTheme.tabIconDefault,
          drawerContentStyle: {
            backgroundColor: styleConfigForTheme.background
          },
          headerShown: true
        }}
      >
        <Drawer.Screen name="home" />
        <Drawer.Screen name="likedSong" />
        <Drawer.Screen name="profile"/>
      </Drawer>
    </GestureHandlerRootView>
  );
}
