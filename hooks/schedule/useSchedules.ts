import { useQuery } from "@tanstack/react-query";
import { getSchedule } from "@/api/schedule.api";

export const useSchedules = () => {
  return useQuery({
    queryKey: ["schedules"],
    queryFn: () => getSchedule().then((res) => res.data),
  });
};
