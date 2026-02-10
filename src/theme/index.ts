import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

// Cores da Marca (Rise2Gethers)
const customColors = {
  primary: "#2D74FF",
  backgroundLight: "#FAFAFA", // Fundo Claro (quase branco)
  backgroundDark: "#09090B", // Fundo Escuro (quase preto)
  surfaceLight: "#FFFFFF", // Cartão Claro
  surfaceDark: "#1E1E1E", // Cartão Escuro
  error: "#FF5252",
  success: "#4CAF50",
};

// --- TEMA CLARO ---
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: customColors.primary,
    background: customColors.backgroundLight,
    surface: customColors.surfaceLight,
    error: customColors.error,
    // Garante que o texto em cima do fundo claro seja escuro
    onBackground: "#1a1a2e",
    onSurface: "#1a1a2e",
  },
};

// --- TEMA ESCURO ---
export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: customColors.primary, // Mantém o azul
    background: customColors.backgroundDark, // <--- FORÇA O PRETO AQUI
    surface: customColors.surfaceDark, // <--- CARTÕES CINZA ESCURO
    error: customColors.error,
    // Garante que o texto em cima do fundo escuro seja branco
    onBackground: "#FFFFFF",
    onSurface: "#E0E0E0",
    elevation: {
      level1: customColors.surfaceDark, // Garante que componentes elevados fiquem escuros
    },
  },
};
