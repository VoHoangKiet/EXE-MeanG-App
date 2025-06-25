import { Schedule } from "@/types/schedule.type";
import { useMemo } from "react";

export const useScheduleDates = (
  schedules: Schedule[] | undefined
): Set<string> => {
  return useMemo(() => {
    if (!schedules) return new Set();
    const set = new Set<string>();
    const scheduleArray = Array.isArray(schedules) ? schedules : [];
    for (const s of scheduleArray) {
      const start = new Date(s.start_time);
      const end = new Date(s.end_time);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        set.add(d.toISOString().slice(0, 10));
      }
    }
    return set;
  }, [schedules]);
};
