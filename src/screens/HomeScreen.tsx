import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { Text, Button, TextInput, Icon, useTheme } from "react-native-paper";
import { InputAmount, TransactionItem, Header } from "../components/index";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as productSchema from "../database/schemas/productSchema";
import { asc, eq, like } from "drizzle-orm";
import { useFocusEffect } from "@react-navigation/native";

const CATEGORIES = [
  { id: "1", name: "Alimentação", icon: "silverware-fork-knife" },
  { id: "2", name: "Transporte", icon: "bus" },
  { id: "3", name: "Entretenimento", icon: "party-popper" },
  { id: "4", name: "Compras", icon: "shopping" },
  { id: "5", name: "Contas", icon: "file-document-outline" },
  { id: "6", name: "Outro", icon: "dots-horizontal" },
];

type Data = {
  id: number;
  name: string;
};

type RootStackParamList = {
  Home: undefined;
  NewEntryScreen: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: any) {
  const theme = useTheme();

  const database = useSQLiteContext();
  const db = drizzle(database, { schema: productSchema });

  const [search, setSearch] = useState("");
  const [data, setData] = useState<Data[]>([]);

  const [amount, setAmount] = useState<number | null>(0);

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

  useFocusEffect(
    useCallback(() => {
      fetchProducts();

      return () => {};
    }, []),
  );

  useEffect(() => {
    fetchProducts();
  }, [search]);

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

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header
        title="Home"
        showBackButton={false}
        rightActionIcon="cog"
        onRightActionPress={() => navigation.navigate("Settings")}
      />

      <View style={{ flex: 1, paddingHorizontal: 24, paddingBottom: 50 }}>
        <View style={styles.amountContainer}>
          <InputAmount value={amount} onChangeValue={setAmount} />
        </View>

        <Text
          variant="titleLarge"
          style={{
            fontWeight: "bold",
            color: theme.colors.onBackground,
            marginVertical: 20,
          }}
        >
          Últimos lançamentos
        </Text>

        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Pressable
              onLongPress={() => remove(item.id)}
              onPress={() => show(item.id)}
            >
              <TransactionItem
                title={item.name}
                description="Hoje, 12:30"
                amount={12.0}
                type="outcome"
                categoryIcon="candycane"
              />
            </Pressable>
          )}
          ListEmptyComponent={() => (
            <TransactionItem
              title="Lista vazia"
              description=""
              amount={0}
              type="empty"
              categoryIcon=""
            />
          )}
          contentContainerStyle={{ gap: 15, paddingBottom: 100 }}
          style={{ flex: 1 }}
        />
      </View>

      {/* Botão Flutuante (FAB) */}
      <View style={styles.fabContainer}>
        <Pressable onPress={() => navigation.navigate("NewEntryScreen")}>
          <Text style={styles.fabText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  amountContainer: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: "center",
  },
  fabContainer: {
    width: 67,
    height: 67,
    borderRadius: 35,
    overflow: "hidden",
    backgroundColor: "#1f9be2ff",
    position: "absolute",
    bottom: 30,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    color: "#ffffff",
    fontSize: 40,
    textAlign: "center",
    marginTop: -5,
  },
});
