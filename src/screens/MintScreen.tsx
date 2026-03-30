import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const MintScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.title}>MINT</Text>
        
        {/* Hero Section */}
        <LinearGradient colors={['#111', '#222', '#333']} style={styles.heroCard}>
          <Text style={styles.heroTitle}>Mint Your Future</Text>
          <Text style={styles.heroSubtitle}>Create exclusive digital collectibles</Text>
          <TouchableOpacity style={styles.mintBtn}>
            <View style={styles.mintBtnGradient}>
              <Text style={styles.mintBtnText}>MINT NOW</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>

        {/* Features */}
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featureGrid}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}><Text style={styles.emoji}>🎨</Text></View>
            <Text style={styles.featureTitle}>Unique Art</Text>
            <Text style={styles.featureDesc}>One-of-a-kind digital masterpieces</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}><Text style={styles.emoji}>🔒</Text></View>
            <Text style={styles.featureTitle}>Secure</Text>
            <Text style={styles.featureDesc}>Blockchain verified ownership</Text>
          </View>
        </View>

        <View style={styles.featureGrid}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}><Text style={styles.emoji}>⚡</Text></View>
            <Text style={styles.featureTitle}>Instant</Text>
            <Text style={styles.featureDesc}>Mint in seconds, no waiting</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}><Text style={styles.emoji}>💎</Text></View>
            <Text style={styles.featureTitle}>Exclusive</Text>
            <Text style={styles.featureDesc}>Limited edition drops</Text>
          </View>
        </View>

        {/* Recent Mints */}
        <Text style={styles.sectionTitle}>Recent Mints</Text>
        <View style={styles.mintGrid}>
          <View style={styles.mintItem}>
            <View style={styles.mintThumbnail}><Text style={styles.emojiBig}>🎭</Text></View>
            <Text style={styles.mintName}>Crypto Mask #47</Text>
            <Text style={styles.mintPrice}>0.05 ETH</Text>
          </View>
          <View style={styles.mintItem}>
            <View style={styles.mintThumbnail}><Text style={styles.emojiBig}>🚀</Text></View>
            <Text style={styles.mintName}>Rocket Ship #12</Text>
            <Text style={styles.mintPrice}>0.08 ETH</Text>
          </View>
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
  heroCard: {
    margin: 20,
    padding: 40,
    borderRadius: 25,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 30,
    textAlign: 'center',
  },
  mintBtn: {
    borderRadius: 30,
  },
  mintBtnGradient: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  mintBtnText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  sectionTitle: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
    color: '#fff',
  },
  featureGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  featureItem: {
    alignItems: 'center',
    flex: 0.45,
  },
  featureIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  emoji: { fontSize: 40 },
  emojiBig: { fontSize: 50 },
  featureTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
  featureDesc: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 5,
  },
  mintGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
  },
  mintItem: {
    alignItems: 'center',
    flex: 0.45,
  },
  mintThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 15,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  mintName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
  },
  mintPrice: {
    color: '#ccc',
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default MintScreen;
