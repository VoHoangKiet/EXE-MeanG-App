import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Nếu không dùng expo, thay bằng react-native-vector-icons hoặc icon khác
import ShinyButton from "../../../../ui/components/button/ShinyButton";

interface RegisterFormProps {
  onLogin: (email: string, password: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.form}>
    <TextInput
      style={styles.input}
      placeholder="Tên của bạn"
      value={name}
      onChangeText={setName}
      autoCapitalize="none"
      keyboardType="default"
      placeholderTextColor="#888"
    />
      <TextInput
        style={styles.input}
        placeholder="Email hoặc tên người dùng"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#888"
      />
      <View style={styles.passwordWrapper}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#888"
          
        />
        <TouchableOpacity
          onPress={() => setShowPassword((v) => !v)}
          style={styles.eyeBtn}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordWrapper}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#888"
          
        />
        <TouchableOpacity
          onPress={() => setShowPassword((v) => !v)}
          style={styles.eyeBtn}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>


      <ShinyButton title="Đăng nhập" onPress={onLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "100%",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  eyeBtn: {
    padding: 8,
    position: "absolute",
    right: 10,
  },
});

export default RegisterForm;
