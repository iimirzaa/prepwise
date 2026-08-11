import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

import HomeScreen from '../src/screens/appscreens/Home';
import SetupScreen from '../src/screens/appscreens/Setup';


const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarActiveTintColor: '#764BA2',
        tabBarInactiveTintColor: '#98A2B3',

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 10,
        },

        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Start Prep') {
            iconName = 'tune-variant';
          } else if (route.name === 'Progress') {
            iconName = 'chart-line';
          } else if (route.name === 'Profile') {
            iconName = 'account-outline';
          }

          return (
            <MaterialDesignIcons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}>

      <Tab.Screen name="Home" component={HomeScreen} />
      { <Tab.Screen name="Start Prep" component={SetupScreen} />
      /*<Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} /> */}

    </Tab.Navigator>
  );
};

export default BottomTabs;