import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importando a tela que criamos antes
import { HomeScreen } from './src/screens/HomeScreen';

// Criando o navegador tipo "Pilha" (uma tela sobre a outra)
const Stack = createNativeStackNavigator();

// Tema personalizado (podemos mexer nas cores depois)
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee', // Exemplo de cor
    secondary: '#03dac6',
  },
};

export default function App() {
  return (
    // 1. Garante que o app não fique embaixo da barra de status/notch
    <SafeAreaProvider>
      {/* 2. Fornece o estilo do React Native Paper para todo o app */}
      <PaperProvider theme={theme}>
        {/* 3. Gerencia o histórico de navegação */}
        <NavigationContainer>
          <Stack.Navigator>
            {/* Aqui definimos as rotas (telas) */}
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: 'Início' }} 
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}