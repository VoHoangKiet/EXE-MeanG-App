import { View, StyleSheet, ViewStyle, Image, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from "react";

interface Props {
  onPress?: () => void;
  style?: ViewStyle;
  itemUrl?: string;
  isSelected?: boolean;
}

const BORDER_WIDTH = 4;

export default function SquareItem({ onPress, style, itemUrl, isSelected = false }: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSelected) {
      // Scale up animation when selected
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1.05,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Scale down animation when deselected
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isSelected]);

  return (
    <Animated.View style={[styles.container, style, { transform: [{ scale: scaleAnim }] }]}>
      {isSelected && (
        <LinearGradient
          colors={['#f5f5f5', '#bdbdbd', '#e0e0e0', '#9e9e9e']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        />
      )}
      <TouchableOpacity onPress={onPress} style={styles.touchable} activeOpacity={0.8}>
        <Image source={{ uri: itemUrl }} style={styles.image} />
        <Animated.View 
          style={[
            styles.selectedOverlay, 
            { opacity: opacityAnim }
          ]} 
        />
        {isSelected && (
          <View style={styles.checkmarkContainer}>
            <View style={styles.checkmark} />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBorder: {
    position: 'absolute',
    top: -BORDER_WIDTH,
    left: -BORDER_WIDTH,
    right: -BORDER_WIDTH,
    bottom: -BORDER_WIDTH,
    borderRadius: 20,
    zIndex: 1,
  },
  touchable: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkmark: {
    width: 12,
    height: 8,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#FFFFFF',
    transform: [{ rotate: '-45deg' }],
  },
});
