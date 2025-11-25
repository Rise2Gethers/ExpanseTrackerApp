import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Button, TextInput, IconButton, Icon } from 'react-native-paper';
import { InputAmount } from '../components/InputAmount';

const CATEGORIES = [
  { id: '1', name: 'Food', icon: 'silverware-fork-knife' },
  { id: '2', name: 'Transport', icon: 'bus' },
  { id: '3', name: 'Fun', icon: 'party-popper' },
  { id: '4', name: 'Shopping', icon: 'shopping' },
  { id: '5', name: 'Bills', icon: 'file-document-outline' },
  { id: '6', name: 'Other', icon: 'dots-horizontal' },
];

export function HomeScreen() {
  const [amount, setAmount] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('1'); // Começa com Food selecionado
  const [description, setDescription] = useState('');
  
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.amountContainer}>
        <InputAmount value={amount} onChangeValue={setAmount} />
      </View>

      <Text variant="titleMedium" style={styles.sectionTitle}>Category</Text>
      
      <View style={styles.gridContainer}>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <TouchableOpacity 
              key={cat.id} 
              style={[
                styles.card, 
                isSelected && styles.cardSelected
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Icon 
                source={cat.icon} 
                size={24} 
                color={isSelected ? '#2D74FF' : '#333'} 
              />  
              <Text style={[styles.cardText, isSelected && styles.cardTextSelected, { marginLeft: 8 }]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>

      <View style={styles.inputsSection}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          mode="outlined"
          value={today}
          editable={false} 
          right={<TextInput.Icon icon="calendar" />}
          style={styles.inputField}
          outlineStyle={styles.inputOutline}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          mode="outlined"
          placeholder="e.g., Lunch with friends"
          value={description}
          onChangeText={setDescription}
          style={styles.inputField}
          outlineStyle={styles.inputOutline}
        />
      </View>

      <Button 
        mode="contained" 
        style={styles.saveButton} 
        contentStyle={{ height: 50 }}
        onPress={() => alert('Expense Saved!')}
      >
        Add Expense
      </Button>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FAFAFA', 
    paddingBottom: 40,
  },
  amountContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a1a2e'
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
  },
  card: {
    width: '48%', 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 10,
  },
  cardSelected: {
    borderColor: '#2D74FF',
    backgroundColor: '#EDF4FF', 
  },
  cardText: {
    fontWeight: '500',
    color: '#333',
  },
  cardTextSelected: {
    color: '#2D74FF',
    fontWeight: 'bold',
  },
  inputsSection: {
    gap: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  inputField: {
    backgroundColor: '#fff',
  },
  inputOutline: {
    borderRadius: 12,
    borderColor: '#E0E0E0',
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: '#2D74FF', 
    borderRadius: 30,
  }
});