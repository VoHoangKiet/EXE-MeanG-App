import { Schedule } from "@/types/schedule.type";
import { ApiResponse } from "@/types/dto/response/response.api";
import api from ".";

export const getSchedule = async (): Promise<ApiResponse<Schedule[]>> => {
  const response = await api.get("/schedule");
  return response.data;
};

export const createOutfitSchedule = async (data: any): Promise<ApiResponse<Schedule>> => {
  const response = await api.post("/schedule", data);
  return response.data;
};