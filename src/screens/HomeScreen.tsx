import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {
  Bell,
  Wallet,
  Building,
  GraduationCap,
  Gift,
  FileText,
  UserPlus,
  ShoppingBag,
  BadgeCheck,
  Zap,
  ChevronRight,
  Car,
  Coins,
  Star,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  // Mock countdown timer
  const [timeLeft, setTimeLeft] = useState('02:44:34');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 3, borderColor: '#999' }}>
              <Image
                source={require('../assets/images/user.jpeg')}
                style={styles.avatar}
              />
            </View>
            <View>
              <Text style={styles.greetingText}>hello,</Text>
              <Text style={styles.nameText}>Shivam</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bellContainer}>
            <Bell color="#000" size={24} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Top Reward Banner */}


        <Image
          source={require('../assets/images/banner1.jpeg')} // Placeholder for 3D chest
          style={styles.chestImageBanner}
          resizeMode="stretch"
        />




        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>MONEY MATTERS</Text>
        </View>
        {/* Money Matters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          <TouchableOpacity style={styles.pillCard}>
            <Wallet color="#000" size={18} />
            <Text style={styles.pillCardText}>wallet</Text>
            <Text style={styles.setupNowText}>setup now</Text>
            <ChevronRight color="#666" size={16} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.pillCard}>
            <Image
              source={require('../assets/images/hdfc.png')}
              style={{ width: 15, height: 15 }}
              resizeMode="contain"
            />
            <Text style={styles.pillCardText}>bank accounts</Text>
            <Text style={styles.checkBaText}>check ba...</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={[styles.sectionHeader, styles.spaceBetweenRow]}>
          <Text style={styles.sectionTitle}>UPCOMING BILLS (2)</Text>
          <Text style={styles.viewAllText}>view all &gt;</Text>
        </View>

        {/* Upcoming Bills Stack */}
        <View style={styles.billsCard}>
          <View style={styles.billItem}>
            <View style={styles.billIconCircle}>
              <GraduationCap color="#111" size={22} />
            </View>
            <View style={styles.billInfo}>
              <Text style={styles.billName}>ALOK MAHESHWARI HUF</Text>
              <Text style={styles.billDesc}>tuition fee</Text>
            </View>
            <View style={styles.billAction}>
              <TouchableOpacity style={styles.payBtnBlack}>
                <Text style={styles.payBtnText}>Pay 8400</Text>
              </TouchableOpacity>
              <Text style={styles.overdueText}>overdue</Text>
            </View>
          </View>

          <View style={styles.dividerLight} />

          <View style={styles.billItem}>
            <View style={styles.billIconCircle}>
              <GraduationCap color="#111" size={22} />
            </View>
            <View style={styles.billInfo}>
              <Text style={styles.billName}>KAUSHALYA WO TARSEEM...</Text>
              <Text style={styles.billDesc}>tuition fee</Text>
            </View>
            <View style={styles.billAction}>
              <TouchableOpacity style={styles.payBtnBlack}>
                <Text style={styles.payBtnText}>Pay 25200</Text>
              </TouchableOpacity>
              <Text style={styles.dueSoonText}>due in 2 days</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.cashbackFooter}>
            <Image
              source={require('../assets/images/banner1.jpeg')} // Placeholder for cashback icon
              style={styles.cashbackIcon}
            />
            <Text style={styles.cashbackText}>save ₹157 with cashback</Text>
            <ChevronRight color="#999" size={14} />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>FOR YOU</Text>
        </View>
        {/* For You */}
        <View style={styles.forYouGrid}>
          <View style={styles.forYouItem}>
            <View style={styles.circleIcon}>
              <UserPlus color="#333" size={28} strokeWidth={1.5} />
            </View>
            <Text style={styles.circleLabel}>pay{'\n'}contacts</Text>
          </View>
          <View style={styles.forYouItem}>
            <View style={styles.circleIcon}>
              <FileText color="#333" size={28} strokeWidth={1.5} />
            </View>
            <Text style={styles.circleLabel}>bills &{'\n'}recharges</Text>
          </View>
          <View style={styles.forYouItem}>
            <View style={styles.circleIcon}>
              <GraduationCap color="#333" size={28} strokeWidth={1.5} />
            </View>
            <Text style={styles.circleLabel}>education{'\n'}fees</Text>
          </View>
          <View style={styles.forYouItem}>
            <View style={styles.circleIcon}>
              <Gift color="#d32f2f" size={28} fill="#ffcdd2" />
            </View>
            <Text style={styles.circleLabel}>rewards</Text>
          </View>
        </View>

        <View style={[styles.sectionHeader, styles.spaceBetweenRow]}>
          <Text style={styles.sectionTitle}>EXPLORE CRED</Text>
          <Text style={styles.viewAllText}>view all &gt;</Text>
        </View>
        {/* Explore Cred */}
        {/* Explore Cred Tags */}
        <View style={styles.exploreTagsContainer}>
          <View style={styles.exploreRow}>
            <TouchableOpacity style={styles.pillTag}>
              <Gift color="#ff4081" size={16} />
              <Text style={styles.pillTagText}>refer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pillTag}>
              <ShoppingBag color="#ffa000" size={16} />
              <Text style={styles.pillTagText}>shop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pillTag}>
              <Car color="#d32f2f" size={16} />
              <Text style={styles.pillTagText}>garage</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.exploreRow}>
            <TouchableOpacity style={styles.pillTag}>
              <Coins color="#fbc02d" size={16} />
              <Text style={styles.pillTagText}>gold</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* UPI ID Bar */}
        <View style={styles.upiIdBar}>
          <View style={styles.upiIdLeft}>
            <Zap color="#aaa" size={16} />
            <Text style={styles.upiIdText}>UPI ID: 8360268985@axisb</Text>
            <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <FileText color="#999" size={14} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.upiSafety}>
            <Text style={styles.upiSafetyText}>upi safety tips &gt;</Text>
          </TouchableOpacity>
        </View>

        {/* CRED Payback Promo */}
        {/* CRED UPI Promo Banner */}
        <LinearGradient
          colors={['#1a0b2e', '#4a148c']}
          style={styles.paybackBanner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.paybackContent}>
            <View style={styles.paybackLeft}>
              <Image
                source={require('../assets/images/banner1.jpeg')} // Placeholder for purple card logo
                style={styles.paybackLogo}
              />
            </View>
            <View style={styles.paybackRight}>
              <Text style={styles.paybackTitle}>₹40 claimed. ₹60 left to claim.</Text>
              <TouchableOpacity activeOpacity={0.8} style={styles.useCredUpiBtn}>
                <LinearGradient
                  colors={['#f6d365', '#fda085']}
                  style={styles.useCredUpiGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.useCredUpiText}>use CRED UPI</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>


        {/* Store Landing Section */}
        <View style={styles.storeContainer}>
          <Text style={styles.storeTitle}>store</Text>
          <View style={styles.productCard}>
            <Image
              source={require('../assets/images/banner1.jpeg')} // Placeholder for backpack/store product
              style={styles.productImage}
              resizeMode="cover"
            />
            <View style={styles.productInfo}>
              <Text style={styles.unlockedTitle}>unlocked for you</Text>
              <Text style={styles.discountText}>up to 80% off on most loved brands</Text>
              <TouchableOpacity style={styles.shopNowBtn}>
                <Text style={styles.shopNowText}>Shop now</Text>
              </TouchableOpacity>
            </View>
            {/* Pagination dots */}
            <View style={styles.paginationDots}>
              <View style={[styles.dot, styles.dotActive]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>QUICK ACCESS</Text>
        </View>
        {/* Quick Access */}
        <View style={styles.quickAccessList}>
          <TouchableOpacity style={styles.quickAccessItem} onPress={() => navigation.navigate('PaymentHistory')}>
            <FileText color="#333" size={20} />
            <Text style={styles.quickAccessText}>payment history</Text>
            <ChevronRight color="#666" size={20} />
          </TouchableOpacity>
          <View style={styles.dashedDivider} />

          <TouchableOpacity style={styles.quickAccessItem}>
            <Building color="#333" size={20} />
            <Text style={styles.quickAccessText}>bank balance</Text>
            <ChevronRight color="#666" size={20} />
          </TouchableOpacity>
          <View style={styles.dashedDivider} />

          <TouchableOpacity style={styles.quickAccessItem}>
            <BadgeCheck color="#333" size={20} />
            <Text style={styles.quickAccessText}>CIBIL score</Text>
            <ChevronRight color="#666" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    // marginRight: 10,
    marginTop: -4
  },
  greetingText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  nameText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Poppins-Medium',
  },
  bellContainer: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#e53935',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  rewardBanner: {
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  rewardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardLeft: {
    marginRight: 15,
  },
  chestImageBanner: {
    width: '90%',
    height: 100,
    alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginVertical: 20,
    borderRadius: 5
  },
  rewardRight: {
    flex: 1,
  },
  unclaimedText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
  },
  rewardSubText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    marginBottom: 12,
  },
  claimNowBtnWrapper: {
    alignSelf: 'flex-start',
  },
  claimNowBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  claimNowText: {
    color: '#000',
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
  },
  claimText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 6,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  expiresText: {
    color: '#999',
    fontSize: 12,
    marginRight: 8,
  },
  timerBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timerText: {
    color: '#e0e0e0',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1,
  },
  playNowBtn: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  playNowBtnSmall: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  playNowText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  spaceBetweenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#666',
    letterSpacing: 1,
  },
  viewAllText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  horizontalScroll: {
    paddingLeft: 20,
    paddingRight: 10,
    marginBottom: 30,
  },
  pillCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 50, // More rounded
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  pillCardText: {
    fontWeight: '700',
    fontSize: 10,
    marginLeft: 8,
    color: '#000',
    fontFamily: 'Poppins-Medium'
  },
  setupNowText: {
    color: '#999',
    fontSize: 10,
    marginLeft: 10,
    marginRight: 4,
    fontFamily: 'Poppins-Medium'
  },
  checkBaText: {
    color: '#999',
    fontSize: 9,
    marginLeft: 10,
    fontFamily: 'Poppins-Regular'
  },
  billsCard: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12, // Slightly more subtle radius
    elevation: 4, // Lower elevation for subtle CRED shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    marginBottom: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f8f8f8',
  },
  billItem: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  billIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff', // White background for the circle
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  billInfo: {
    flex: 1,
  },
  billName: {
    fontWeight: '700',
    fontSize: 10,
    color: '#000',
    marginBottom: 4,
    fontFamily: 'Poppins-Medium'
  },
  billDesc: {
    color: '#888',
    fontSize: 10,
    fontFamily: 'Poppins-Regular'
  },
  billAction: {
    alignItems: 'flex-end',
  },
  payBtnBlack: {
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6, // Matches the reference image button radius
    marginBottom: 6,
  },
  payBtnText: {
    color: '#fff',
    // fontWeight: '700',
    fontSize: 10,
    fontFamily: 'Poppins-Medium'
  },
  overdueText: {
    fontSize: 10,
    color: '#ff5252',
    fontFamily: 'Poppins-Regular',
    textTransform: 'lowercase',
  },
  dueSoonText: {
    fontSize: 10,
    color: '#ffa000',
    fontFamily: 'Poppins-Regular',
    textTransform: 'lowercase',
  },
  dividerLight: {
    height: 1,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 20,
  },
  cashbackFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
  },
  cashbackIcon: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 8,
  },
  cashbackText: {
    fontSize: 12,
    color: '#555',
    fontFamily: 'Poppins-Medium',
    marginRight: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 15,
  },
  earnRewardsBanner: {
    backgroundColor: '#fafafa',
  },
  earnRewardsGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'center',
  },
  earnRewardsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginLeft: 6,
  },
  forYouGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 35,
  },
  forYouItem: {
    alignItems: 'center',
    width: (width - 40) / 4,
  },
  circleIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  circleLabel: {
    textAlign: 'center',
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    color: '#111',
    lineHeight: 15,
  },
  exploreTagsContainer: {
    paddingHorizontal: 20,
    marginBottom: 35,
  },
  exploreRow: {
    flexDirection: 'row',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  pillTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 4,
  },
  pillTagText: {
    fontWeight: '700',
    fontSize: 13,
    color: '#000',
    marginLeft: 6,
  },
  upiIdBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 40,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderStyle: 'dashed',
    borderRadius: 4,
  },
  upiIdLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  upiIdText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  upiSafety: {
    borderLeftWidth: 1,
    borderLeftColor: '#eee',
    paddingLeft: 12,
  },
  upiSafetyText: {
    fontSize: 11,
    color: '#555',
    fontFamily: 'Poppins-Medium',
  },
  cibilBadge: {
    backgroundColor: '#e8eaf6',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cibilBadgeText: {
    color: '#5c6bc0',
    fontSize: 12,
    fontWeight: '700',
  },
  paybackBanner: {
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 24,
    marginBottom: 50,
  },
  paybackLeft: {
    marginRight: 20,
  },
  paybackLogo: {
    width: 60,
    height: 80,
    borderRadius: 8,
  },
  paybackTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 15,
  },
  useCredUpiBtn: {
    alignSelf: 'flex-start',
  },
  useCredUpiGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  useCredUpiText: {
    color: '#000',
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
  },
  paybackContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paybackIconBg: {
    width: 70,
    height: 70,
    backgroundColor: '#0a1d2e',
    borderRadius: 12,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#19344d',
  },
  paybackIconInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  paybackRight: {
    flex: 1,
  },
  paybackSubText: {
    color: '#999',
    fontSize: 12,
  },
  garageSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
    position: 'relative',
  },
  garageWatermark: {
    fontSize: 60,
    fontWeight: '800',
    color: '#f5f5f5',
    position: 'absolute',
    top: -20,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    letterSpacing: -2,
  },
  garageHeroCardWrapper: {
    width: '100%',
    aspectRatio: 1.1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 6,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 15,
    marginBottom: 20,
    marginTop: 30,
  },
  garageHeroCard: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  garageImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  garageHeroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
    textAlign: 'center',
    lineHeight: 28,
  },
  garageHeroSub: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginBottom: 20,
    textAlign: 'center',
  },
  claimNowBtnDark: {
    backgroundColor: '#111',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 4,
  },
  playNowTextWhite: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  quickAccessList: {
    paddingHorizontal: 20,
  },
  quickAccessItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  quickAccessText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
  dashedDivider: {
    height: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    borderStyle: 'dashed',
    marginLeft: 35,
  },
  bottomSpacer: {
    height: 100,
  },
  storeContainer: {
    paddingHorizontal: 16,
    marginBottom: 60,
  },
  storeTitle: {
    fontSize: 40,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    color: '#f0f0f0',
    textAlign: 'center',
    marginBottom: -20,
    zIndex: -1,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    // elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
  productImage: {
    width: '100%',
    height: 150,
  },
  productInfo: {
    alignItems: 'center',
    padding: 30,
  },
  unlockedTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: '#000',
    marginBottom: 8,
  },
  discountText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  shopNowBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 4,
  },
  shopNowText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#eee',
  },
  dotActive: {
    backgroundColor: '#aaa',
  },
});
