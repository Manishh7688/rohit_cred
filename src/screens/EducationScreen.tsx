import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput, Image, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, UserSquare, Landmark, ChevronsRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowIcon from '../components/ArrowIcon';

const { width } = Dimensions.get('window');

const EducationScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar backgroundColor="#fff" barStyle={'dark-content'} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header with Back Arrow */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowIcon color="#1a1a1a" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>
          Shivam, pay all your{'\n'}education-related expenses
        </Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search color="#999" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="search verified tutors"
            placeholderTextColor="#b0b0b0"
            autoCorrect={false}
          />
        </View>

        {/* Promotional Banner */}
        <View style={styles.bannerContainer}>
          {/* We use a solid background here as a fallback and overlay an image on the right if available */}
          <View style={styles.bannerBackground}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>Pay education fees via{'\n'}corporate card</Text>
              <TouchableOpacity style={styles.bannerButton} activeOpacity={0.8}>
                <Text style={styles.bannerButtonText}>Pay now</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require('../assets/images/book.png')}
              style={styles.bannerImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* ADD A TUTOR Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ADD A TUTOR</Text>
        </View>

        {/* Actions Grid */}
        <View style={styles.actionsGrid}>
          {/* Pay Contacts */}
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.iconCircle}>
              <UserSquare color="#000" size={26} strokeWidth={1.5} />
            </View>
            <Text style={styles.actionText}>Pay contacts</Text>
          </TouchableOpacity>

          {/* Bank Account */}
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.iconCircle}>
              <Landmark color="#000" size={26} strokeWidth={1.5} />
            </View>
            <Text style={styles.actionText}>Bank account</Text>
          </TouchableOpacity>

          {/* Pay to UPI ID */}
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.iconCircle}>
              {/* Approximating the double arrow box icon from the specific custom asset */}
              <View style={styles.squareIconOutline}>
                <ChevronsRight color="#000" size={20} strokeWidth={1.5} />
              </View>
            </View>
            <Text style={styles.actionText}>Pay to UPI ID</Text>
          </TouchableOpacity>
        </View>

        {/* 1-CLICK PAYMENTS Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>1-CLICK PAYMENTS</Text>
        </View>

        {/* Further content can go here */}

      </ScrollView>
    </SafeAreaView>
  );
};

export default EducationScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 24,
  },
  title: {
    fontFamily: 'CirkaRegular400',
    fontSize: 28,
    color: '#0a0a0a',
    lineHeight: 34,
    marginBottom: 28,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 30,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 32,
    backgroundColor: '#fff',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#333',
    padding: 0, // needed for Android to align centered properly
  },
  bannerContainer: {
    marginBottom: 40,
    borderRadius: 12,
    overflow: 'hidden',
    height: 140, // Reduced from 160 to match image aspect somewhat
    backgroundColor: '#ba9779', // Matches the prominent shade of the banner
  },
  bannerBackground: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bannerContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontFamily: 'CirkaRegular400',
    fontSize: 18,
    color: '#fff',
    lineHeight: 22,
    marginBottom: 16,
  },
  bannerButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    borderRadius: 2, // slightly rounded or sharp
  },
  bannerButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 10,
    color: '#000',
  },
  bannerImage: {
    position: 'absolute',
    right: -20,
    bottom: -10,
    width: 140,
    height: 130,
    opacity: 0.9,
  },
  sectionHeader: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: '#8b8f9e',
    letterSpacing: 2,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 45,
  },
  actionItem: {
    alignItems: 'center',
    width: width / 3.5,
  },
  iconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  squareIconOutline: {
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 4,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2, // To center the chevron visually
  },
  actionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#1a1a1a',
    textAlign: 'center',
  },
});
