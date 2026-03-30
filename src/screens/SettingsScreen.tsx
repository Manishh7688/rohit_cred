import { House } from 'lucide-react-native';
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.title}>Settings</Text>
        
        {/* Account Section */}
        <View style={styles.section}>
          <House size={40} color={'white'}/>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Phone Number</Text>
            <View style={styles.optionArrow}><Text>›</Text></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Change Password</Text>
            <View style={styles.optionArrow}><Text>›</Text></View>
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <TouchableOpacity style={styles.switchRow}>
            <Text style={styles.switchLabel}>Push Notifications</Text>
            <Switch 
              value={notificationsEnabled} 
              onValueChange={setNotificationsEnabled}
              trackColor={{ true: '#fff', false: '#333' }}
              thumbColor={notificationsEnabled ? '#000' : '#ccc'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.switchRow}>
            <Text style={styles.switchLabel}>Email Notifications</Text>
            <Switch 
              value={false} 
              trackColor={{ true: '#fff', false: '#333' }}
              thumbColor={'#ccc'}
            />
          </TouchableOpacity>
        </View>

        {/* Appearance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <TouchableOpacity style={styles.switchRow}>
            <Text style={styles.switchLabel}>Dark Mode</Text>
            <Switch 
              value={darkModeEnabled} 
              onValueChange={setDarkModeEnabled}
              trackColor={{ true: '#fff', false: '#333' }}
              thumbColor={darkModeEnabled ? '#000' : '#ccc'}
            />
          </TouchableOpacity>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Privacy Policy</Text>
            <View style={styles.optionArrow}><Text>›</Text></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Terms of Service</Text>
            <View style={styles.optionArrow}><Text>›</Text></View>
          </TouchableOpacity>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    marginBottom: 10,
    color: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 15,
    color: '#ccc',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    backgroundColor: '#111',
    marginHorizontal: 20,
    marginBottom: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
  },
  optionArrow: {
    width: 20,
    color: '#ccc',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    backgroundColor: '#111',
    marginHorizontal: 20,
    marginBottom: 1,
    borderRadius: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  version: {
    marginLeft: 20,
    marginTop: 10,
    color: '#999',
    fontSize: 14,
  },
});

export default SettingsScreen;
