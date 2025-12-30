import React, { useState, useEffect } from "react";
import {
  Text,
  ActivityIndicator,
  Pressable,
  Button,
  TextInput,
  Alert,
  View,
} from "react-native";
import { asc, eq, like } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as productSchema from "../database/schemas/productSchema";
import { useSQLiteContext } from "expo-sqlite";

export function CategoryLabel() {
  const database = useSQLiteContext();
  const db = drizzle(database, { schema: productSchema });
  // 1. ESTADO: Começamos sem nada (null) e com carregamento (true)
  const [categoryName, setCategoryName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [showCategory, setShowCategory] = useState(false);

  // 2. EFEITO: Roda assim que o componente aparece na tela
  useEffect(() => {
    async function fetchCategory() {
      try {
        const result = await db.query.category.findFirst({
          where: eq(productSchema.category.id, 1),
        });

        if (result) {
          setCategoryName(result.name);
        }
      } catch (error) {
        console.error("Erro ao buscar categoria:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategory();
  });

  async function add() {
    try {
      await db
        .insert(productSchema.category)
        .values({ name: category, color: "#0b92e0ff" });

      setCategory("");
    } catch (error) {
      console.log(error);
    }
  }

  async function showCreateCategory() {
    setShowCategory(true);
  }

  if (isLoading) {
    return <Text>Carregando...</Text>; // ou <ActivityIndicator />
  }

  return (
    <Pressable style={{gap: 16}}>
      <Text>
        {categoryName ? (
          categoryName
        ) : (
          <Button title="Cadastrar categoria" onPress={showCreateCategory} />
        )}
      </Text>

      <View  style={{display: showCategory? "flex" : "none", gap: 16}}>
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

        <Button title="salvar" onPress={add} />
      </View>
    </Pressable>
  );
}
