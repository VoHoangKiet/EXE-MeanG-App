import { useMutation } from "@tanstack/react-query";
import { uploadAvatar } from "@/api/profile.api";
import { useQueryClient } from "@tanstack/react-query";

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (fileUri: string) => uploadAvatar(fileUri),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
