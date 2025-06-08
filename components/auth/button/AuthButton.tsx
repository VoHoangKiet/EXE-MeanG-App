import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';

interface AuthButtonProps {
  onPress: () => void;
  title: string;
  icon?: React.ReactNode;
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  onPress,
  title,
  icon,
  backgroundColor = '#fff',
  color = '#000',
  borderColor = 'transparent',
  style,
  textStyle,
}) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor, borderColor }, style]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.content}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={[styles.text, { color }, textStyle]}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AuthButton; 