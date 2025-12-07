import React from "react"; // Removi o useState, pois não vamos usar localmente
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import {
  Text,
  Avatar,
  List,
  Switch,
  Button,
  Divider,
  useTheme,
} from "react-native-paper";
import { Header } from "../components";
import { usePreferences } from "../contexts/PreferencesContext"; // <--- 1. IMPORT NOVO

interface SettingsScreenProps {
  navigation: any;
}

export function SettingsScreen({ navigation }: SettingsScreenProps) {
  const theme = useTheme();

  // 2. SUBSTITUIÇÃO: Trocamos o useState local pelo Hook Global
  // Agora estamos lendo e escrevendo direto no "cérebro" do App
  const { isThemeDark, toggleTheme } = usePreferences();

  const handleWipeData = () => {
    Alert.alert(
      "Zona de Perigo",
      "Tem certeza que deseja apagar TODOS os dados? Essa ação é irreversível.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim, Apagar",
          style: "destructive",
          onPress: () => console.log("Apagando..."),
        },
      ],
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header
        title="Ajustes"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileSection}>
          <Avatar.Text
            size={80}
            label="KS"
            style={{ backgroundColor: theme.colors.primary }}
          />
          <Text
            variant="titleLarge"
            style={[styles.name, { color: theme.colors.onBackground }]}
          >
            Kenji Shimizu
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
            Rise2Gethers CTO
          </Text>
        </View>

        <Divider style={styles.divider} />

        <List.Section>
          <List.Subheader>Preferências</List.Subheader>

          <List.Item
            title="Tema Escuro"
            description="Alternar entre Light e Dark mode"
            left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => (
              <Switch
                value={isThemeDark} // <--- 3. Valor vem do Global
                onValueChange={toggleTheme} // <--- Ação vai pro Global
              />
            )}
          />

          <List.Item
            title="Categorias"
            description="Gerenciar categorias de gastos"
            left={(props) => <List.Icon {...props} icon="shape-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log("Ir para categorias")}
          />
        </List.Section>

        <Divider style={styles.divider} />

        <List.Section>
          <List.Subheader style={{ color: theme.colors.error }}>
            Zona de Perigo
          </List.Subheader>

          <Button
            mode="outlined"
            textColor={theme.colors.error}
            style={{ borderColor: theme.colors.error, marginHorizontal: 16 }}
            icon="delete-outline"
            onPress={handleWipeData}
          >
            Apagar Todos os Dados
          </Button>

          <Text style={styles.versionText}>Versão 1.0.0 (MVP)</Text>
        </List.Section>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 30,
  },
  name: {
    fontWeight: "bold",
    marginTop: 10,
  },
  divider: {
    marginVertical: 10,
  },
  versionText: {
    textAlign: "center",
    marginTop: 20,
    color: "#aaa",
    fontSize: 12,
  },
});
