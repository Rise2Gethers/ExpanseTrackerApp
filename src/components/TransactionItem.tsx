import React from "react";
import { StyleSheet } from "react-native";
import { List, Text, MD3Colors, useTheme } from "react-native-paper"; // <--- 1. Import useTheme

interface TransactionItemProps {
  title: string;
  description?: string;
  amount: number;
  type: "income" | "outcome";
  categoryIcon?: string;
  onPress?: () => void;
}

export const TransactionItem = ({
  title,
  description,
  amount,
  type,
  categoryIcon = "cash",
  onPress,
}: TransactionItemProps) => {
  const theme = useTheme(); // <--- 2. Acessamos as cores atuais

  // Usamos cores do tema para ficar harmônico (Vermelho do tema ou Verde)
  const amountColor = type === "outcome" ? theme.colors.error : "#4CAF50";

  // Formatação segura
  const formattedAmount = `R$ ${amount.toFixed(2).replace(".", ",")}`;

  return (
    <List.Item
      title={title}
      // 3. Cor do Título: Preto no claro, Branco no escuro
      titleStyle={{ fontWeight: "bold", color: theme.colors.onSurface }}
      description={description}
      // 4. Cor da Descrição: Cinza escuro no claro, Cinza claro no escuro
      descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
      onPress={onPress}
      left={(props) => (
        <List.Icon
          {...props}
          icon={categoryIcon}
          color={theme.colors.primary}
          // 5. Fundo do ícone também se adapta (fica um cinza leve no dark)
          style={[
            styles.iconStyles,
            { backgroundColor: theme.colors.elevation.level3 },
          ]}
        />
      )}
      right={() => (
        <Text
          variant="titleMedium"
          style={{
            color: amountColor,
            alignSelf: "center",
            fontWeight: "bold",
          }}
        >
          {type === "outcome" ? "- " : "+ "}
          {formattedAmount}
        </Text>
      )}
      // 6. O PULO DO GATO: O Fundo do cartão agora muda de cor!
      style={[styles.container, { backgroundColor: theme.colors.surface }]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff', <--- REMOVIDO! Isso matava o dark mode
    borderRadius: 12,
    marginBottom: 10,
    paddingHorizontal: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  iconStyles: {
    borderRadius: 25,
    marginRight: 10,
    width: 40,
    height: 40,
  },
});
