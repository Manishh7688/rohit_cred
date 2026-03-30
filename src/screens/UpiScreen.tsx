import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UpiScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>UPI SCAN SCREEN</Text>
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
  text: {
    color: '#fff',
  },
});

export default UpiScreen;
