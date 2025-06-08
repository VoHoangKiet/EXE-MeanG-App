import { View, StyleSheet, ScrollView } from "react-native";
import SquareAddButton from "./SquareAddButton";
import SquareItem from "./SquareItem";
import { useItems } from "@/hooks/item/useItems";
import Spin from "@/components/common/Spin";
import { Item } from "@/types/item.type";

const CATEGORIES = ['shirt', 'pants', 'shoes'] as const;

export default function BottomSection() {
  const { data: items, isLoading } = useItems();

  if (isLoading) {
    return <Spin/>;
  }

  const groupedItems = items?.reduce((acc, item) => {
    if (!acc[item.category_enum]) {
      acc[item.category_enum] = [];
    }
    acc[item.category_enum].push(item);
    return acc;
  }, {} as Record<string, Item[]>);

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.bottomSection}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        {CATEGORIES.map((category) => (
          <View key={category} style={styles.column}>
            <SquareAddButton />
            {groupedItems?.[category]?.map((item) => (
              <SquareItem 
                key={item._id}
                itemUrl={item.imageLink}
              />
            ))}
          </View>
        ))}
      </ScrollView>
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
    gap: 10,
  },
});
