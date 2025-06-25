import { useQuery } from "@tanstack/react-query";
import { getOutfits } from "@/api/outfit.api";

export const useOutfits = () => {
  return useQuery({
    queryKey: ["outfits"],
    queryFn: () => getOutfits().then((res) => res.data),
  });
};
