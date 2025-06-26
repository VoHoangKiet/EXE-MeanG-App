import api from ".";

export const getItems = async () => {
  const response = await api.get("/items");
  return response.data;
};

export const getItemById = async (id: string) => {
  const response = await api.get(`/items/${id}`);
  return response.data;
};

export const addItem = async (data: FormData) => {
  const res = await api.post("/items", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
