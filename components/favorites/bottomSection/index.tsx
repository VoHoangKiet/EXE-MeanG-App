import { View, StyleSheet, ScrollView } from "react-native";
import Spin from "@/components/common/Spin";
import { useOutfits } from "@/hooks/outfit/useOutfits";
import { Outfit } from "@/types/outfit.type";
import SquareOutfit from "./SquareOutfit";
import { useState } from "react";

type Props = {
  selectedOutfit: Outfit | null;
  setSelectedOutfit: React.Dispatch<React.SetStateAction<Outfit | null>>;
  onPickOutfit?: (outfit: Outfit) => void;
};

export default function BottomFavoritesSection({
  selectedOutfit,
  setSelectedOutfit,
  onPickOutfit,
}: Props) {
  const { data: outfits, isLoading } = useOutfits();
  // Local state for favorite toggling (demo only)
  const [favoriteMap, setFavoriteMap] = useState<Record<string, boolean>>({});

  if (isLoading) {
    return <Spin />;
  }

  const pickOutfit = (outfit: Outfit) => {
    setSelectedOutfit(outfit);
    onPickOutfit?.(outfit);
  };

  const isItemSelected = (outfit: Outfit) => {
    return outfit._id === selectedOutfit?._id;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.bottomSection}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {outfits?.map((outfit) => (
            <View key={outfit._id} style={styles.squareWrapper}>
              <SquareOutfit
                itemUrl={outfit.imageUrl}
                onPress={() => pickOutfit(outfit)}
                isSelected={isItemSelected(outfit)}
                isFavorite={favoriteMap[outfit._id] ?? outfit.isFavorite}
              />
            </View>
          ))}
        </View>
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
    paddingVertical: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  squareWrapper: {
    alignItems: "center",
  },
});
