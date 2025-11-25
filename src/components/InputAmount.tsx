import React from 'react';
import { View, StyleSheet } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Ícone direto do Expo

interface InputAmountProps {
  value: number | null;
  onChangeValue: (value: number | null) => void;
}

export const InputAmount = ({ value, onChangeValue }: InputAmountProps) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="currency-usd" size={30} color="#333" style={styles.icon} />
      <CurrencyInput
        value={value}
        onChangeValue={onChangeValue}
        prefix="" // Tirei o prefixo texto para usar o icone
        delimiter=","
        separator="."
        precision={2}
        placeholder="0.00"
        placeholderTextColor="#ccc"
        style={styles.amountText} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  icon: {
    marginRight: 5,
    marginTop: 5, // Pequeno ajuste para alinhar com o texto
  },
  amountText: {
    fontSize: 48, // BEM GRANDE
    fontWeight: 'bold',
    color: '#1a1a2e',
    textAlign: 'center',
  }
});