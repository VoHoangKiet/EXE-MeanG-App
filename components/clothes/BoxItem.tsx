import { View, StyleSheet } from "react-native";

export default function Box() {
  return <View style={styles.box} />;
}

const styles = StyleSheet.create({
  box: {
    width: 50,
    height: 50,
    backgroundColor: "#D9D9D9",
    borderRadius: 2,
    shadowColor: "#8B8BFF",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#E0E0FF",
  },
});
