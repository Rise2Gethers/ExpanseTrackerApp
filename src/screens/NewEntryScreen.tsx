import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as productSchema from "../database/schemas/productSchema";
import { asc, eq, like } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { green100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Data = {
  id: number;
  name: string;
};

type CategoryItem = {
  id: number;
  name: string;
  color: string;
};

type RootStackParamList = {
  Home: undefined;
  NewEntryScreen: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList, "NewEntryScreen">;

interface NewEntryScreenProps {
  navigation: any; // Substitua por NavigationProp se estiver usando TypeScript com React Navigation
  route?: any;
}

export function NewEntryScreen({ navigation, route }: NewEntryScreenProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [newCategory, setNewCategory] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Data[]>([]);
  const [categorySelected, setCategorySelected] = useState("");

  const CATEGORY_COLORS = [
    "#F44336",
    "#E91E63",
    "#9C27B0",
    "#673AB7",
    "#3F51B5",
    "#2196F3",
    "#009688",
    "#4CAF50",
    "#FF9800",
    "#795548",
  ];

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

  async function fetchCategory() {
    try {
      const result = await db.query.category.findMany({
        orderBy: [asc(productSchema.category.name)],
      });

      if (result) {
        const formattedList = result.map((cat) => ({
          id: cat.id,
          name: cat.name,
          color: cat.color,
        }));
        setCategories(formattedList);
      }
    } catch (error) {
      console.error("Erro ao buscar categoria:", error);
    }
  }

  const add = async () => {
    if (!name.trim() || !category.trim() || !selectedColor.trim()) {
      Alert.alert("Preencha nome, categoria e cor!");
      return;
    }

    try {
      let finalCategoryId: number;

      const existingCategory = await db.query.category.findFirst({
        where: eq(productSchema.category.name, category),
      });

      if (existingCategory) {
        console.log("Categoria já existe, usando ID:", existingCategory.id);
        finalCategoryId = existingCategory.id;
      } else {
        console.log("Categoria nova, criando...");
        const newCategoryResponse = await db
          .insert(productSchema.category)
          .values({ name: category, color: selectedColor });
        finalCategoryId = newCategoryResponse.lastInsertRowId;
      }

      const responseProduct = await db.insert(productSchema.product).values({
        name: name,
        categoryId: finalCategoryId,
      });

      Alert.alert("Produto salvo com sucesso!");

      setName("");
      setCategory("");
      await fetchCategory();
      await fetchProducts();
      navigation.goBack();
    } catch (error) {
      console.log("Erro ao salvar:", error);
      Alert.alert("Erro ao salvar dados");
    }
  };

  const selected = (name: string, color: string) => {
    setCategorySelected(name);
    setCategory(name);
    setSelectedColor(color);
  };

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, [search]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="nome"
        style={styles.input}
        onChangeText={setName}
        value={name}
      />

      {categories.length > 0 ? (
        <>
          <View style={styles.categoryRow}>
            {categories.map((cat) => (
              <Pressable
                onPress={() => selected(cat.name, cat.color)}
                key={cat.id}
                style={{
                  backgroundColor: cat.color,
                  borderRadius: 20,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  marginRight: 8,
                  marginBottom: 15,
                }}
              >
                {categorySelected === cat.name ? (
                  <Text style={{ color: "green" }} key={cat.id}>
                    {cat.name} (ID: {cat.id})
                  </Text>
                ) : (
                  <Text key={cat.id} style={{ color: "white" }}>
                    {cat.name} (ID: {cat.id})
                  </Text>
                )}
              </Pressable>
            ))}
            <Button
              title="Nova categoria"
              onPress={() => setNewCategory(!newCategory)}
            />
          </View>
          {newCategory && (
            <>
              <TextInput
                placeholder="nova categoria"
                style={styles.input}
                onChangeText={setCategory}
                value={category}
              />
              <Text>Selecione uma cor para a categoria:</Text>
              <View style={styles.categoryRow}>
                {CATEGORY_COLORS.map((color, i) => (
                  <Pressable
                    key={i}
                    onPress={() => setSelectedColor(color)}
                    style={{
                      borderColor: "green",
                      borderRadius: 20,
                      borderWidth: selectedColor === color ? 5 : 0,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: color,
                        padding: 10,
                        borderRadius: 20,
                        width: 20,
                        height: 20,
                      }}
                    ></View>
                  </Pressable>
                ))}
              </View>
            </>
          )}
        </>
      ) : (
        <>
          <TextInput
            placeholder="categoria"
            style={styles.input}
            onChangeText={setCategory}
            value={category}
          />
          <Text>Selecione uma cor para a categoria:</Text>
          <View style={styles.categoryRow}>
            {CATEGORY_COLORS.map((color, i) => (
              <Pressable
                key={i}
                onPress={() => setSelectedColor(color)}
                style={{
                  borderColor: "green",
                  borderRadius: 20,
                  borderWidth: selectedColor === color ? 5 : 0,
                }}
              >
                <View
                  style={{
                    backgroundColor: color,
                    padding: 10,
                    borderRadius: 20,
                    width: 20,
                    height: 20,
                  }}
                ></View>
              </Pressable>
            ))}
          </View>
        </>
      )}

      <Button title="Salvar" onPress={add} />
      <Button
        title="Cancelar"
        onPress={() => navigation.goBack()}
        color="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    gap: 16,
  },
  input: {
    height: 54,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#999",
    paddingHorizontal: 16,
  },
  categoryRow: {
    minHeight: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});
