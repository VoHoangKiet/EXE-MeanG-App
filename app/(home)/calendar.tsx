import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Background from '../../components/common/Background';

export default function CalendarScreen() {
  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Calendar</Text>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});