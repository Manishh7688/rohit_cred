import React, { useState, useEffect } from 'react';
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
  Banknote,
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

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
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
            <Image
              source={{ uri: 'https://i.pravatar.cc/100?img=5' }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.greetingText}>hello,</Text>
              <Text style={styles.nameText}>Aarti</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bellContainer}>
            <Bell color="#111" size={24} />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        {/* Reward Banner */}
        <LinearGradient
          colors={['#1a1a1a', '#0d1f2e']}
          style={styles.rewardBanner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.rewardContent}>
            <View style={styles.rewardLeft}>
              <Image
                source={{ uri: 'https://picsum.photos/seed/chest/200/200' }}
                style={styles.chestImage}
              />
            </View>
            <View style={styles.rewardRight}>
              <Text style={styles.claimText}>claim today's reward</Text>
              <View style={styles.timerRow}>
                <Text style={styles.expiresText}>expires in</Text>
                <View style={styles.timerBadge}>
                  <Text style={styles.timerText}>{timeLeft}</Text>
                </View>
              </View>
              <TouchableOpacity activeOpacity={0.8}>
                <LinearGradient
                  colors={['#ffe066', '#ffc107']}
                  style={styles.playNowBtn}
                >
                  <Text style={styles.playNowText}>Play now</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>MONEY MATTERS</Text>
        </View>
        {/* Money Matters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          <View style={styles.pillCard}>
            <Banknote color="#000" size={18} />
            <Text style={styles.pillCardText}>cash</Text>
            <Text style={styles.greenText}>₹3,50,000</Text>
          </View>
          <TouchableOpacity style={styles.pillCard}>
            <Wallet color="#000" size={18} />
            <Text style={styles.pillCardText}>wallet</Text>
            <Text style={styles.subText}>add money</Text>
            <ChevronRight color="#666" size={16} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
          <View style={styles.pillCard}>
            <Building color="#000" size={18} />
          </View>
        </ScrollView>

        <View style={[styles.sectionHeader, styles.spaceBetweenRow]}>
          <Text style={styles.sectionTitle}>UPCOMING BILLS (2)</Text>
          <Text style={styles.viewAllText}>view all &gt;</Text>
        </View>

        {/* Upcoming Bills Stack */}
        <View style={styles.billsCard}>
          <View style={styles.billItem}>
            <View style={styles.billIconContainer}>
              <GraduationCap color="#111" size={24} />
            </View>
            <View style={styles.billInfo}>
              <Text style={styles.billName}>ALOK MAHESHWARI HUF</Text>
              <Text style={styles.billDesc}>tuition fee</Text>
            </View>
            <View style={styles.billAction}>
              <TouchableOpacity style={styles.payBtnDark}>
                <Text style={styles.payBtnText}>Pay 27720</Text>
              </TouchableOpacity>
              <Text style={styles.dueText}>due in 4 days</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.billItem}>
            <View style={styles.billIconContainer2}>
              <Building color="#d32f2f" size={24} />
            </View>
            <View style={styles.billInfo}>
              <Text style={styles.billName}>HDFC Bank</Text>
              <Text style={styles.billDesc}>XXXX XXXX 2278</Text>
            </View>
            <View style={styles.billAction}>
              <TouchableOpacity style={styles.payBtnDark}>
                <Text style={styles.payBtnText}>Pay ₹4,659</Text>
              </TouchableOpacity>
              <Text style={styles.dueText}>DUE ON 8 APR</Text>
            </View>
          </View>
          <View style={styles.earnRewardsBanner}>
            <LinearGradient
              colors={['rgba(255,215,0,0.1)', 'transparent']}
              style={styles.earnRewardsGradient}
            >
              <Star color="#d4af37" size={18} fill="#ffeb3b" />
              <Text style={styles.earnRewardsText}>
                pay bills & earn rewards worth ₹5,000 &gt;
              </Text>
            </LinearGradient>
          </View>
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
        <View style={styles.exploreTagsContainer}>
          <View style={styles.exploreRow}>
            <View style={styles.pillTag}>
              <Gift color="#e91e63" size={16} />
              <Text style={styles.pillTagText}>refer</Text>
            </View>
            <View style={styles.pillTag}>
              <ShoppingBag color="#ff9800" size={16} />
              <Text style={styles.pillTagText}>shop</Text>
            </View>
            <View style={styles.pillTag}>
              <Banknote color="#4caf50" size={16} />
              <Text style={styles.pillTagText}>cash</Text>
            </View>
          </View>
          <View style={styles.exploreRow}>
            <View style={styles.pillTag}>
              <View style={styles.cibilBadge}>
                <Text style={styles.cibilBadgeText}>748</Text>
              </View>
              <Text style={styles.pillTagText}>CIBIL score</Text>
            </View>
            <View style={styles.pillTag}>
              <Text style={styles.pillTagText}>garage </Text>
              <Car color="#d32f2f" size={16} fill="#ef5350" />
            </View>
            <View style={styles.pillTag}>
              <Coins color="#ffeb3b" size={16} fill="#fbc02d" />
              <Text style={styles.pillTagText}>gold</Text>
            </View>
          </View>
        </View>

        {/* CRED Payback Promo */}
        <LinearGradient
          colors={['#111', '#061726']}
          style={styles.paybackBanner}
        >
          <View style={styles.paybackContent}>
            <View style={styles.paybackIconBg}>
              <View style={styles.paybackIconInner} />
            </View>
            <View style={styles.paybackRight}>
              <Text style={styles.claimText}>now live: CRED payback</Text>
              <Text style={styles.paybackSubText}>
                pay bills & earn rewards worth ₹...
              </Text>
              <TouchableOpacity activeOpacity={0.8} style={{ alignSelf: 'flex-start' }}>
                <LinearGradient
                  colors={['#ffe066', '#ffc107']}
                  style={styles.playNowBtnSmall}
                >
                  <Text style={styles.playNowText}>Claim now</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* Garage Hero Banner */}
        <View style={styles.garageSection}>
          <Text style={styles.garageWatermark}>garage</Text>
          <View style={styles.garageHeroCardWrapper}>
            <View style={styles.garageHeroCard}>
              <Image
                source={{ uri: 'https://picsum.photos/seed/watch/400/400' }}
                style={styles.garageImage}
              />
            </View>
          </View>

          <Text style={styles.garageHeroTitle}>
            stand a chance to win an{"\n"}Apple watch
          </Text>
          <Text style={styles.garageHeroSub}>claim this reward on CRED garage</Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.claimNowBtnDark}>
            <Text style={styles.playNowTextWhite}>Claim now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>QUICK ACCESS</Text>
        </View>
        {/* Quick Access */}
        <View style={styles.quickAccessList}>
          <TouchableOpacity style={styles.quickAccessItem}>
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
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  greetingText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  nameText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
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
    top: 6,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e53935',
    borderWidth: 1,
    borderColor: '#fff',
  },
  rewardBanner: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    overflow: 'hidden',
  },
  rewardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardLeft: {
    marginRight: 20,
  },
  chestImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  rewardRight: {
    flex: 1,
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
    fontWeight: '700',
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
    borderColor: '#e0e0e0',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 4,
  },
  pillCardText: {
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 8,
    color: '#111',
  },
  greenText: {
    color: '#4caf50',
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 8,
  },
  subText: {
    color: '#999',
    fontSize: 14,
    marginLeft: 6,
  },
  billsCard: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    marginBottom: 35,
    overflow: 'hidden',
  },
  billItem: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  billIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  billIconContainer2: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffebee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  billInfo: {
    flex: 1,
  },
  billName: {
    fontWeight: '700',
    fontSize: 14,
    color: '#111',
    marginBottom: 2,
  },
  billDesc: {
    color: '#999',
    fontSize: 12,
  },
  billAction: {
    alignItems: 'flex-end',
  },
  payBtnDark: {
    backgroundColor: '#111',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 4,
    marginBottom: 6,
  },
  payBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  dueText: {
    fontSize: 10,
    color: '#e53935',
    fontWeight: '600',
    textTransform: 'uppercase',
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
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 8,
  },
  circleLabel: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#111',
    lineHeight: 16,
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
    fontSize: 14,
    color: '#111',
    marginLeft: 6,
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
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 35,
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
    fontSize: 14,
    fontWeight: '600',
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
    height: 40,
  },
});
