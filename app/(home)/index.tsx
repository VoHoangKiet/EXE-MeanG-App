import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Linking,
} from "react-native";
import { useProfile } from "@/hooks/profile/useProfile";
import Spin from "@/components/common/Spin";
import BoxItem from "@/components/clothes/BoxItem";
import VerticalActionButtons from "@/components/clothes/button/ButtonAction";
import BottomSection from "@/components/clothes/bottomSection";
import { Item } from "@/types/item.type";
import { useCreateOutfit } from "@/hooks/outfit/useCreateOutfit";
import { Outfit } from "@/types/outfit.type";
import { useFavorite } from "@/hooks/outfit/useFavorite";
import { Toast } from "@ant-design/react-native";
import { delay } from "@/utils/delay";
import PaymentModal from "@/components/payment/PaymentModal";
import { useCreatePayment } from "@/hooks/payment/usePayment";

export default function ClothesScreen() {
  const { data: profile, isLoading } = useProfile();
  const { mutate: createOutfit, isPending } = useCreateOutfit();
  const { mutate: favoriteOutfit } = useFavorite();
  const [selectedItems, setSelectedItems] = useState<
    Record<string, Item | null>
  >({
    shirt: null,
    pants: null,
    shoes: null,
  });
  const [outfit, setOutfit] = useState<Outfit | null>(null);
  const [_history, setHistory] = useState<Record<string, Item | null>[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handlePickItem = (item: Item) => {
    const category = item.category_enum;
    const currentSelected = selectedItems[category];
    const isSelected = currentSelected?._id === item._id;
    setHistory((prev) => [...prev, selectedItems]);
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

  const handleClear = () => {
    setHistory((prev) => [...prev, selectedItems]);
    setSelectedItems({ shirt: null, pants: null, shoes: null });
  };

  const handleBack = () => {
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setSelectedItems(last);
      return prev.slice(0, -1);
    });
  };

  const handleSubmit = () => {
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    const items = Object.values(selectedItems).filter((item) => item !== null);
    const itemIds = items.map((item) => item._id);
    createOutfit(itemIds, {
      onSuccess: (data) => {
        setOutfit(data.data);
        setHistory([]);
      },
      onError: async (error: any) => {
        Toast.fail(error.response.data.errors[0].errorMessage);
        await delay(1000);
        setShowPaymentModal(true);
      },
      onSettled: () => {
        setShowConfirmModal(false);
      },
    });
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  const handleFavorite = () => {
    if (outfit) {
      favoriteOutfit(outfit._id, {
        onSuccess: () => {
          Toast.success("Yêu thích thành công");
        },
      });
    } else {
      Toast.fail("Outfit chưa được tạo");
    }
  };

  const { mutate: createPayment, isPending: isCreatingPayment } =
    useCreatePayment();

  const handleSelectPackage = (packageId: string) => {
    let amount = 0;
    switch (packageId) {
      case "basic":
        amount = 49000;
        break;
      case "premium":
        amount = 99000;
        break;
      case "pro":
        amount = 259000;
        break;
    }
    createPayment(amount, {
      onSuccess: (data) => {
        Linking.openURL(data.data);
      },
      onError: (error: any) => {
        Toast.fail(error.response.data.errors[0].errorMessage);
      },
    });
  };

  if (isLoading) return <Spin />;

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={styles.safeArea}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.topSection}>
            <Image
              source={{ uri: outfit?.imageUrl || profile?.bodyImageUrl }}
              style={styles.bodyImage}
              resizeMode="cover"
            />
            <View style={styles.boxContainerLeft}>
              <BoxItem item={selectedItems.shirt} />
              <BoxItem item={selectedItems.pants} />
              <BoxItem item={selectedItems.shoes} />
            </View>
            <View style={styles.boxContainerRight}>
              <VerticalActionButtons
                onBack={handleBack}
                onClear={handleClear}
                onSubmit={handleSubmit}
                onFavorite={handleFavorite}
              />
            </View>
          </View>

          <BottomSection
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            onPickItem={handlePickItem}
          />
        </View>
        <Modal
          visible={showConfirmModal}
          transparent
          animationType="fade"
          onRequestClose={handleCancel}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Xác nhận ghép đồ?</Text>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  onPress={handleCancel}
                  style={styles.modalButton}
                >
                  <Text style={styles.modalCancelText}>Huỷ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleConfirm}
                  style={[styles.modalButton, { opacity: isPending ? 0.5 : 1 }]}
                  disabled={isPending}
                >
                  <Text style={styles.modalConfirmText}>
                    {isPending ? "Đang tạo..." : "Xác nhận"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
      <PaymentModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSelectPackage={handleSelectPackage}
        loading={isCreatingPayment}
      />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: "center",
    minWidth: 260,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalActions: {
    paddingTop: 20,
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-between",
  },
  modalButton: {
    minWidth: 70,
    alignItems: "center",
  },
  modalCancelText: {
    color: "#888",
    fontSize: 16,
  },
  modalConfirmText: {
    color: "#2196F3",
    fontWeight: "bold",
    fontSize: 16,
  },
});
