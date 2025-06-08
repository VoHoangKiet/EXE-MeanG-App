import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAccessToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    return token;
  } catch (error) {
    console.error("Failed to get access token from storage:", error);
    return null;
  }
};

export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("refreshToken");
    return token;
  } catch (error) {
    console.error("Failed to get refresh token from storage:", error);
    return null;
  }
};

export const setAccessToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem("accessToken", token);
  } catch (error) {
    console.error("Failed to save access token:", error);
  }
};

export const setRefreshToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem("refreshToken", token);
  } catch (error) {
    console.error("Failed to save refresh token:", error);
  }
};

export const removeAccessToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("accessToken");
  } catch (error) {
    console.error("Failed to remove access token:", error);
  }
};

export const removeRefreshToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("refreshToken");
  } catch (error) {
    console.error("Failed to remove refresh token:", error);
  }
};