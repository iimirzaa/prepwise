import React from "react";
import { View } from "react-native";
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const RootNavigator=()=>{
     const isLoggedIn = true;
     const ok=false;

    return isLoggedIn
        ? <AppStack />
        : <AuthStack />;
    
}
export default RootNavigator;