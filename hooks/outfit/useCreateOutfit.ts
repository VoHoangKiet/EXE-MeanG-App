import { useMutation } from "@tanstack/react-query";
import { createOutfit } from "@/api/outfit.api";
import toast from "@ant-design/react-native/lib/toast";
import { Outfit } from "@/types/outfit.type";
import { ApiResponse } from "@/types/dto/response/response.api";

export const useCreateOutfit = () => {
  return useMutation({
    mutationFn: (items: string[]): Promise<ApiResponse<Outfit>> => createOutfit(items),
    onSuccess: () => {
      toast.success("Outfit created successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.fail("Failed to create outfit");
    },
  });
};
