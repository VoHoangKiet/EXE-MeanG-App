import api from ".";

export const getItems = async () => {
  const response = await api.get("/items");
  return response.data;
};

export const getItemById = async (id: string) => {
  const response = await api.get(`/items/${id}`);
  return response.data;
};
