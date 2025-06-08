import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Background from '../../components/common/Background';

export default function FavoritesScreen() {
  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Favorites</Text>
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