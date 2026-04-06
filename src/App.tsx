/**
 * Main App component for RohitCred React Native app.
 * Organized under src/ structure.
 */

import * as React from 'react';
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
import ContactScreen from './screens/ContactScreen';
import PaymentDetailScreen from './screens/PaymentDetailScreen';
import CredSupportScreen from './screens/CredSupportScreen';
import SupportMainScreen from './screens/SupportMainScreen';
import AutomatedChatScreen from './screens/AutomatedChatScreen';
import PdfScreen from './screens/PdfShowScreen';
import QRScreen from './screens/QRScreen';

export type RootStackParamList = {
  Education: undefined;
  Contact: undefined;
  Pan: undefined;
  Splash: undefined;
  MainTabs: undefined;
  PaymentHistory: { month?: string };
  Profile: undefined;
  PaymentDetail: { transaction: any };
  CredSupport: { Item: any };
  SupportMain: undefined;
  AutomatedChat: undefined;
  PdfShow: undefined;
  QRScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
      <NavigationContainer children={
        <Stack.Navigator initialRouteName="Splash" id="root">
          <Stack.Screen
            name="Education"
            component={EducationScreen}
            options={{ headerShown: false, presentation: 'modal', animation: 'slide_from_bottom', }}
          />
          <Stack.Screen
            name="Contact"
            component={ContactScreen}
            options={{
              headerShown: false,
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="Pan"
            component={PanScreen}
            options={{ headerShown: false, presentation: 'modal', animation: 'slide_from_bottom', }}
          />
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{
              headerShown: false,
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
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
          <Stack.Screen
            name="PaymentDetail"
            component={PaymentDetailScreen}
            options={{
              headerShown: false,
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="CredSupport"
            component={CredSupportScreen}
            options={{
              headerShown: false,
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="SupportMain"
            component={SupportMainScreen}
            options={{
              headerShown: false,
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="AutomatedChat"
            component={AutomatedChatScreen}
            options={{
              headerShown: false,
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="PdfShow"
            component={PdfScreen}
            options={{
              headerShown: false,
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="QRScreen"
            component={QRScreen}
            options={{
              headerShown: false,
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
        </Stack.Navigator>
      } />
    </SafeAreaProvider>
  );
}

export default App;
