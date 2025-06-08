import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageBanner: React.FC = () => (
  <View style={styles.bannerWrapper}>
    <Image
      source={require('../../../assets/images/login-banner.png')}
      style={styles.bannerImage}
      resizeMode="cover"
    />
  </View>
);

const styles = StyleSheet.create({
  bannerWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 220,
  },
  bannerImage: {
    flex: 1,
    height: '100%',
  },
});

export default ImageBanner; 