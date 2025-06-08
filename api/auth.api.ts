import api from ".";
import { LoginRequestDto } from "../types/dto/request/auth/login.dto";

export const login = async (data: LoginRequestDto) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
