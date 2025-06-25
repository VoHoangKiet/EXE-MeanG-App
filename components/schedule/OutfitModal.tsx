import { useItems } from "@/hooks/item/useItems";
import { Outfit } from "@/types/outfit.type";
import {
  Modal,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

export default function OutfitModal({
  visible,
  outfit,
  onClose,
}: {
  visible: boolean;
  outfit: Outfit;
  onClose: () => void;
}) {
  const { data: items } = useItems();
  const filteredItems = items?.filter((item) =>
    outfit && outfit.items ? outfit.items.includes(item._id) : false
  );
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.3)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 24,
            minWidth: 300,
            maxWidth: 350,
            maxHeight: 500,
          }}
        >
          <ScrollView
            style={{
              height: "100%",
            }}
          >
            {filteredItems && filteredItems.length > 0 ? (
              <View style={{ height: "100%", gap: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {filteredItems.map((item) => (
                    <View key={item._id}>
                      <View
                        style={{
                          width: 48,
                          height: 48,
                          marginRight: 12,
                          borderRadius: 8,
                          overflow: "hidden",
                          backgroundColor: "#eee",
                        }}
                      >
                        <Image
                          source={{ uri: item.imageLink }}
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="cover"
                        />
                      </View>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Image
                    source={{ uri: outfit.imageUrl }}
                    style={{
                      width: "80%",
                      height: 300,
                      alignSelf: "center",
                      borderRadius: 16,
                    }}
                  />
                </View>
              </View>
            ) : (
              <Text>Không có dữ liệu outfit.</Text>
            )}
          </ScrollView>
          <TouchableOpacity
            style={{
              marginTop: 16,
              alignSelf: "center",
            }}
            onPress={onClose}
          >
            <Text style={{ color: "#2196F3", fontWeight: "bold" }}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
