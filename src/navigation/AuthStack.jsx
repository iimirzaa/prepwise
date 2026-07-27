import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "../screens/Login";
import OnBoard  from '../screens/OnBoard';
import SignUp from '../screens/SignUp';
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
       </Stack.Navigator>

    );
}
export default AuthStack;