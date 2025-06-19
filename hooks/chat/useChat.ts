import { useMutation } from "@tanstack/react-query";
import { askChatbot } from "@/api/chat.api";

export const useChat = () => {
  return useMutation({
    mutationFn: (question: string) => askChatbot(question),
  });
};
