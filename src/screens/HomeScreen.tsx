<<<<<<< Updated upstream
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Bem-vindo ao Expense Tracker!</Text>
=======
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
import { Modal, PaperProvider, Portal } from "react-native-paper";

type Data = {
  id: number;
  name: string;
};

export function HomeScreen() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Data[]>([]);
  const [categoryName, setCategoryName] = useState([]);

  const database = useSQLiteContext();
  const db = drizzle(database, { schema: productSchema });

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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

  async function fetchCategory() {
      try {
        const result = await db.query.category.findMany({
          orderBy: [asc(productSchema.category.name)],
        });

        if (result) {
          const names = result.map(cat => cat.name);
          setCategoryName(names);
        }
      } catch (error) {
        console.error("Erro ao buscar categoria:", error);
      }
    }

  async function add() {
    try {
      const response = await db.insert(productSchema.product).values({ name });
      const responseCategory = await db.insert(productSchema.category).values({ name: category, color: "#0b92e0ff" });

      Alert.alert("Cadastrado com o ID: " + response.lastInsertRowId + responseCategory.lastInsertRowId);
      setName("");
      setCategory("");
      await fetchCategory()
      await fetchProducts();
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
            await db
              .delete(productSchema.product)
              .where(eq(productSchema.product.id, id));

            await db
              .delete(productSchema.category)
              .where(eq(productSchema.category.id, id));

            await fetchCategory();
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
      const category = await db.query.category.findFirst({
        where: eq(productSchema.category.id, id),
      });

      if (product) {
        Alert.alert(
          `Produto ID: ${product.id} Cadastrado com o nome ${product.name} CategoriaID: ${category.id} Nome da categoria: ${category.name} Cor: ${category.color}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, [search]);

  console.log(categoryName);
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
        <Pressable onPress={() => showModal()}>
          <Text style={{ color: "#ffffff", fontSize: 50, textAlign: "center" }}>
            +
          </Text>
        </Pressable>
      </View>

      <PaperProvider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.containerModal}
          >
            <TextInput
              placeholder="nome"
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
            {categoryName.length > 0 ? (
              <Text>{categoryName}</Text>
            ) : (
              <TextInput
                placeholder="categoria"
                style={{
                  height: 54,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "#999",
                  paddingHorizontal: 16,
                }}
                onChangeText={setCategory}
                value={category}
              />
            )}

            <Button title="salvar" onPress={add} />
          </Modal>
        </Portal>
      </PaperProvider>
>>>>>>> Stashed changes
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< Updated upstream
    justifyContent: 'center',
    alignItems: 'center',
=======
    justifyContent: "center",
    padding: 32,
    gap: 16,
    position: "relative",
  },
  containerModal: {
    flex: 1,
    backgroundColor: "white",
    gap: 16,
    padding: 20,
>>>>>>> Stashed changes
  },
});