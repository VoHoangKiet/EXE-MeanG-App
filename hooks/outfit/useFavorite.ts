import { useMutation } from "@tanstack/react-query";
import { favoriteOutfit } from "@/api/outfit.api";
import { useQueryClient } from "@tanstack/react-query";

export const useFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (outfitId: string) => favoriteOutfit(outfitId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outfits"] });
    },
  });
};
