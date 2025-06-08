import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import {LinearGradient } from 'expo-linear-gradient';

interface Props {
  onPress: (...args: any[]) => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;

}

const ShinyButton: React.FC<Props> = ({ onPress, title, style, textStyle }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[styles.shadow, style]}>
    <LinearGradient
      colors={['#dfe8f1', '#f5f7fa', '#dfe8f1']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.button}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 5,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 10,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 250,
  },
  text: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ShinyButton;