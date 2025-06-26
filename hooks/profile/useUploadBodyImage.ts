import { useMutation } from "@tanstack/react-query";
import { uploadBodyImage } from "@/api/profile.api";
import { useQueryClient } from "@tanstack/react-query";

export const useUploadBodyImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (fileUri: string) => uploadBodyImage(fileUri),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
