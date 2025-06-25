import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  onPress?: () => void;
  style?: ViewStyle;
}

const SquareAddButton = ({ onPress, style }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.shadow, style]}>
      <LinearGradient
        colors={["#ffffff", "#f2f4f6"]}
        style={styles.button}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
          <AntDesign name="plus" size={50} color="#5199a3" />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    height: 100,
    width: 100,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SquareAddButton;
