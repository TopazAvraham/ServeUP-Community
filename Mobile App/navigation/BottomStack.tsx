import React, { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileStackScreens from "./ProfileStack";
import ActiveProfile from "../assets/ActiveProfile.svg";
import InactiveProfile from "../assets/InactiveProfile.svg";
import ActiveSearch from "../assets/ActiveSearch.svg";
import InactiveSearch from "../assets/InactiveSearch.svg";
import ActiveExplore from "../assets/ActiveExplore.svg";
import ActiveChat from "../assets/ActiveChat.svg";
import InactiveChat from "../assets/InactiveChat.svg";
import { KeyboardAvoidingView,Platform } from "react-native";
import InactiveExplore from "../assets/InactiveExplore.svg";
const BottomTab = createBottomTabNavigator();

const BottomStackScreens: FC<{}> = ({ navigation }: any) => {
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
    >
    <BottomTab.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000",
        },
      })}
    >
      <BottomTab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <ActiveProfile /> : <InactiveProfile />;
          },
          tabBarActiveTintColor: "#D5FF45",
        }}
        component={ProfileStackScreens}
        name="Profile"
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <ActiveSearch /> : <InactiveSearch />;
          },
          tabBarActiveTintColor: "#D5FF45",
        }}
        component={}
        name="Search"
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <ActiveProfile /> : <InactiveProfile />;
          },
          tabBarActiveTintColor: "#D5FF45",
        }}
        component={}
        name="Events"
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <ActiveExplore /> : <InactiveExplore />;
          },
          tabBarActiveTintColor: "#D5FF45",
        }}
        component={}
        name="Explore"
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <ActiveChat /> : <InactiveChat />;
          },
          tabBarActiveTintColor: "#D5FF45",
        }}
        component={}
        name="Chat"
      />
    </BottomTab.Navigator>
    </KeyboardAvoidingView>
  );
};
export default BottomStackScreens;
