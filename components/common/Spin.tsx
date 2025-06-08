import { ActivityIndicator, View } from "react-native";

export default function Spin() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#99ced3" />
    </View>
  );
}
