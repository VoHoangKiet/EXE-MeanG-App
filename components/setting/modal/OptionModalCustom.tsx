import { ActivityIndicator } from "@ant-design/react-native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

export type ImageType = "avatar" | "body";
export type ImageSource = "camera" | "library";

type Props = {
  visible: boolean;
  mode: "imageType" | "imageSource";
  onSelect: (value: ImageType | ImageSource) => void;
  onCancel: () => void;
  isUploading: boolean;
};

export default function OptionModalCustom({
  visible,
  mode,
  onSelect,
  onCancel,
  isUploading,
}: Props) {
  const isImageType = mode === "imageType";

  const title = isImageType
    ? "Bạn muốn sử dụng ảnh này để?"
    : "Chọn nguồn ảnh";

  const options = isImageType
    ? [
        { label: "Ảnh đại diện", value: "avatar" },
        { label: "Ảnh toàn thân", value: "body" },
      ]
    : [
        { label: "Camera", value: "camera" },
        { label: "Thư viện", value: "library" },
      ];

  return (
    <Modal isVisible={visible} backdropOpacity={0.5}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.optionList}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              style={styles.optionButton}
              onPress={() => onSelect(opt.value as any)}
              disabled={isUploading}
            >
              <Text style={styles.optionText}>{opt.label}</Text>
              {isUploading && (
                <ActivityIndicator size="small" color="#000" />
              )}
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelText}>Hủy</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  optionList: {
    width: "100%",
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: "#eef4f8",
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  optionText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
  },
  cancelText: {
    fontWeight: "bold",
    color: "#444",
  },
});
