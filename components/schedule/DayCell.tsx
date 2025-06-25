import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { DateData } from "react-native-calendars";

type DayCellProps = {
  date: DateData | undefined;
  state: string | undefined;
  isSelected: boolean;
  hasSchedule: boolean;
  onPress: () => void;
};

export default function DayCell({
  date,
  state,
  isSelected,
  hasSchedule,
  onPress,
}: DayCellProps) {
  return (
    <TouchableOpacity style={styles.dayCell} onPress={onPress}>
      <Text
        style={{
          color:
            state === "disabled"
              ? "#d9e1e8"
              : isSelected
              ? "#eb9eed"
              : "#2d4150",
          fontWeight: isSelected ? "bold" : "normal",
          fontSize: 16,
          paddingHorizontal: 4,
        }}
      >
        {date ? date.day : ""}
      </Text>
      {hasSchedule && (
        <LinearGradient
          colors={["#dfe8f1", "#f5f7fa", "#dfe8f1"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.dayImageBox}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dayCell: {
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 48,
  },
  dayImageBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});
