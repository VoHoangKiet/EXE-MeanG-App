import api from ".";

export const getProfile = async () => {
  const response = await api.get("/user/profile");
  return response.data;
};