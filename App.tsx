import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";

import { lightTheme, darkTheme } from "./src/theme";
import { HomeScreen } from "./src/screens/HomeScreen";
import { SettingsScreen } from "./src/screens/SettingsScreen";
import { NewEntryScreen } from "./src/screens/NewEntryScreen";
import {
  PreferencesProvider,
  usePreferences,
} from "./src/contexts/PreferencesContext";

const Stack = createNativeStackNavigator();

// 1. Inicializar Banco
async function initializeDatabase(db: SQLiteDatabase) {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        color TEXT
      );
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category_id INTEGER
      );
    `);
    console.log("Banco REINICIADO com sucesso!");
  } catch (error) {
    console.log("Erro ao inicializar o banco:", error);
  }
}

// 2. Navegação + Tema
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
          <Stack.Screen
            name="NewEntryScreen"
            component={NewEntryScreen}
            options={{
              title: "Nova Entrada",
              presentation: "modal",
            }}
          />
        </Stack.Navigator>
        <StatusBar style={isThemeDark ? "light" : "dark"} />
      </NavigationContainer>
    </PaperProvider>
  );
}

// 3. COMPONENTE PAI
export default function App() {
  return (
    <SafeAreaProvider>
      <PreferencesProvider>
        <SQLiteProvider
          databaseName="products.db"
          onInit={initializeDatabase}
          useSuspense
        >
          <AppContent />
        </SQLiteProvider>
      </PreferencesProvider>
    </SafeAreaProvider>
  );
}
