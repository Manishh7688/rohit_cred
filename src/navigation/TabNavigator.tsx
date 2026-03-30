import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import CardsScreen from '../screens/CardsScreen';
import UpiScreen from '../screens/UpiScreen';
import RewardsScreen from '../screens/RewardsScreen';
import MoreScreen from '../screens/MoreScreen';

import CustomBottomTabBar from '../components/CustomBottomTab';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomBottomTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'HOME',
        }}
      />

      <Tab.Screen
        name="Cards"
        component={CardsScreen}
        options={{
          tabBarLabel: 'CARDS',
        }}
      />

      <Tab.Screen
        name="UPI"
        component={UpiScreen}
        options={{
          tabBarLabel: 'UPI',
        }}
      />

      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          tabBarLabel: 'REWARDS',
        }}
      />

      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarLabel: 'MORE',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;