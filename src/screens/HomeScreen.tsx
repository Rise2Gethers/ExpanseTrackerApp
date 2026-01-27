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
  },
});
