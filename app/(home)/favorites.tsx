import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ImageBackground,
  Alert,
} from "react-native";
import BoxItem from "@/components/clothes/BoxItem";
import { useItems } from "@/hooks/item/useItems";
import { useOutfits } from "@/hooks/outfit/useOutfits";
import Spin from "@/components/common/Spin";
import { Outfit } from "@/types/outfit.type";
import { Item } from "@/types/item.type";
import BottomFavoritesSection from "@/components/favorites/bottomSection";
import VerticalActionButtonsFavorites from "@/components/favorites/button/ButtonAction";
import { handleDownloadImage } from "@/utils/handleDownloadImage";
import { useFavorite } from "@/hooks/outfit/useFavorite";

export default function FavoritesScreen() {
  const { data: outfits, isLoading: isOutfitsLoading } = useOutfits();
  const { data: items, isLoading: isItemsLoading } = useItems();
  const { mutate: favoriteOutfit, isPending: isFavoritePending } = useFavorite();
  const [loading, setLoading] = useState(false);
  const [outfitSelected, setOutfitSelected] = useState<Outfit | null>(null);
  const [selectedItems, setSelectedItems] = useState<any>({
    shirt: null,
    pants: null,
    shoes: null,
  });
  useEffect(() => {
    if (outfits && outfitSelected) {
      const filteredItems = outfitSelected.items.map((item) =>
        items?.find((i) => i._id === item)
      );
      setSelectedItems({
        shirt: filteredItems?.find((item) => item?.category_enum === "shirt"),
        pants: filteredItems?.find((item) => item?.category_enum === "pants"),
        shoes: filteredItems?.find((item) => item?.category_enum === "shoes"),
      });
    }
  }, [outfits, outfitSelected]);

  const handleDownload = () => {
    if (outfitSelected) {
      Alert.alert(
        "Xác nhận tải ảnh",
        "Bạn có muốn tải ảnh outfit này về máy?",
        [
          { text: "Huỷ", style: "cancel" },
          {
            text: "Tải ảnh",
            onPress: () =>
              handleDownloadImage(
                outfitSelected.imageUrl,
                outfitSelected.name,
                setLoading
              ),
          },
        ]
      );
    }
  };

  const handleFavorite = () => {
    if (outfitSelected) {
      favoriteOutfit(outfitSelected._id);
    }
  };

  if (isOutfitsLoading || isItemsLoading) {
    return <Spin />;
  }

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={styles.safeArea}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.topSection}>
            {outfitSelected && (
              <Image
                source={{ uri: outfitSelected.imageUrl }}
                style={styles.bodyImage}
                resizeMode="cover"
              />
            )}
            <View style={styles.boxContainerLeft}>
              <BoxItem item={selectedItems.shirt as Item} />
              <BoxItem item={selectedItems.pants as Item} />
              <BoxItem item={selectedItems.shoes as Item} />
            </View>
            <View style={styles.boxContainerRight}>
              <VerticalActionButtonsFavorites
                onDownload={handleDownload}
                loadingAction={loading ? "download" : null}
                onFavorite={handleFavorite}
                loadingActionFavorite={isFavoritePending ? "heart" : null}
              />
            </View>
          </View>

          <BottomFavoritesSection
            selectedOutfit={outfitSelected}
            setSelectedOutfit={setOutfitSelected}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  topSection: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    position: "relative",
  },
  boxContainerLeft: {
    position: "absolute",
    left: 5,
    right: 0,
    height: "100%",
    width: "15%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 50,
  },
  boxContainerRight: {
    position: "absolute",
    right: 5,
    height: "100%",
    width: "15%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  bodyImage: {
    width: "70%",
    height: "100%",
  },
});
