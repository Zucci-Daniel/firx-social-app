import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Nav_Container = ({children}) => (
  <NavigationContainer>{children}</NavigationContainer>
);

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

export {Stack, Nav_Container, BottomTab};

//in this file, anything related to importing and creating react navigation component and functions are done here, to reduce littered import statements...
