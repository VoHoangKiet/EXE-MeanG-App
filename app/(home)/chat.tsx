import { Icon } from "@ant-design/react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { useState, useCallback } from "react";
import { useChat } from "@/hooks/chat/useChat";
import { Item } from "@/types/item.type";
import { useItems } from "@/hooks/item/useItems";

interface Message {
  id: string;
  message: string;
  sender: "user" | "bot";
  outfit?: Item[];
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { mutate: askChatbot } = useChat();
  const { data: items } = useItems();

  const generateUniqueId = useCallback(() => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }, []);

  const handleGetItemFromArrayId = (arrayId: string[]) => {
    return arrayId
      .map((id) => items?.find((item) => item._id === id))
      .filter(Boolean) as Item[];
  };

  const handleSend = () => {
    if (input.trim() === "") return;
    const userMessageId = generateUniqueId();
    
    setMessages((prev) => [
      ...(prev || []),
      {
        id: userMessageId,
        message: input,
        sender: "user",
        outfit: [],
      },
    ]);

    askChatbot(input, {
      onSuccess: (data) => {
        setMessages((prev) => [
          ...(prev || []),
          {
            id: generateUniqueId(),
            message: data.data.reply ? data.data.reply : data.data,
            sender: "bot",
            outfit: data.data.outfit
              ? handleGetItemFromArrayId(data.data.outfit)
              : [],
          },
        ]);
      },
    });
    setInput("");
  };

  const renderOutfitItem = (item: Item) => (
    <View style={styles.outfitItemContainer} key={item._id}>
      <Image
        source={{ uri: item.imageLink }}
        style={styles.outfitImage}
        resizeMode="cover"
      />
      <View style={styles.outfitItemInfo}>
        <Text style={styles.outfitItemName}>{item.name}</Text>
        <Text style={styles.outfitItemType}>{item.category_enum}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="edit" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          renderItem={({ item }) => (
            <View>
              <View
                style={[
                  styles.bubble,
                  item.sender === "user" ? styles.userBubble : styles.botBubble,
                ]}
              >
                <Text
                  style={
                    item.sender === "user" ? styles.userText : styles.botText
                  }
                >
                  {item.message}
                </Text>
              </View>
              {item.sender === "bot" &&
                item.outfit &&
                Array.isArray(item.outfit) &&
                item.outfit.length > 0 && (
                  <View style={styles.outfitContainer}>
                    <Text style={styles.outfitTitle}>Gợi ý outfit:</Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      {item.outfit.map((item) => renderOutfitItem(item))}
                    </ScrollView>
                  </View>
                )}
            </View>
          )}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      </View>

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
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
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
    paddingHorizontal: 16,
  },
  bubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 16,
    marginVertical: 4,
    alignSelf: "flex-start",
  },
  userBubble: {
    backgroundColor: "#5199a3",
    alignSelf: "flex-end",
  },
  botBubble: {
    backgroundColor: "#eee",
    alignSelf: "flex-start",
  },
  userText: {
    color: "#fff",
  },
  botText: {
    color: "#222",
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
  outfitContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 8,
    marginLeft: 8,
    marginBottom: 8,
  },
  outfitTitle: {
    fontWeight: "bold",
    color: "#5199a3",
    marginBottom: 8,
    fontSize: 14,
  },
  outfitItemContainer: {
    width: 120,
    marginRight: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  outfitImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#f0f0f0",
  },
  outfitItemInfo: {
    padding: 8,
  },
  outfitItemName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  outfitItemType: {
    fontSize: 11,
    color: "#666",
    textTransform: "capitalize",
  },
});
