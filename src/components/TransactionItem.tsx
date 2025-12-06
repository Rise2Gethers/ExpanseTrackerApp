import React from "react";
import { StyleSheet } from "react-native";
import { List, Text, MD3Colors } from "react-native-paper";

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
  const amountColor = type === "outcome" ? MD3Colors.error50 : "#4CAF50";

  const formattedAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);

  return (
    <List.Item
      title={title}
      description={description}
      onPress={onPress}
      left={(props) => (
        <List.Icon
          {...props}
          icon={categoryIcon}
          color={MD3Colors.primary50}
          style={{ borderRadius: 12, width: 25 }}
        />
      )}
      right={() => (
        <Text
          variant="titleMedium"
          style={{
            color: amountColor,
            alignSelf: "center",
            fontWeight: "normal",
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
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 2,
    paddingHorizontal: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconStyles: {
    backgroundColor: MD3Colors.secondary90,
    borderRadius: 10,
    marginRight: 10,
  },
});
