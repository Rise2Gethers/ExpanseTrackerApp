import React from "react";
import { StyleSheet } from "react-native";
import { List, Text, useTheme } from "react-native-paper";

interface TransactionItemProps {
  title: string;
  date?: string;
  amount: number;
  type: "income" | "outcome";
  categoryIcon?: string;
  onPress?: () => void;
}

export const TransactionItem = ({
  title,
  date,
  amount,
  type,
  categoryIcon = "cash",
  onPress,
}: TransactionItemProps) => {
  const theme = useTheme();

  const amountColor = type === "outcome" ? theme.colors.error : "#4CAF50";

  const formattedAmount = `R$ ${amount.toFixed(2).replace(".", ",")}`;

  return (
    <List.Item
      title={title}
      titleStyle={{ fontWeight: "bold", color: theme.colors.onSurface }}
      description={date}
      descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
      onPress={onPress}
      left={(props) => (
        <List.Icon
          {...props}
          icon={categoryIcon}
          color={theme.colors.primary}
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
      style={[styles.container, { backgroundColor: theme.colors.surface }]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
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
