import api from ".";

export const getItems = async () => {
  const response = await api.get("/items");
  return response.data;
};