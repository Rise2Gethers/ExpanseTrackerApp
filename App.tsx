import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// 1. IMPORTS DO JOÃO (Banco)
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";

// 2. IMPORTS DO KENJI (Tema e Telas)
import { lightTheme, darkTheme } from "./src/theme";
import { HomeScreen } from "./src/screens/HomeScreen";
import { SettingsScreen } from "./src/screens/SettingsScreen";
// Importando a tela do João se ela existir no seu projeto (se der erro, comente essa linha)
import { NewEntryScreen } from "./src/screens/NewEntryScreen";
import {
  PreferencesProvider,
  usePreferences,
} from "./src/contexts/PreferencesContext";

const Stack = createNativeStackNavigator();

// 3. FUNÇÃO DO JOÃO (Inicializar Banco)
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

// 4. COMPONENTE DO KENJI (Navegação + Tema)
// + Adicionamos as rotas do João aqui dentro
function AppContent() {
  const { isThemeDark } = usePreferences();
  const theme = isThemeDark ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {/* Suas Telas */}
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

          {/* Tela do João (Nova Entrada) */}
          <Stack.Screen
            name="NewEntryScreen"
            component={NewEntryScreen}
            options={{
              title: "Nova Entrada",
              presentation: "modal", // Fica bonito abrindo como modal
            }}
          />
        </Stack.Navigator>
        <StatusBar style={isThemeDark ? "light" : "dark"} />
      </NavigationContainer>
    </PaperProvider>
  );
}

// 5. O COMPONENTE PAI (A Fusão Final)
export default function App() {
  return (
    <SafeAreaProvider>
      {/* O Tema abraça tudo */}
      <PreferencesProvider>
        {/* O Banco abraça o conteúdo */}
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
