import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { useProfile } from "@/hooks/profile/useProfile";
import Spin from "@/components/common/Spin";
import BoxItem from "@/components/clothes/BoxItem";
import VerticalActionButtons from "@/components/clothes/button/ButtonAction";
import BottomSection from "@/components/clothes/bottomSection";

export default function ClothesScreen() {
  const { data: profile, isLoading } = useProfile();
  if (isLoading) return <Spin />;

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={styles.safeArea}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.topSection}>
            <Image
              source={{ uri: profile?.bodyImageUrl }}
              style={styles.bodyImage}
              resizeMode="cover"
            />
            <View style={styles.boxContainerLeft}>
              <BoxItem />
              <BoxItem />
              <BoxItem />
            </View>
            <View style={styles.boxContainerRight}>
              <VerticalActionButtons />
            </View>
          </View>

          <BottomSection />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  topSection: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  boxContainerLeft: {
    position: "absolute",
    left: 5,
    right: 0,
    height: "100%",
    width: "15%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 50,
  },
  boxContainerRight: {
    position: "absolute",
    right: 5,
    height: "100%",
    width: "15%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  bodyImage: {
    width: "70%",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
