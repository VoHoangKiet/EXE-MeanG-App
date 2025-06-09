import { Icon } from "@ant-design/react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function ChatScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="edit" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>{/* Your chat content will go here */}</View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.optionalBtn}>
          <Text style={styles.optionalText}>Optional</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createBtn}>
          <Text style={styles.createText}>Tạo outfit ngay</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Gợi ý trang phục hôm nay"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendBtn}>
          <Text style={styles.sendText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  optionalBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  optionalText: {
    fontSize: 14,
    color: "#555",
  },
  createBtn: {
    backgroundColor: "#111",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  createText: {
    color: "#fff",
    fontSize: 14,
  },
  input: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    fontSize: 15,
    flex: 1,
  },
  sendBtn: {
    backgroundColor: "#111",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  sendText: {
    color: "#fff",
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 10,
    gap: 10,
  },
});
