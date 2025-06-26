import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Outfit } from "@/types/outfit.type";

interface CreateScheduleModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
  startDate?: string;
  outfit?: Outfit & { user: string };
  loading?: boolean;
}

const CreateScheduleModal: React.FC<CreateScheduleModalProps> = ({
  visible,
  onClose,
  onCreate,
  startDate,
  outfit,
  loading,
}) => {
  const initialStart = startDate
    ? new Date(startDate + "T09:00:00")
    : new Date();

  const [startTime, setStartTime] = useState<Date>(initialStart);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);

  const initialEnd = new Date(initialStart.getTime() + 60 * 60 * 1000);
  const [endDate, setEndDate] = useState<Date>(initialEnd);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (!visible && loading === false) {
      setStartTime(initialStart);
      setEndDate(initialEnd);
      setDescription("");
      setLocation("");
      setShowStartDatePicker(false);
      setShowStartTimePicker(false);
      setShowEndDatePicker(false);
      setShowEndTimePicker(false);
    }
  }, [visible, loading]);

  const handleCreate = () => {
    onCreate({
      start_time: startTime,
      end_time: endDate,
      outfit: outfit?._id,
      description,
      location,
      user: outfit?.user,
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Tạo lịch mới</Text>

          {startDate ? (
            <>
              <Text style={styles.label}>Ngày bắt đầu: {startDate}</Text>
              <TouchableOpacity
                style={styles.inputBox}
                onPress={() => setShowStartTimePicker(true)}
              >
                <Text>
                  Giờ bắt đầu:{" "}
                  {startTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </TouchableOpacity>
              {showStartTimePicker && (
                <DateTimePicker
                  value={startTime}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={(event, date) => {
                    setShowStartTimePicker(false);
                    if (date) {
                      const newDate = new Date(startTime);
                      newDate.setHours(
                        date.getHours(),
                        date.getMinutes(),
                        0,
                        0
                      );
                      setStartTime(newDate);
                    }
                  }}
                />
              )}
            </>
          ) : (
            <>
              <Text style={styles.label}>Bắt đầu:</Text>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.halfInput}
                  onPress={() => setShowStartDatePicker(true)}
                >
                  <Text>Ngày: {startTime.toLocaleDateString()}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.halfInput}
                  onPress={() => setShowStartTimePicker(true)}
                >
                  <Text>
                    Giờ:{" "}
                    {startTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </TouchableOpacity>
              </View>
              {showStartDatePicker && (
                <DateTimePicker
                  value={startTime}
                  mode="date"
                  display="default"
                  onChange={(event: DateTimePickerEvent, date?: Date) => {
                    setShowStartDatePicker(false);
                    if (date) {
                      const newDate = new Date(startTime);
                      newDate.setFullYear(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate()
                      );
                      setStartTime(newDate);
                    }
                  }}
                />
              )}
              {showStartTimePicker && (
                <DateTimePicker
                  value={startTime}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={(event: DateTimePickerEvent, date?: Date) => {
                    setShowStartTimePicker(false);
                    if (date) {
                      const newDate = new Date(startTime);
                      newDate.setHours(
                        date.getHours(),
                        date.getMinutes(),
                        0,
                        0
                      );
                      setStartTime(newDate);
                    }
                  }}
                />
              )}
            </>
          )}

          <Text style={styles.label}>Kết thúc:</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.halfInput}
              onPress={() => setShowEndDatePicker(true)}
            >
              <Text>Ngày: {endDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.halfInput}
              onPress={() => setShowEndTimePicker(true)}
            >
              <Text>
                Giờ:{" "}
                {endDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </TouchableOpacity>
          </View>

          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={(event: DateTimePickerEvent, date?: Date) => {
                setShowEndDatePicker(false);
                if (date) {
                  const newDate = new Date(endDate);
                  newDate.setFullYear(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate()
                  );
                  setEndDate(newDate);
                }
              }}
            />
          )}
          {showEndTimePicker && (
            <DateTimePicker
              value={endDate}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={(event: DateTimePickerEvent, date?: Date) => {
                setShowEndTimePicker(false);
                if (date) {
                  const newDate = new Date(endDate);
                  newDate.setHours(date.getHours(), date.getMinutes(), 0, 0);
                  setEndDate(newDate);
                }
              }}
            />
          )}

          <Text style={styles.label}>Chọn Outfit:</Text>
          {outfit?.imageUrl && (
            <Image
              source={{ uri: outfit.imageUrl }}
              style={styles.outfitImage}
            />
          )}

          <TextInput
            style={styles.textInput}
            placeholder="Mô tả"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Địa điểm"
            value={location}
            onChangeText={setLocation}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text>Huỷ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.createBtn}
              onPress={handleCreate}
              disabled={loading}
            >
              <Text style={styles.createBtnText}>
                {loading ? "Đang tạo..." : "Tạo lịch"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 12,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 2,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 6,
    marginBottom: 6,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  cancelBtn: {
    padding: 10,
    marginRight: 12,
  },
  createBtn: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 6,
  },
  createBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  outfitImage: {
    width: 100,
    height: 100,
    borderRadius: 6,
    marginBottom: 10,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginVertical: 6,
  },
  halfInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginHorizontal: 4,
  },
});

export default CreateScheduleModal;
