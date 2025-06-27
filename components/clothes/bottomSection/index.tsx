import { View, StyleSheet, ScrollView, Alert } from "react-native";
import SquareAddButton from "./SquareAddButton";
import SquareItem from "./SquareItem";
import { useItems } from "@/hooks/item/useItems";
import Spin from "@/components/common/Spin";
import { Item } from "@/types/item.type";
import { useAddItem } from "@/hooks/item/useAddItem";
import { useState } from "react";
import OptionModalCustom, {
  ImageSource,
  ImageType,
} from "@/components/setting/modal/OptionModalCustom";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "@ant-design/react-native";

const CATEGORIES = ["shirt", "pants", "shoes"] as const;

type Props = {
  selectedItems: Record<string, Item | null>;
  setSelectedItems: React.Dispatch<
    React.SetStateAction<Record<string, Item | null>>
  >;
  onPickItem?: (item: Item) => void;
};

export default function BottomSection({
  selectedItems,
  setSelectedItems,
  onPickItem,
}: Props) {
  const { data: items, isLoading } = useItems();
  const [modalVisible, setModalVisible] = useState(false);
  const [addingCategory, setAddingCategory] = useState<string | null>(null);

  const { mutate: addItem, isPending } = useAddItem();

  const groupedItems = items?.reduce((acc, item) => {
    if (!acc[item.category_enum]) {
      acc[item.category_enum] = [];
    }
    acc[item.category_enum].push(item);
    return acc;
  }, {} as Record<string, Item[]>);

  const pickItem = (item: Item) => {
    const category = item.category_enum;
    const currentSelected = selectedItems[category];
    const isSelected = currentSelected?._id === item._id;
    if (isSelected) {
      setSelectedItems((prev) => ({
        ...prev,
        [category]: null,
      }));
    } else {
      setSelectedItems((prev) => ({
        ...prev,
        [category]: item,
      }));
    }
  };

  const isItemSelected = (item: Item) => {
    const category = item.category_enum;
    return selectedItems[category]?._id === item._id;
  };

  const handleModalConfirm = async (value: ImageType | ImageSource) => {
    setModalVisible(false);
    let result;
    if (value === "camera") {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
    } else if (value === "library") {
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
    } else {
      return;
    }
    if (!result.canceled && result.assets?.length > 0) {
      const formData = new FormData();
      formData.append("name", "New Item");
      formData.append("categoryEnum", addingCategory || "default");
      formData.append("image", {
        uri: result.assets[0].uri,
        name: "item.jpg",
        type: "image/jpeg",
      } as any);
      addItem(formData, {
        onSuccess: () => {
          setAddingCategory(null);
          Toast.success("Thêm item thành công");
        },
        onError: () => {
          Toast.fail("Thêm item thất bại");
        },
      });
    }
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.bottomSection}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        {CATEGORIES.map((category) => (
          <View key={category} style={styles.column}>
            <SquareAddButton
              onPress={() => {
                setAddingCategory(category);
                setModalVisible(true);
              }}
              loading={isPending && addingCategory === category}
            />
            {groupedItems?.[category]?.map((item) => (
              <SquareItem
                key={item._id}
                itemUrl={item.imageLink}
                onPress={() => (onPickItem ? onPickItem(item) : pickItem(item))}
                isSelected={isItemSelected(item)}
              />
            ))}
          </View>
        ))}
      </ScrollView>

      <OptionModalCustom
        visible={modalVisible}
        mode="imageSource"
        onSelect={handleModalConfirm}
        onCancel={() => setModalVisible(false)}
        isUploading={isPending}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  bottomSection: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 20,
    paddingVertical: 10,
  },
  column: {
    width: 100,
    gap: 15,
  },
});
