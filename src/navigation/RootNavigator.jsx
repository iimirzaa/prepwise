import React from "react";
import { View } from "react-native";

const RootNavigator=()=>{
     const isLoggedIn = false;

    return isLoggedIn
        ? <AppStack />
        : <AuthStack />;
    
}
export default RootNavigator;