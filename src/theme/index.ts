import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

const customColors = {
  primary: "#2D74FF",
  backgroundLight: "#FAFAFA",
  backgroundDark: "#09090B",
  surfaceLight: "#FFFFFF",
  surfaceDark: "#1E1E1E",
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
    onBackground: "#1a1a2e",
    onSurface: "#1a1a2e",
  },
};

// --- TEMA ESCURO ---
export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: customColors.primary,
    background: customColors.backgroundDark,
    surface: customColors.surfaceDark,
    error: customColors.error,
    onBackground: "#FFFFFF",
    onSurface: "#E0E0E0",
    elevation: {
      level1: customColors.surfaceDark,
    },
  },
};
