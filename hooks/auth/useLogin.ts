import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth.api";
import { LoginRequestDto } from "../../types/dto/request/auth/login.dto";
import { ApiResponse } from "@/types/dto/response/response.api";
import { LoginResponseDto } from "@/types/dto/response/auth/login.dto";

export const useLogin = () => {
  return useMutation({
    mutationFn: (
      data: LoginRequestDto
    ): Promise<ApiResponse<LoginResponseDto>> => login(data),
  });
};
