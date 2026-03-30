import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, StatusBar, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

type RootStackParamList = {
  Splash: undefined;
  MainTabs: undefined;
};

const rnBiometrics = new ReactNativeBiometrics();

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();




  useEffect(() => {
    // Small delay to show the logo first, then trigger auth
    const timer = setTimeout(() => {
      navigation.replace('MainTabs');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/cred.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center'
  },
  logo: {
    width: '50%',
    height: '50%',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
  },
  retryText: {
    color: '#000',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default SplashScreen;

