import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, Button, TextInput, Icon, useTheme } from "react-native-paper";
import { InputAmount, TransactionItem, Header } from "../components/index";
import DateTimePicker from "@react-native-community/datetimepicker";

const CATEGORIES = [
  { id: "1", name: "Alimentação", icon: "silverware-fork-knife" },
  { id: "2", name: "Transporte", icon: "bus" },
  { id: "3", name: "Entretenimento", icon: "party-popper" },
  { id: "4", name: "Compras", icon: "shopping" },
  { id: "5", name: "Contas", icon: "file-document-outline" },
  { id: "6", name: "Outro", icon: "dots-horizontal" },
];

export function HomeScreen() {
  const theme = useTheme();
  const [amount, setAmount] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("1"); // Começa com Food selecionado
  const [description, setDescription] = useState("");

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header
        title="Novo Gasto"
        showBackButton={true}
        onBackPress={() => alert("Voltar")}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.amountContainer}>
          <InputAmount value={amount} onChangeValue={setAmount} />
        </View>

        <Text variant="titleMedium" style={styles.sectionTitle}>
          Categorias
        </Text>

        <View style={styles.gridContainer}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Icon
                  source={cat.icon}
                  size={24}
                  color={isSelected ? theme.colors.primary : "#333"}
                />
                <Text
                  style={[
                    styles.cardText,
                    isSelected && styles.cardTextSelected,
                    { marginLeft: 8 },
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.inputsSection}>
          <Text style={styles.label}>Data</Text>

          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              mode="outlined"
              value={date.toLocaleDateString("pt-BR")}
              editable={false}
              right={
                <TextInput.Icon
                  icon="calendar"
                  onPress={() => setShowDatePicker(true)}
                />
              }
              style={styles.inputField}
              outlineStyle={styles.inputOutline}
              pointerEvents="none"
            />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
              maximumDate={new Date()}
            />
          )}

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            mode="outlined"
            placeholder="ex: Lanche com os amigos."
            value={description}
            onChangeText={setDescription}
            style={styles.inputField}
            outlineStyle={styles.inputOutline}
          />
        </View>

        <Button
          mode="contained"
          onPress={() => alert("Gasto adicionado!")}
          buttonColor={theme.colors.primary}
          textColor="#FFF"
          contentStyle={{ height: 56 }}
          style={styles.saveButton}
        >
          Salvar Despesa
        </Button>

        <View style={{ marginTop: 30, gap: 10 }}>
          <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
            Últimos lançamentos
          </Text>

          <TransactionItem
            title="Almoço Burger King"
            description="Hoje, 12:30"
            amount={45.9}
            type="outcome"
            categoryIcon="hamburger"
          />

          <TransactionItem
            title="Salário Estágio"
            description="05 Out"
            amount={1200.0}
            type="income"
            categoryIcon="bank"
          />

          <TransactionItem
            title="Uber p/ Facul"
            description="Ontem"
            amount={14.2}
            type="outcome"
            categoryIcon="car"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FAFAFA",
    paddingBottom: 40,
  },
  amountContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1a1a2e",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 20,
  },
  card: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 10,
  },
  cardSelected: {
    borderColor:
      "isSelected && { color: theme.colors.primary, fontWeight: 'bold' }",
    backgroundColor: "#EDF4FF",
  },
  cardText: {
    fontWeight: "500",
    color: "#333",
  },
  cardTextSelected: {
    color: "#2D74FF",
    fontWeight: "bold",
  },
  inputsSection: {
    gap: 15,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  inputField: {
    backgroundColor: "#fff",
  },
  inputOutline: {
    borderRadius: 12,
    borderColor: "#E0E0E0",
  },
  saveButton: {
    marginTop: 30,
    borderRadius: 12,
    justifyContent: "center",
  },
});
