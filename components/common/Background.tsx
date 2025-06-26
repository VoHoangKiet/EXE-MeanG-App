import React from "react";
import { View, StyleSheet, ImageBackground, StyleProp, ViewStyle } from "react-native";

interface BackgroundProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Background: React.FC<BackgroundProps> = ({ children, style }) => {
  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={style}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default Background;
