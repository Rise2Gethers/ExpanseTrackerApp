import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Imports
import { lightTheme, darkTheme } from "./src/theme";
import { HomeScreen } from "./src/screens/HomeScreen";
import { SettingsScreen } from "./src/screens/SettingsScreen";
import {
  PreferencesProvider,
  usePreferences,
} from "./src/contexts/PreferencesContext";

const Stack = createNativeStackNavigator();

// Componente Filho (Cuida da Navegação e Tema)
function AppContent() {
  const { isThemeDark } = usePreferences();
  const theme = isThemeDark ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <StatusBar style={isThemeDark ? "light" : "dark"} />
      </NavigationContainer>
    </PaperProvider>
  );
}

// Componente Pai (Cuida da Infraestrutura)
export default function App() {
  return (
    <SafeAreaProvider>
      <PreferencesProvider>
        <AppContent />
      </PreferencesProvider>
    </SafeAreaProvider>
  );
}
