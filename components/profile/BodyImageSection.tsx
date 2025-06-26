import React from "react";
import { View, Image, ActivityIndicator, StyleSheet } from "react-native";

interface BodyImageSectionProps {
  bodyImageUrl: string | undefined;
  isUploading: boolean;
}

export function BodyImageSection({
  bodyImageUrl,
  isUploading,
}: BodyImageSectionProps) {
  if (!bodyImageUrl) return null;
  return (
    <View style={{ position: "relative", width: "100%" }}>
      <Image
        source={{ uri: bodyImageUrl }}
        style={styles.bodyImage}
        resizeMode="cover"
      />
      {isUploading && (
        <View style={styles.loadingOverlayBody}>
          <ActivityIndicator size="large" color="#5199a3" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bodyImage: {
    height: 400,
    width: "95%",
    alignSelf: "center",
    borderRadius: 18,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#eee",
  },
  loadingOverlayBody: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.6)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    zIndex: 2,
  },
});
