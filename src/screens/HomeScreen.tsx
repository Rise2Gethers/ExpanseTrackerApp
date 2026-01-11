import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Bem-vindo ao Expense Tracker!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});