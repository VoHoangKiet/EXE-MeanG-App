import { Outfit } from "@/types/outfit.type";
import { ApiResponse } from "@/types/dto/response/response.api";
import api from ".";

export const createOutfit = async (
  itemsIds: string[]
): Promise<ApiResponse<Outfit>> => {
  const response = await api.post("/outfit/generate", { items: itemsIds });
  return response.data;
};

export const getOutfits = async (): Promise<ApiResponse<Outfit[]>> => {
  const response = await api.get("/outfit");
  return response.data;
};

export const favoriteOutfit = async (outfitId: string): Promise<ApiResponse<Outfit>> => {
  const response = await api.post(`/outfit/${outfitId}/favorite`);
  return response.data;
};
