import useThemeColor from "@/hooks/useThemeColor";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";

export default function RootLayout() {
  const styleConfigForTheme = useThemeColor({});
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        initialRouteName="(home)"
        screenOptions={{
          sceneStyle: {
            backgroundColor: styleConfigForTheme.background
          },
          headerStyle: {
            backgroundColor: styleConfigForTheme.background
          },
          headerTitleStyle: {
            color: styleConfigForTheme.text
          }
        }}
      >
        <Drawer.Screen
          name="home"
          options={{
            title: "Home",
            drawerLabel: "Home"
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            title: "Profile"
          }}
        />
        <Drawer.Screen
          name="likedSong"
          options={{
            title: "Liked Song"
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
