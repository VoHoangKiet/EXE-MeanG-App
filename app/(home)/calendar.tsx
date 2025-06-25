import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import Background from "../../components/common/Background";
import { useSchedules } from "@/hooks/schedule/useSchedules";
import Spin from "@/components/common/Spin";
import { useScheduleDates } from "@/hooks/schedule/useScheduleDates";
import DayCell from "@/components/schedule/DayCell";
import OutfitModal from "@/components/schedule/OutfitModal";

export default function CalendarScreen() {
  const [current, setCurrent] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const { data: schedules, isLoading } = useSchedules();
  const scheduleDates = useScheduleDates(schedules);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSchedules, setSelectedSchedules] = useState<any[]>([]);

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    if (Array.isArray(schedules)) {
      const filtered = schedules.filter((s) => {
        const start = new Date(s.start_time).toISOString().slice(0, 10);
        const end = new Date(s.end_time).toISOString().slice(0, 10);
        return day.dateString >= start && day.dateString <= end;
      });
      setSelectedSchedules(filtered);
    } else {
      setSelectedSchedules([]);
    }
  };

  const [showOutfitModal, setShowOutfitModal] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState<any>(null);
  const handleShowOutfit = (outfit: any) => {
    setSelectedOutfit(outfit);
    setShowOutfitModal(true);
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Background>
      <View style={styles.container}>
        <Calendar
          current={current}
          style={{
            borderRadius: 10,
            overflow: "hidden",
            paddingBottom: 20,
          }}
          onDayPress={handleDayPress}
          onMonthChange={(month) => {
            const today = new Date();
            const isCurrentMonth =
              today.getFullYear() === month.year &&
              today.getMonth() + 1 === month.month;
            setCurrent(isCurrentMonth ? today.toISOString().slice(0, 10) : "");
          }}
          firstDay={1}
          hideExtraDays={false}
          renderArrow={(direction) => (
            <View style={styles.arrow}>
              <Text style={styles.arrowText}>
                {direction === "left" ? "<" : ">"}
              </Text>
            </View>
          )}
          dayComponent={({
            date,
            state,
          }: {
            date?: DateData;
            state?: string;
          }) => (
            <DayCell
              date={date}
              state={state}
              isSelected={!!date && date.dateString === current}
              hasSchedule={!!date && scheduleDates.has(date.dateString)}
              onPress={() => date && handleDayPress(date)}
            />
          )}
          theme={{
            calendarBackground: "transparent",
            textSectionTitleColor: "#fff",
            selectedDayBackgroundColor: "#b6c1cd",
            selectedDayTextColor: "#00adf5",
            todayTextColor: "#00adf5",
            dayTextColor: "#2d4150",
            textDisabledColor: "#d9e1e8",
            arrowColor: "#2d4150",
            monthTextColor: "#2d4150",
            indicatorColor: "#2d4150",
            textMonthFontWeight: "bold",
            textMonthFontSize: 22,
            textDayFontSize: 16,
            textDayHeaderFontSize: 12,
          }}
        />
      </View>
      {selectedDate && (
        <ScrollView style={{ paddingHorizontal: 16, maxHeight: 300 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}>
              Lịch ngày {selectedDate}:
            </Text>
            <TouchableOpacity onPress={() => setShowOutfitModal(true)}>
              <Text style={{ color: "#232ded", fontWeight: "bold" }}>
                Thêm lịch
              </Text>
            </TouchableOpacity>
          </View>
          {selectedSchedules.length === 0 ? (
            <Text style={{ color: "#000" }}>Không có lịch nào.</Text>
          ) : (
            selectedSchedules.map((sch) => (
              <View
                key={sch._id}
                style={{
                  marginBottom: 8,
                  padding: 8,
                  backgroundColor: "#f5f7fa",
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>{sch.description}</Text>
                <Text>Địa điểm: {sch.location}</Text>
                <Text>
                  {new Date(sch.start_time).toLocaleString()} -{" "}
                  {new Date(sch.end_time).toLocaleString()}
                </Text>
                <TouchableOpacity
                  onPress={() => handleShowOutfit(sch.outfit_id)}
                >
                  <Text style={{ color: "#2196F3", fontWeight: "bold" }}>
                    Xem chi tiết
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      )}
      <OutfitModal
        visible={showOutfitModal}
        outfit={selectedOutfit}
        onClose={() => setShowOutfitModal(false)}
      />
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: "transparent",
  },
  arrow: {
    padding: 10,
  },
  arrowText: {
    fontSize: 22,
    color: "#2d4150",
    fontWeight: "bold",
  },
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
