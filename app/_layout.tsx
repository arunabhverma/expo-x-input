import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router/stack";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

declare module "@react-navigation/native" {
  export type ExtendedTheme = {
    dark: boolean;
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
      bgRed: string;
    };
  };
  export function useTheme(): ExtendedTheme;
}

export default function AppLayout() {
  const themes = useColorScheme();
  let dark = {
    ...DarkTheme,
    colors: { ...DarkTheme.colors, bgRed: "rgba(255,0,0,0.7)" },
  };
  let light = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, bgRed: "rgba(255,0,0,0.1)" },
  };
  const theme = themes === "dark" ? dark : light;
  return (
    <SafeAreaProvider>
      <ThemeProvider value={theme}>
        <Stack />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
