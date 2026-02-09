import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SQLiteProvider } from "expo-sqlite";
import { type SQLiteDatabase } from "expo-sqlite";

// Importando a tela que criamos antes
import { HomeScreen } from "./src/screens/HomeScreen";
import { NewEntryScreen } from "./src/screens/NewEntryScreen";

// Criando o navegador tipo "Pilha" (uma tela sobre a outra)
const Stack = createNativeStackNavigator();

// Tema personalizado (podemos mexer nas cores depois)
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6200ee", // Exemplo de cor
    secondary: "#03dac6",
  },
};

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
        category_id INTEGER -- A coluna que estava faltando
      );
    `);
    console.log("Banco REINICIADO com sucesso!");
  } catch (error) {
    console.log("Erro ao inicializar o banco:", error);
  }
}

export default function App() {
  return (
    // 1. Garante que o app não fique embaixo da barra de status/notch
    <SafeAreaProvider>
      {/* 2. Fornece o estilo do React Native Paper para todo o app */}
      <PaperProvider theme={theme}>
        <SQLiteProvider
          databaseName="products.db"
          onInit={initializeDatabase}
          useSuspense
        >
          {/* 3. Gerencia o histórico de navegação */}
          <NavigationContainer>
            <Stack.Navigator>
              {/* Aqui definimos as rotas (telas) */}
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Início" }}
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
            <StatusBar style="auto" />
          </NavigationContainer>
        </SQLiteProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
