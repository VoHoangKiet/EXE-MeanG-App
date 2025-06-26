import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOutfitSchedule } from "@/api/schedule.api";
import { CreateSchedule } from "@/types/schedule.type";
import Toast from "@ant-design/react-native/lib/toast";

export const useCreateOutfitSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSchedule) => createOutfitSchedule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      Toast.success("Tạo lịch thành công");
    },
    onError: () => {
      Toast.fail("Tạo lịch thất bại");
    },
  });
};
