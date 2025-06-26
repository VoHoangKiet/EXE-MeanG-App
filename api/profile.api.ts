import api from ".";

export const getProfile = async () => {
  const response = await api.get("/user/profile");
  return response.data;
};

export const uploadAvatar = async (fileUri: string) => {
  const formData = new FormData();
  formData.append("avatar", {
    uri: fileUri,
    name: "avatar.jpg",
    type: "image/jpeg",
  } as any);

  const response = await api.post("/user/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const uploadBodyImage = async (fileUri: string) => {
  const formData = new FormData();
  formData.append("image", {
    uri: fileUri,
    name: "body.jpg",
    type: "image/jpeg",
  } as any);

  const response = await api.post("/user/upload-body-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
