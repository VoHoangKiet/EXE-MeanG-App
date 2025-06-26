import React, { useState, useLayoutEffect } from "react";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import OptionModalCustom, { ImageSource, ImageType } from "@/components/setting/modal/OptionModalCustom";
import { useProfile } from "@/hooks/profile/useProfile";
import { useUploadAvatar } from "@/hooks/profile/useUploadAvatar";
import { useUploadBodyImage } from "@/hooks/profile/useUploadBodyImage";
import { Toast } from "@ant-design/react-native";
import {
  AvatarSection,
  InfoGrid,
  BodyImageSection,
} from "@/components/profile";

export default function ProfileScreen() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [bodyImageUrl, setBodyImageUrl] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<"imageType" | "imageSource">(
    "imageType"
  );
  const [pickedImageUri, setPickedImageUri] = useState<string | null>(null);
  const navigation = useNavigation();

  const { data: profile } = useProfile();
  const { mutate: uploadAvatar, isPending: isUploadingAvatar } =
    useUploadAvatar();
  const { mutate: uploadBodyImage, isPending: isUploadingBodyImage } =
    useUploadBodyImage();

  const handleImagePick = async (fromCamera: boolean) => {
    const permission = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.status !== "granted") {
      Alert.alert(
        "Quyền bị từ chối",
        fromCamera ? "Không thể mở camera." : "Không thể truy cập thư viện."
      );
      return;
    }

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.7,
        })
      : await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.7,
        });

    if (!result.canceled && result.assets?.length > 0) {
      setPickedImageUri(result.assets[0].uri);
      setModalMode("imageType");
      setModalVisible(true);
    }
  };

  const chooseImageSource = () => {
    setModalMode("imageSource");
    setModalVisible(true);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={chooseImageSource}
          style={{ marginRight: 16 }}
          disabled={isUploadingAvatar || isUploadingBodyImage}
        >
          <Ionicons
            name="camera-outline"
            size={24}
            color={isUploadingAvatar || isUploadingBodyImage ? "#ccc" : "black"}
          />
        </TouchableOpacity>
      ),
      headerTitle: "Thông tin tài khoản",
      headerBackTitle: "Quay lại",
    });
  }, [navigation, isUploadingAvatar, isUploadingBodyImage]);

  const handleModalConfirm = (value: ImageType | ImageSource) => {
    if (modalMode === "imageSource") {
      setModalVisible(false);
      if (value === "camera") handleImagePick(true);
      if (value === "library") handleImagePick(false);
      return;
    }
    if (modalMode === "imageType" && (value === "avatar" || value === "body")) {
      if (pickedImageUri) {
        if (value === "avatar") {
          setAvatar(pickedImageUri);
          uploadAvatar(pickedImageUri, {
            onSuccess: () => {
              setAvatar(pickedImageUri);
              Toast.success("Cập nhật ảnh đại diện thành công");
            },
          });
        } else {
          setBodyImageUrl(pickedImageUri);
          uploadBodyImage(pickedImageUri, {
            onSuccess: () => {
              setBodyImageUrl(pickedImageUri);
              Toast.success("Cập nhật ảnh toàn thân thành công");
            },
            onError: () => {
              Toast.fail("Cập nhật ảnh toàn thân thất bại");
              setBodyImageUrl(null);
            },
          });
        }
      }
      setModalVisible(false);
      setPickedImageUri(null);
    }
  };

  const show = (val: any, unit?: string) =>
    val !== undefined && val !== null && val !== ""
      ? `${val}${unit || ""}`
      : "Chưa cập nhật";

  const displayAvatar = avatar || profile?.avatar;
  const displayBodyImage = bodyImageUrl || profile?.bodyImageUrl;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <AvatarSection
        avatar={displayAvatar}
        username={show(profile?.username)}
        email={show(profile?.email)}
        uid={profile?.uid}
        isUploading={isUploadingAvatar}
      />
      <InfoGrid profile={profile} show={show} />
      <BodyImageSection
        bodyImageUrl={displayBodyImage}
        isUploading={isUploadingBodyImage}
      />
      <OptionModalCustom
        visible={modalVisible}
        mode={modalMode}
        onCancel={() => {
          setModalVisible(false);
          setPickedImageUri(null);
        }}
        onSelect={handleModalConfirm}
        isUploading={isUploadingAvatar || isUploadingBodyImage}
      />
    </ScrollView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    alignItems: "center" as const,
  },
};
