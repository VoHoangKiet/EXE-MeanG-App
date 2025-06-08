import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";

interface BackgroundProps {
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View>{children}</View>
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
