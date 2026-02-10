import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as productSchema from "../database/schemas/productSchema";
import { asc, eq, like } from "drizzle-orm";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

type Data = {
  id: number;
  name: string;
};

type RootStackParamList = {
  Home: undefined;
  NewEntryScreen: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Data[]>([]);

  const database = useSQLiteContext();
  const db = drizzle(database, { schema: productSchema });

  async function fetchProducts() {
    try {
      const response = await db.query.product.findMany({
        where: like(productSchema.product.name, `%${search}%`),
        orderBy: [asc(productSchema.product.name)],
      });
      setData(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function remove(id: number) {
    try {
      Alert.alert("Remover", "Deseja remover?", [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: async () => {
            const product = await db.query.product.findFirst({
              where: eq(productSchema.product.id, id),
            });
            await db
              .delete(productSchema.product)
              .where(eq(productSchema.product.id, id));

            await db
              .delete(productSchema.category)
              .where(eq(productSchema.category.id, product.categoryId));

            await fetchProducts();
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  async function show(id: number) {
    try {
      const product = await db.query.product.findFirst({
        where: eq(productSchema.product.id, id),
      });
      const category = product?.categoryId
        ? await db.query.category.findFirst({
            where: eq(productSchema.category.id, product.categoryId),
          })
        : null;
      console.log(product, category);

      if (product && category) {
        console.log("=== DADOS RECUPERADOS ===");
        console.log(JSON.stringify({ product, category }, null, 2));
        console.log("=========================");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts();

      return () => {};
    }, []),
  );

  useEffect(() => {
    fetchProducts();
  }, [search]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pesquisar..."
        style={{
          height: 54,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#999",
          paddingHorizontal: 16,
        }}
        onChangeText={setSearch}
        value={search}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Pressable
            style={{ padding: 16, borderWidth: 1, borderRadius: 7 }}
            onLongPress={() => remove(item.id)}
            onPress={() => show(item.id)}
          >
            <Text>{item.name}</Text>
          </Pressable>
        )}
        ListEmptyComponent={() => <Text>Lista vazia!</Text>}
        contentContainerStyle={{ gap: 16 }}
      />
      <View
        style={{
          width: 67,
          borderRadius: 50,
          overflow: "hidden",
          backgroundColor: "#1f9be2ff",
        }}
      >
        <Pressable onPress={() => navigation.navigate("NewEntryScreen")}>
          <Text style={{ color: "#ffffff", fontSize: 50, textAlign: "center" }}>
            +
          </Text>
        </Pressable>
      </View>
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
    flex: 1,
    justifyContent: "center",
    padding: 32,
    gap: 16,
    zIndex: 1,
    position: "static",
  },
  containerModal: {
    flex: 1,
    backgroundColor: "white",
    gap: 16,
    padding: 20,
    zIndex: 100,
    position: "relative",
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
