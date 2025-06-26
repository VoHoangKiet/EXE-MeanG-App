import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Toast } from "@ant-design/react-native";

export async function handleDownloadImage(
  imageUrl: string,
  fileName?: string,
  setLoading?: (loading: boolean) => void
) {
  try {
    setLoading?.(true);
    if (!imageUrl) {
      Toast.fail("Không có đường dẫn ảnh.");
      setLoading?.(false);
      return;
    }

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Toast.fail("Không có quyền truy cập thư viện.");
      setLoading?.(false);
      return;
    }

    const fileUri = FileSystem.documentDirectory + (fileName || "downloaded-image.jpg");
    const downloadResumable = FileSystem.createDownloadResumable(imageUrl, fileUri);
    const result = await downloadResumable.downloadAsync();
    if (!result) {
      Toast.fail("Tải ảnh thất bại.");
      setLoading?.(false);
      return;
    }

    await MediaLibrary.createAssetAsync(result.uri);
    Toast.success("Ảnh đã được lưu vào thư viện.");
    setLoading?.(false);
    return result.uri;
  } catch (error) {
    Toast.fail("Tải ảnh thất bại.");
    setLoading?.(false);
    console.log(error);
  }
}
