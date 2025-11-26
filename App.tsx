import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "./drizzle/migrations";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";

// Importando a tela que criamos antes
import { HomeScreen } from "./src/screens/HomeScreen";

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

const DATABASE_NAME = "database.db";
const expoDB = openDatabaseSync(DATABASE_NAME);
const db = drizzle(expoDB);

export default function App() {
  const { success, error } = useMigrations(db, migrations);
  useDrizzleStudio(expoDB);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  return (
    // 1. Garante que o app não fique embaixo da barra de status/notch
    <SafeAreaProvider>
      <SQLiteProvider databaseName={DATABASE_NAME}>
        {/* 2. Fornece o estilo do React Native Paper para todo o app */}
        <PaperProvider theme={theme}>
          {/* 3. Gerencia o histórico de navegação */}
          <NavigationContainer>
            <Stack.Navigator>
              {/* Aqui definimos as rotas (telas) */}
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Início" }}
              />
            </Stack.Navigator>
            <StatusBar style="auto" />
          </NavigationContainer>
        </PaperProvider>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}
