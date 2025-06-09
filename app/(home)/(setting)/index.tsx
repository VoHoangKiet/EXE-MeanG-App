import { View, Text, StyleSheet } from "react-native";
import SectionSetting from "@/components/setting/SectionSetting";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function SettingsScreen() {
  const { logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cài đặt</Text>
      </View>

      <SectionSetting
        title="Tài khoản"
        items={[
          { icon: "account-outline", label: "Thông tin tài khoản" },
          { icon: "shield-lock-outline", label: "Bảo mật" },
          { icon: "bell-outline", label: "Thông báo" },
          { icon: "lock-outline", label: "Quyền riêng tư" },
        ]}
      />

      <SectionSetting
        title="Hỗ trợ & Điều khoản"
        items={[
          { icon: "credit-card-outline", label: "Thanh toán" },
          { icon: "help-circle-outline", label: "Trợ giúp & Hỗ trợ" },
          { icon: "file-document-outline", label: "Điều khoản & chính sách" },
        ]}
      />

      <SectionSetting
        title="Bộ nhớ đệm & dữ liệu"
        items={[
          { icon: "delete-outline", label: "Giải phóng dung lượng" },
          { icon: "database-outline", label: "Dữ liệu sử dụng" },
        ]}
      />

      <SectionSetting
        title="Hoạt động"
        items={[
          { icon: "account-plus-outline", label: "Thêm tài khoản" },
          { icon: "logout", label: "Đăng xuất", onPress: logout },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    zIndex: 1,
    padding: 5,
  },
});
