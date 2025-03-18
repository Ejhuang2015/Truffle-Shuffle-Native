import { Stack } from "expo-router";
import '../assets/styles/main.css';
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="movies/[id]"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="drinks/[id]"
          options={{
            headerShown: false
          }}
        />
      </Stack>
  )
}
