import { Stack } from "expo-router";

export default function LayoutHomeScreen() {
  return (
    <>
      <Stack>
        <Stack.Screen name="HomeScreen" />
        <Stack.Screen />
      </Stack>
    </>
  );
}
