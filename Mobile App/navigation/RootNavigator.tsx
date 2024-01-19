import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={"AuthStack"}
        screenOptions={{ headerShown: false }}
      >
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
