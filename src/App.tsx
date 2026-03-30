/**
 * Main App component for RohitCred React Native app.
 * Organized under src/ structure.
 */

import React from 'react';
import { StatusBar, useColorScheme, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './navigation';
import PaymentHistoryScreen from './screens/PaymentHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import SplashScreen from './screens/SplashScreen';
import PanScreen from './screens/PanScreen';
import EducationScreen from './screens/EducationScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#000',
  };

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#fff'}
      // translucent={true}
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Education">
          <Stack.Screen
            name="Education"
            component={EducationScreen}
            options={{ headerShown: false, presentation: 'modal', animation: 'slide_from_bottom', }}
          />
          <Stack.Screen
            name="Pan"
            component={PanScreen}
            options={{ headerShown: false, presentation: 'modal', animation: 'slide_from_bottom', }}
          />
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PaymentHistory"
            component={PaymentHistoryScreen}
            options={{
              headerShown: false,
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerShown: false,
              animation: 'slide_from_bottom',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

