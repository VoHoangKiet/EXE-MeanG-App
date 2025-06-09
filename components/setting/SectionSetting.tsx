import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const SectionSetting = ({
  title,
  items,
}: {
  title: string;
  items: { icon: string; label: string; onPress?: () => void }[];
}) => (
  <SafeAreaView style={styles.section}>
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <Icon
              name={item.icon as any}
              size={22}
              color="#333"
              style={styles.icon}
            />
            <Text style={styles.itemLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </SafeAreaView>
);

export default SectionSetting;

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    paddingVertical: 8,
  },
  
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 12,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
});
