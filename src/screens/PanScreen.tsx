import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, FileBadge } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import ArrowIcon from '../components/ArrowIcon';

const { width } = Dimensions.get('window');

const PanScreen: React.FC = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar backgroundColor="#111" barStyle={'light-content'} />

      {/* Top Black Section */}
      <View style={styles.topSection}>
        <View style={styles.headerSpacer} />
        <Text style={styles.title}>confirm your PAN details</Text>
        <Text style={styles.subtitle}>wallet will be issued for the mentioned PAN</Text>
      </View>

      {/* Bottom Light Section */}
      <View style={styles.bottomSection}>
        {/* Detail Card - using subtle gradient + shadow for the glowing effect */}
        <LinearGradient
          colors={['#ffffff', '#f0f4ff']}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Top Row: Name */}
          <View style={styles.cardTop}>
            <View>
              <Text style={styles.label}>NAME</Text>
              <Text style={styles.nameValue}>Shivam Bansal</Text>
            </View>
            <View style={styles.iconContainer}>
              {/* Using a lucide icon to approximate the emblem */}
              <Image source={require('../assets/images/govt.png')} style={{ width: 45, height: 45 }} />
            </View>
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dashedLine} />
          </View>

          {/* Bottom Row: Pan & DOB */}
          <View style={styles.cardBottom}>
            <View style={styles.column}>
              <Text style={styles.label}>PAN NUMBER</Text>
              <Text style={styles.value}>BZSPB5545H</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>DATE OF BIRTH</Text>
              <Text style={styles.value}>10th May '96</Text>
            </View>
          </View>

          {/* Inner blue glow outline effect via an absolutely positioned border */}
          <View style={styles.cardBorderGlow} />
        </LinearGradient>

        {/* Action Button */}
        <TouchableOpacity style={styles.button} activeOpacity={0.8} >
          <Text style={styles.buttonText}>Confirm and proceed</Text>
          <View style={{ transform: [{ rotate: '180deg' }] }}>
            <ArrowIcon color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Link below button */}
        <TouchableOpacity style={styles.linkContainer}>
          <Text style={styles.linkText}>Some details are incorrect</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PanScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#111', // Match top section background
  },
  topSection: {
    backgroundColor: '#111',
    paddingHorizontal: 24,
    paddingBottom: 40,
    height: '40%'
  },
  headerSpacer: {
    height: '70%', // Adjust based on how far down the text is supposed to be
  },
  title: {
    fontFamily: 'CirkaRegular400', // Assuming this is the serif font name from assets
    fontSize: 28,
    color: '#fff',
    lineHeight: 34,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#28c76f', // bright neon green
    letterSpacing: 0.3,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#f9f9f9', // Light off-white grey background
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 30,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    borderRadius: 14,
    padding: 24,
    marginBottom: 35,
    // Android Shadow
    elevation: 8,
    // iOS Shadow for that nice blue outer glow
    shadowColor: '#a1b6ff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  cardBorderGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#e2ecff',
    pointerEvents: 'none',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 10,
    opacity: 0.9,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: '#8b8f9e', // Greyish label
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  nameValue: {
    fontFamily: 'CirkaRegular400',
    fontSize: 22,
    color: '#1a1a1a',
  },
  dividerContainer: {
    marginVertical: 24,
    overflow: 'hidden',
  },
  dashedLine: {
    height: 1,
    borderWidth: 1,
    borderColor: '#dbe0ed',
    borderStyle: 'dashed',
    marginHorizontal: -2,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    flex: 1,
  },
  value: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#1a1a1a',
    letterSpacing: 0.3,
  },
  button: {
    backgroundColor: '#0f0f12', // Pure deep black/grey for button
    width: '100%',
    paddingVertical: 18,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#fff',
  },
  linkContainer: {
    paddingVertical: 10,
  },
  linkText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#345dc2', // Slightly dark blue
    textDecorationLine: 'underline',
  },
});
