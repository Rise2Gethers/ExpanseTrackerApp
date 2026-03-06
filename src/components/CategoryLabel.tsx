import React, { useState, useEffect, useMemo } from "react";
import { Text, Pressable, Button, TextInput, View } from "react-native";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";

import * as schema from "../database/schemas/productSchema";

export function CategoryLabel() {
  const database = useSQLiteContext();

  const db = useMemo(() => drizzle(database, { schema }), [database]);

  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryInput, setCategoryInput] = useState("");
  const [showCategory, setShowCategory] = useState(false);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const result = await db.query.category.findFirst();

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
  }, [db]);

  async function add() {
    try {
      await db
        .insert(schema.category)
        .values({ name: categoryInput, color: "#0b92e0ff" });

      setCategoryName(categoryInput);
      setCategoryInput("");
      setShowCategory(false);
    } catch (error) {
      console.log("Erro ao salvar:", error);
    }
  }

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <Pressable style={{ gap: 16 }}>
      <Text>
        {categoryName ? (
          categoryName
        ) : (
          <Button
            title="Cadastrar categoria"
            onPress={() => setShowCategory(true)}
          />
        )}
      </Text>

      <View style={{ display: showCategory ? "flex" : "none", gap: 16 }}>
        <TextInput
          placeholder="Nome da categoria"
          style={{
            height: 54,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#999",
            paddingHorizontal: 16,
          }}
          onChangeText={setCategoryInput}
          value={categoryInput}
        />

        <Button title="Salvar" onPress={add} />
      </View>
    </Pressable>
  );
}
