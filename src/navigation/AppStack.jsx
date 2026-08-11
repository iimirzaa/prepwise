import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "../screens/appscreens/Home";
import BottomTabs from '../../components/BottomTabs';
import  SetupScreen from '../../src/screens/appscreens/Setup';

const Stack =createNativeStackNavigator();
const AppStack=()=>{
    return(
       <Stack.Navigator screenOptions={
        {headerShown:false}
       }>
        <Stack.Screen name='MainTabs'component={BottomTabs}> 
            
        </Stack.Screen>
        <Stack.Screen
                name="Home"
                component={Home}
            />
            <Stack.Screen
                name="Setup"
                component={SetupScreen}
            />
       
       </Stack.Navigator>

    );
}
export default AppStack;