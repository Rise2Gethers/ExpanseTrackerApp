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

export function HomeScreen({ navigation }: any) {
  const theme = useTheme();

  const [amount, setAmount] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("1");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSave = () => {
    alert("Gasto adicionado com sucesso!");

    setAmount(0);
    setDescription("");
    setDate(new Date());
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header
        title="Novo Gasto"
        showBackButton={false}
        rightActionIcon="cog"
        onRightActionPress={() => navigation.navigate("Settings")}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.amountContainer}>
          <InputAmount value={amount} onChangeValue={setAmount} />
        </View>

        <Text
          variant="titleMedium"
          style={[styles.sectionTitle, { color: theme.colors.onBackground }]}
        >
          Categorias
        </Text>

        <View style={styles.gridContainer}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.card,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.outline,
                  },
                  isSelected && {
                    borderColor: theme.colors.primary,
                    backgroundColor: theme.colors.elevation.level2,
                  },
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Icon
                  source={cat.icon}
                  size={24}
                  color={
                    isSelected ? theme.colors.primary : theme.colors.onSurface
                  }
                />
                <Text
                  style={[
                    styles.cardText,
                    { color: theme.colors.onSurface },
                    isSelected && {
                      color: theme.colors.primary,
                      fontWeight: "bold",
                    },
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
          <Text style={[styles.label, { color: theme.colors.onBackground }]}>
            Data
          </Text>

          <TextInput
            mode="outlined"
            value={date.toLocaleDateString("pt-BR")}
            editable={false}
            style={[
              styles.inputField,
              { backgroundColor: theme.colors.surface },
            ]}
            outlineStyle={styles.inputOutline}
            onPressIn={() => setShowDatePicker(true)}
            right={
              <TextInput.Icon
                icon="calendar"
                onPress={() => setShowDatePicker(true)}
              />
            }
          />

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

          <Text style={[styles.label, { color: theme.colors.onBackground }]}>
            Descrição
          </Text>

          <TextInput
            mode="outlined"
            placeholder="ex: Lanche com os amigos."
            placeholderTextColor={theme.colors.onSurfaceDisabled}
            value={description}
            onChangeText={setDescription}
            style={[
              styles.inputField,
              { backgroundColor: theme.colors.surface },
            ]}
            outlineStyle={styles.inputOutline}
          />
        </View>

        <Button
          mode="contained"
          onPress={handleSave}
          buttonColor={theme.colors.primary}
          textColor="#FFF"
          contentStyle={{ height: 56 }}
          style={styles.saveButton}
        >
          Salvar Despesa
        </Button>

        <View style={{ marginTop: 30, gap: 10 }}>
          <Text
            variant="titleLarge"
            style={{ fontWeight: "bold", color: theme.colors.onBackground }}
          >
            Últimos lançamentos
          </Text>

          <TransactionItem
            title="Docin depois do almoço"
            description="Hoje, 12:30"
            amount={12.0}
            type="outcome"
            categoryIcon="candycane"
          />

          <TransactionItem
            title="BETÃO PAGOU BEM"
            description="29 Nov, 22:23"
            amount={700.0}
            type="income"
            categoryIcon="cash-100"
          />

          <TransactionItem
            title="Voltando de motinha pra casa"
            description="Hoje, 17:10"
            amount={7.2}
            type="outcome"
            categoryIcon="motorbike"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  amountContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
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
    // Cor removida daqui
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    // Border color removido daqui
    marginBottom: 10,
  },
  // cardSelected removido pois movemos a lógica para inline style
  cardText: {
    fontWeight: "500",
  },
  // cardTextSelected removido pois movemos a lógica para inline style
  inputsSection: {
    gap: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  inputField: {
    // Background removido
  },
  inputOutline: {
    borderRadius: 12,
    borderColor: "#E0E0E0", // Opcional: pode usar theme.colors.outline se quiser
  },
  saveButton: {
    marginTop: 30,
    borderRadius: 12,
    justifyContent: "center",
  },
});
