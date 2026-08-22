import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import BottomTabs from '../../components/bottom_navigation/BottomTabs';
import  AttemptInterview from '../../src/screens/appscreens/AttemptInterview';

const Stack =createNativeStackNavigator();
const AppStack=()=>{
    return(
       <Stack.Navigator screenOptions={
        {headerShown:false}
       }>
        <Stack.Screen name='MainTabs'component={BottomTabs}> 
            
        </Stack.Screen>
         <Stack.Screen name="attempt" component={AttemptInterview
         }>

         </Stack.Screen>
       
       </Stack.Navigator>

    );
}
export default AppStack;