import React, { useContext, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homepage from "../screens/Homepage";
import Profile from "../screens/Profile";
import Productions from '../screens/Productions';
import AddDiary from '../screens/AddDiary';
import NewChat from "../screens/NewChat";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../theme/color";
import themeContext from "../theme/themeContex";
import Icon from "react-native-vector-icons/FontAwesome5";
import MealIcon from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createBottomTabNavigator();

export default function MyTabs() {
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState("false");

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { position: "absolute", height: 80 },
        tabBarLabelStyle: {
          fontSize: 15,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Homepage}
        options={{
          tabBarShowLabel: true,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? theme.icon : Colors.disable,
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => {
            return (
              <Icon
                name="home"
                size={23}
                color={focused ? theme.icon : Colors.disable}
              />
            );
          },
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Productions"
        component={Productions}
        options={{
          tabBarShowLabel: true,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? theme.icon : Colors.disable,
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              Shop
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => {
            return (
              <Icon
                name="shopping-cart"
                size={23}
                color={focused ? theme.icon : Colors.disable}
              />
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AddDiary"
        component={AddDiary}
        options={{
          tabBarShowLabel: true,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? theme.icon : Colors.disable,
                fontFamily: "Plus Jakarta Sans",
              }}
            >

            </Text>
          ),
          tabBarIcon: ({ focused, color }) => {
            return (
              <Icon
                name="plus-circle"
                size={55}
                color={focused ? theme.icon : Colors.disable}
              />
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="NewChat"
        component={NewChat}
        options={{
          tabBarShowLabel: true,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? theme.icon : Colors.disable,
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              Messages
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => {
            return (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={30}
                color={focused ? theme.icon : Colors.disable}
              />
            );
          },
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarShowLabel: true,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? theme.icon : Colors.disable,
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              Profile
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => {
            return (
              <Icon
                name="user"
                size={23}
                color={focused ? theme.icon : Colors.disable}
              />
            );
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
