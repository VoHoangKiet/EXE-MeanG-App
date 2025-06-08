import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@ant-design/react-native";
import ClothesScreen from "./clothes";
import FavoritesScreen from "./favorites";
import ChatScreen from "./chat";
import CalendarScreen from "./calendar";
import ProfileScreen from "./profile";
import { Platform, Pressable } from "react-native";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          switch (route.name) {
            case "clothes":
              return <Icon name="skin" size={30} color={color} />;
            case "favorites":
              return <Icon name="heart" size={30} color={color} />;
            case "calendar":
              return <Icon name="calendar" size={30} color={color} />;
            case "chat":
              return <Icon name="environment" size={30} color={color} />;
            case "profile":
              return <Icon name="user" size={30} color={color} />;
            default:
              return <Icon name="appstore" size={30} color={color} />;
          }
        },
        tabBarLabel: () => null,
        tabBarActiveTintColor: "#5199a3",
        tabBarInactiveTintColor: "#9ec2c8",
        tabBarStyle: {
          backgroundColor: "white",
          height: 85,
          paddingTop: 10,
          paddingHorizontal: 20,
        },
        headerShown: false,
        ...(Platform.OS === "android" && {
          tabBarButton: ({ children, onPress }) => (
            <Pressable
              android_ripple={{ color: "transparent" }}
              onPress={onPress}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {children}
            </Pressable>
          ),
        }),
      })}
    >
      <Tab.Screen name="clothes" component={ClothesScreen} />
      <Tab.Screen name="favorites" component={FavoritesScreen} />
      <Tab.Screen name="calendar" component={CalendarScreen} />
      <Tab.Screen name="chat" component={ChatScreen} />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
