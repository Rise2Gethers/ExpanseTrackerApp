import React from "react";
import { View, StyleSheet } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { useTheme } from "react-native-paper";

interface InputAmountProps {
  value: number | null;
  onChangeValue: (value: number | null) => void;
}

export const InputAmount = ({ value, onChangeValue }: InputAmountProps) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <CurrencyInput
        value={value}
        onChangeValue={onChangeValue}
        prefix="R$ "
        delimiter="."
        separator=","
        precision={2}
        placeholder="R$ 0,00"
        placeholderTextColor={theme.colors.onSurfaceDisabled}
        style={[styles.amountText, { color: theme.colors.primary }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 35,
    borderRadius: 24,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  amountText: {
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
});
