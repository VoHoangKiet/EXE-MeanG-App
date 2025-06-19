import api from ".";

export const askChatbot = async (question: string) => {
  const res = await api.post("/chatbot", { question });
  return res.data;
};
