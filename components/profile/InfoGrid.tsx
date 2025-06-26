import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

interface InfoGridProps {
  profile: any;
  show: (value: any, unit?: string) => string;
}

export function InfoGrid({ profile, show }: InfoGridProps) {
  return (
    <View style={styles.infoGrid}>
      <View style={styles.infoBox}>
        <MaterialCommunityIcons
          name="gender-male-female"
          size={18}
          color="#5199a3"
          style={styles.infoIcon}
        />
        <Text style={styles.infoText}>
          {show(
            profile?.gender === "male"
              ? "Nam"
              : profile?.gender === "female"
              ? "Nữ"
              : profile?.gender
          )}
        </Text>
      </View>
      <View style={styles.infoBox}>
        <FontAwesome5
          name="ruler-vertical"
          size={16}
          color="#5199a3"
          style={styles.infoIcon}
        />
        <Text style={styles.infoText}>{show(profile?.height, "cm")}</Text>
      </View>
      <View style={styles.infoBox}>
        <FontAwesome5
          name="weight"
          size={16}
          color="#5199a3"
          style={styles.infoIcon}
        />
        <Text style={styles.infoText}>{show(profile?.weight, "kg")}</Text>
      </View>
      <View style={styles.infoBox}>
        <MaterialCommunityIcons
          name="human-male-height-variant"
          size={18}
          color="#5199a3"
          style={styles.infoIcon}
        />
        <Text style={styles.infoText}>Ngực: {show(profile?.chest, "cm")}</Text>
      </View>
      <View style={styles.infoBox}>
        <MaterialCommunityIcons
          name="tape-measure"
          size={18}
          color="#5199a3"
          style={styles.infoIcon}
        />
        <Text style={styles.infoText}>Eo: {show(profile?.waist, "cm")}</Text>
      </View>
      <View style={styles.infoBox}>
        <MaterialCommunityIcons
          name="tape-measure"
          size={18}
          color="#5199a3"
          style={styles.infoIcon}
        />
        <Text style={styles.infoText}>Mông: {show(profile?.hip, "cm")}</Text>
      </View>
      <View style={styles.infoBox}>
        <MaterialCommunityIcons
          name="human-male-height"
          size={18}
          color="#5199a3"
          style={styles.infoIcon}
        />
        <Text style={styles.infoText}>
          Vai: {show(profile?.shoulderWidth, "cm")}
        </Text>
      </View>
      <View style={styles.infoBox}>
        <FontAwesome5
          name="hand-paper"
          size={16}
          color="#5199a3"
          style={styles.infoIcon}
        />
        <Text style={styles.infoText}>
          Tay: {show(profile?.armLength, "cm")}
        </Text>
      </View>
      <View style={styles.infoBox}>
        <FontAwesome5
          name="shoe-prints"
          size={16}
          color="#5199a3"
          style={styles.infoIcon}
        />
        <Text style={styles.infoText}>
          Chân: {show(profile?.legLength, "cm")}
        </Text>
      </View>
      <View style={styles.infoBox}>
        <MaterialCommunityIcons
          name="human-male"
          size={18}
          color="#5199a3"
          style={styles.infoIcon}
        />
        <Text style={styles.infoText}>
          Thân: {show(profile?.torsoLength, "cm")}
        </Text>
      </View>
      <View style={styles.infoBox}>
        <MaterialCommunityIcons
          name="calendar-plus"
          size={18}
          color="#5199a3"
          style={styles.infoIcon}
        />
        <Text style={styles.infoText}>
          Tạo:{" "}
          {show(
            profile?.createdAt
              ? new Date(profile.createdAt).toLocaleDateString()
              : undefined
          )}
        </Text>
      </View>
      <View style={styles.infoBox}>
        <MaterialCommunityIcons
          name="calendar-edit"
          size={18}
          color="#5199a3"
          style={styles.infoIcon}
        />
        <Text style={styles.infoText}>
          Cập nhật:{" "}
          {show(
            profile?.updatedAt
              ? new Date(profile.updatedAt).toLocaleDateString()
              : undefined
          )}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },
  infoBox: {
    backgroundColor: "#f6fafc",
    borderColor: "#dbe6ed",
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    margin: 5,
    minWidth: 120,
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  infoIcon: {
    marginRight: 7,
  },
  infoText: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    color: "#222",
  },
});
