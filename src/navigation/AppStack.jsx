import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "../screens/appscreens/Home";
import BottomTabs from '../../components/BottomTabs';

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
       
       </Stack.Navigator>

    );
}
export default AppStack;