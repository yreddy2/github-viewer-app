import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import followingScreen from './Screens/FollowingScreen';

import followersScreen from './Screens/FollowersScreen';

import userScreen from './Screens/UserScreen';

import repositoriesScreen from './Screens/RepositoriesScreen';


// A Bottom Tab Navigation Bar is used to switch through the various screens
const Tab = createBottomTabNavigator();

// The primary function established the navigation bar and starts the screens
export default function App() {
  global.login = '1lann'
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='User' component= {userScreen} />
        <Tab.Screen name='Repositories' component={repositoriesScreen} />
        <Tab.Screen name='Followers' component={followersScreen} />
        <Tab.Screen name='Following' component={followingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}