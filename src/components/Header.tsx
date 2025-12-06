import React from "react";
import { Appbar, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";

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
  const theme = useTheme();
  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.surface }} elevated>
      {showBackButton ? (
        <Appbar.BackAction onPress={onBackPress} />
      ) : (
        <View style={{ width: 48 }} />
      )}

      <Appbar.Content title={title} titleStyle={styles.title} />

      <View style={{ width: 48 }} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
  },
});
