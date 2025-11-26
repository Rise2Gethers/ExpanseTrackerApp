import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as productSchema from "../database/schemas/productSchema";
import { asc, eq, like } from "drizzle-orm";

type Data = {
  id: number;
  name: string;
};

export function HomeScreen() {
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Data[]>([]);
  const [idUpdate, setIdUpdate] = useState("");
  const [nameUpdade, setNameUpdate] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

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

  async function add() {
    try {
      const response = await db.insert(productSchema.product).values({ name });

      Alert.alert("Cadastrado com o ID: " + response.lastInsertRowId);
      setName("");
      await fetchProducts();
    } catch (error) {
      console.log(error);
    }
  }

  async function update(id: string, name: string) {
    parseInt(id);
    await db
      .update(productSchema.product)
      .set({ name })
      .where(eq(productSchema.product.id, parseInt(id)));
    setIdUpdate('')
    setNameUpdate('')
    setRefreshKey((prev) => prev + 1);
  }

  async function remove(id: number) {
    try {
      Alert.alert("Remover", "Deseja remover?", [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          onPress: async () => {
            await db
              .delete(productSchema.product)
              .where(eq(productSchema.product.id, id));

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

      if (product) {
        Alert.alert(
          `Produto ID: ${product.id} cadastrado com o nome ${product.name}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [search, refreshKey]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome..."
        style={{
          height: 54,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#999",
          paddingHorizontal: 16,
        }}
        onChangeText={setName}
        value={name}
      />

      <Button title="salvar" onPress={add} />

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

      <Text>Atualizar</Text>
      <View style={styles.update}>
        <TextInput
          placeholder="ID"
          style={{
            height: 54,
            width: 150,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#999",
            paddingHorizontal: 16,
          }}
          onChangeText={setIdUpdate}
          value={idUpdate}
        />
        <TextInput
          placeholder="Nome"
          style={{
            height: 54,
            width: 150,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#999",
            paddingHorizontal: 16,
          }}
          onChangeText={setNameUpdate}
          value={nameUpdade}
        />
      </View>
      <Button title="Atualizar" onPress={() => update(idUpdate, nameUpdade)} />

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 32,
    gap: 16,
  },
  update: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
