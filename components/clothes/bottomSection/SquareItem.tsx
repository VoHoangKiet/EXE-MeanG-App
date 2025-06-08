import { View, StyleSheet, ViewStyle, Image, TouchableOpacity } from "react-native";

interface Props {
  onPress?: () => void;
  style?: ViewStyle;
  itemUrl?: string;
}

export default function SquareItem({ onPress, style, itemUrl }: Props) {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress}>
        <Image source={{ uri: itemUrl }} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
