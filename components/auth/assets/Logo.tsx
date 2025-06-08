import React from 'react';
import { Text, StyleSheet } from 'react-native';
// Nếu muốn gradient thực sự, có thể dùng expo-linear-gradient hoặc react-native-linear-gradient

const Logo: React.FC = () => (
  <Text style={styles.logo}>MeanG</Text>
);

const styles = StyleSheet.create({
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
    color: '#7fa6c7', // Màu tạm, có thể thay bằng gradient nếu dùng thư viện ngoài
    marginBottom: 8,
  },
});

export default Logo; 