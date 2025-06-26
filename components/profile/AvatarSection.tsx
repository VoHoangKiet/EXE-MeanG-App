import React from "react";
import { View, Image, Text, ActivityIndicator, StyleSheet } from "react-native";

interface AvatarSectionProps {
  avatar: string | undefined;
  username: string;
  email: string;
  uid: string | undefined;
  isUploading: boolean;
}

export function AvatarSection({
  avatar,
  username,
  email,
  uid,
  isUploading,
}: AvatarSectionProps) {
  return (
    <View style={styles.avatarContainer}>
      {avatar ? (
        <View style={{ position: "relative" }}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          {isUploading && (
            <View style={styles.loadingOverlayAvatar}>
              <ActivityIndicator size="large" color="#5199a3" />
            </View>
          )}
        </View>
      ) : (
        <View style={styles.avatar} />
      )}
      <Text style={styles.name}>{username}</Text>
      <Text style={styles.email}>{email}</Text>
      {uid && <Text style={styles.uid}>UID: {uid}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#444",
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "center",
    color: "#222",
  },
  email: {
    fontSize: 16,
    color: "#5199a3",
    marginBottom: 2,
    textAlign: "center",
    fontWeight: "500",
  },
  uid: {
    fontSize: 13,
    color: "#aaa",
    marginBottom: 10,
    textAlign: "center",
  },
  loadingOverlayAvatar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.6)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
    zIndex: 2,
  },
});
