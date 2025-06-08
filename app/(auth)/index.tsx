import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import LoginForm from "@/components/auth/form/LoginForm";
import AuthButton from "@/components/auth/button/AuthButton";
import { LoginRequestDto } from "@/types/dto/request/auth/login.dto";
import { useLogin } from "@/hooks/auth/useLogin";
import { Toast } from "@ant-design/react-native";
import { AuthContext } from "@/contexts/AuthContext";

const { width, height } = Dimensions.get("window");

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const { mutate: login } = useLogin();
  const { setIsLoggedIn } = useContext(AuthContext);
  
  const handleLogin = (data: LoginRequestDto) => {
    login(data, {
      onSuccess: (response) => {
        if (response.data?.accessToken) {
          Toast.success("Đăng nhập thành công");
          setIsLoggedIn(response.data.accessToken);
        } else {
          Toast.fail("Đăng nhập thất bại: Không nhận được token");
        }
      },
      onError: (error) => {
        console.error('Login failed:', error);
        Toast.fail("Email hoặc mật khẩu không chính xác.");
      },
    });
  };
  const handleForgot = () => {
    console.log("forgot");
  };
  const handleApple = () => {};

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require("../../assets/images/bg.png")}
        style={styles.bg}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.content}>
          <View style={styles.container}>
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.title}>Đăng nhập</Text>
            </View>
            <LoginForm onLogin={handleLogin} onForgotPassword={handleForgot} />
          </View>
          <View style={styles.socialBlock}>
            <AuthButton
              title="Tiếp tục với Google"
              onPress={() => {}}
              backgroundColor="#fff"
              color="#000"
              borderColor="#ddd"
              icon={<AntDesign name="google" size={22} color="#000" />}
            />
            <AuthButton
              title="Tiếp tục với Facebook"
              onPress={() => {}}
              backgroundColor="#1877f3"
              color="#fff"
              icon={<FontAwesome name="facebook" size={22} color="#fff" />}
            />
            <AuthButton
              title="Đăng nhập bằng email"
              onPress={() => {}}
              backgroundColor="#fff"
              color="#000"
              borderColor="#ddd"
              icon={<Ionicons name="mail" size={22} color="#000" />}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bg: {
    flex: 1,
    width: width,
    height: height,
  },
  content: {
    width: "100%",
  },
  container: {
    padding: 20,
    justifyContent: "flex-start",
  },
  headerRow: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 24,
    marginTop: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111",
    marginLeft: 0,
  },
  socialBlock: {
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 32,
    alignItems: "center",
    marginTop: 180,
    gap: 10,
  },
});

export default LoginScreen;
