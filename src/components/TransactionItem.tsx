import React from "react";
import { StyleSheet } from "react-native";
import { List, Text, MD3Colors } from "react-native-paper";

// Definindo o formato dos dados que esse componente aceita
interface TransactionItemProps {
  title: string;
  description?: string; // Data ou categoria (opcional)
  amount: number;
  type: "income" | "outcome"; // Só aceita esses dois valores
  categoryIcon?: string;
  onPress?: () => void;
}

export const TransactionItem = ({
  title,
  description,
  amount,
  type,
  categoryIcon = "cash", // Ícone padrão se não vier nada
  onPress,
}: TransactionItemProps) => {
  // Lógica de Cor: Vermelho para saída, Verde para entrada
  // Usamos cores padrão do Paper (Error = Vermelho)
  const amountColor = type === "outcome" ? MD3Colors.error50 : "#4CAF50";

  // Formatador de Moeda Nativo do JavaScript (O jeito Pro)
  const formattedAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);

  return (
    <List.Item
      title={title}
      description={description}
      onPress={onPress}
      // O Ícone da Esquerda (bolinha colorida)
      left={(props) => (
        <List.Icon
          {...props}
          icon={categoryIcon}
          color={MD3Colors.primary50} // Cor do ícone
          style={{ backgroundColor: MD3Colors.secondary90, borderRadius: 10 }} // Fundo clarinho
        />
      )}
      // O Valor na Direita
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
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 8, // Espacinho entre um item e outro
    elevation: 1, // Sombra leve no Android
    // Sombra leve no iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});
