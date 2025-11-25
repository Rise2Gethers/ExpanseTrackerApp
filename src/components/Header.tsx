import React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export const Header = ({
  title,
  showBackButton = false,
  onBackPress,
}: HeaderProps) => {
  return (
    <Appbar.Header style={styles.header} elevated>
      {/* Se showBackButton for true, mostra a setinha */}
      {showBackButton && <Appbar.BackAction onPress={onBackPress} />}

      {/* O Título centralizado */}
      <Appbar.Content title={title} titleStyle={styles.title} />

      {/* Truque: Um ícone invisível na direita para o título ficar perfeitamente centralizado se tiver botão de voltar na esquerda */}
      {showBackButton && <Appbar.Action icon="circle" color="transparent" />}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff", // Fundo branco igual ao design
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center", // Garante que o texto fique no meio
  },
});
