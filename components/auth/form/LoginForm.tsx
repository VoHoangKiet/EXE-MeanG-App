import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import {
  Input,
  Button,
  Flex,
  WhiteSpace,
  Form,
} from "@ant-design/react-native";
import { Ionicons } from "@expo/vector-icons";
import ShinyButton from "@/components/common/button/ShinyButton";
import { LoginRequestDto } from "@/types/dto/request/auth/login.dto";

interface LoginFormProps {
  onLogin: (data: LoginRequestDto) => void;
  onForgotPassword?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [form] = Form.useForm();

  const submit = () => {
    form.submit();
  };

  return (
    <Form form={form} style={styles.form} onFinish={onLogin}>
      <Form.Item name="email" style={styles.input}>
        <Input
          placeholder="Email hoặc tên người dùng"
          textContentType="username"
          autoCapitalize="none"
          keyboardType="email-address"
          className="email"
        />
      </Form.Item>

      <Form.Item name="password" style={styles.input}>
        <Input
          placeholder="Mật khẩu"
          secureTextEntry={!showPassword}
          suffix={
            <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={25}
                color="#888"
              />
            </TouchableOpacity>
          }
        />
      </Form.Item>

      <WhiteSpace size="lg" />
      <ShinyButton title="Đăng nhập" onPress={submit} />

      <TouchableOpacity onPress={onForgotPassword} style={styles.forgotBtn}>
        <Text style={styles.forgotText}>Quên mật khẩu ?</Text>
      </TouchableOpacity>
    </Form>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "100%",
    backgroundColor: "transparent",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 7,
    fontSize: 16,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 50
  },
  forgotBtn: {
    alignItems: "center",
  },
  forgotText: {
    color: "#222",
    fontSize: 14,
    marginTop: 20,
    fontWeight: "bold",
    paddingBottom: 10,
  },
});

export default LoginForm;
