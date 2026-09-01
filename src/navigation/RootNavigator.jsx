import React from "react";
import { View, ActivityIndicator } from "react-native";
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { useAuth } from '../Utils/authcontext'; // adjust path

const RootNavigator = () => {
  const { isLoggedIn, isReady } = useAuth();

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,backgroundColor:"white"}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isLoggedIn ? <AppStack /> : <AuthStack />;
};
export default RootNavigator;