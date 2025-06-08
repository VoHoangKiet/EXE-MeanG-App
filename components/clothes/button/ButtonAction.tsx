import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const actions = [
  {
    icon: <MaterialIcons name="add-box" size={17} color="#5199a3" />,
    onPress: () => {},
  },
  {
    icon: <Feather name="download" size={17} color="#5199a3" />,
    onPress: () => {},
  },
  {
    icon: <AntDesign name="hearto" size={17} color="#5199a3" />,
    onPress: () => {},
  },
  {
    icon: <Feather name="rotate-ccw" size={17} color="#5199a3" />,
    onPress: () => {},
  },
  {
    icon: <AntDesign name="close" size={17} color="#5199a3" />,
    onPress: () => {},
  },
];

const VerticalActionButtons = () => {
  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={action.onPress}
        >
          <LinearGradient
            colors={[
              "#FBFBFD",
              "#C8D4DA",
              "#AEC0CE",
              "#E3E9EE",
              "#FAFBFC",
              "#D6DFE6",
              "#B8C9D3",
            ]}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.9, y: 0.9 }}
            style={styles.gradient}
          >
            {action.icon}
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  },
  button: {
    borderRadius: 50,
    overflow: "hidden",
  },
  gradient: {
    width: 35,
    height: 35,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});

export default VerticalActionButtons;
