import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "../screens/authscreens/Login";
import OnBoard  from '../screens/onboardscreens/OnBoard';
import SignUp from '../screens/authscreens/SignUp';
import sendOtp from '../screens/authscreens/Otp';
import verifyOtp from '../screens/authscreens/Verify';
const Stack =createNativeStackNavigator();
const AuthStack=()=>{
    return(
       <Stack.Navigator screenOptions={
        {headerShown:false}
       }>
        <Stack.Screen
                name="OnBoard"
                component={OnBoard}
            />
         <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
            />
            <Stack.Screen
                name="Otp"
                component={sendOtp}
            />
            <Stack.Screen
                name="VerifyOtp"
                component={verifyOtp}
            />
       </Stack.Navigator>

    );
}
export default AuthStack;