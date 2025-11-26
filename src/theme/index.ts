import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

// 1. Definimos nossas cores personalizadas (Brand Colors)
const customColors = {
  primary: "#2D74FF", // Aquele azul bonito do design
  background: "#FAFAFA", // Fundo quase branco
  surface: "#FFFFFF", // Fundo dos cartões
  error: "#FF5252", // Vermelho para gastos
  success: "#4CAF50", // Verde para receitas
  textPrimary: "#1a1a2e", // Preto azulado (título)
  textSecondary: "#757575", // Cinza (descrições)
};

// 2. Criamos o Tema Claro misturando o padrão do Paper com o nosso
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: customColors.primary,
    background: customColors.background,
    surface: customColors.surface,
    error: customColors.error,
    // Podemos adicionar cores extras que não existem no padrão
    onSurfaceVariant: customColors.textSecondary,
  },
};

// 3. Deixamos o Tema Escuro engatilhado (só a estrutura por enquanto)
export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: customColors.primary, // Mantém o azul da marca
    // No futuro ajustamos o resto para dark mode
  },
};
