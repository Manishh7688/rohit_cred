import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {
  Bell,
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
  WalletCards,
  UserSquare,
  Book,
  Trophy,
  Copy,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width * 0.75;
const AUTO_PLAY_INTERVAL = 4000;

interface BannerItem {
  id: string;
  type: 'UPI' | 'OFFERS' | 'GARAGE' | 'STORE';
  title?: string;
  mainText: string;
  subText: string;
  buttonLabel: string;
  gradient: string[];
  image: any;
}

const BANNERS_DATA: BannerItem[] = [
  {
    id: 'offers',
    type: 'OFFERS',
    title: 'offers',
    mainText: 'exclusive credit card offers',
    subText: 'unlocked for you',
    buttonLabel: 'Know more',
    gradient: ['#fdfdfd', '#fdfdfd'],
    image: require('../assets/images/mid1.png'), // Two credit cards blue img
  },
  {
    id: 'garage',
    type: 'GARAGE',
    title: 'garage',
    mainText: 'stand a chance to win an Apple watch',
    subText: 'claim this reward on CRED garage',
    buttonLabel: 'Claim now',
    gradient: ['#fdfdfd', '#fdfdfd'],
    image: require('../assets/images/mid2.png'), // Apple Watch Ultra img
  },
  {
    id: 'store',
    type: 'STORE',
    title: 'store',
    mainText: 'unlocked for you',
    subText: 'up to 80% off on most loved brands',
    buttonLabel: 'Shop now',
    gradient: ['#fdfdfd', '#fdfdfd'],
    image: require('../assets/images/mid3.png'), // Store products img
  },
];

// Infinite loop data construction: [last, ...data, first]
const INFINITE_DATA = [BANNERS_DATA[BANNERS_DATA.length - 1], ...BANNERS_DATA, BANNERS_DATA[0]];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(1); // Start at real first index (1)

  // Auto-play timer
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndex + 1;
      flatListRef.current?.scrollToOffset({
        offset: nextIndex * BANNER_WIDTH,
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = e.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / BANNER_WIDTH);

    // Reset loop boundaries instantly without animation
    if (scrollPosition <= 10) { // Small buffer for jump
      flatListRef.current?.scrollToOffset({
        offset: BANNER_WIDTH * BANNERS_DATA.length,
        animated: false,
      });
      setActiveIndex(BANNERS_DATA.length);
    } else if (scrollPosition >= BANNER_WIDTH * (INFINITE_DATA.length - 1) - 10) {
      flatListRef.current?.scrollToOffset({
        offset: BANNER_WIDTH,
        animated: false,
      });
      setActiveIndex(1);
    } else {
      setActiveIndex(index);
    }
  };

  const renderBannerCard = ({ item }: { item: BannerItem }) => {
    // UPI Reward specific banner layout (not in infinite but keeping logic if needed)
    if (item.type === 'UPI') {
      return (
        <View style={styles.bannerContainer}>
          <LinearGradient colors={item.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.upiBanner}>
            <View style={styles.upiContent}>
              <Image source={item.image} style={styles.upiImage} resizeMode="contain" />
              <View style={styles.upiTextContainer}>
                <Text style={styles.upiMainTxt}>{item.mainText}</Text>
                <TouchableOpacity style={styles.upiBtn}>
                  <Text style={styles.upiBtnTxt}>{item.buttonLabel}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
      );
    }

    // Offers, Garage, Store (Generic Slide)
    return (
      <View style={styles.bannerContainer}>
        <View style={styles.contentBanner}>
          {item.title && <Text style={styles.serifTitle}>{item.title}</Text>}
          <View style={styles.productCard}>
            <Image source={item.image} style={styles.productImg} resizeMode="cover" />
          </View>
          <Text style={styles.productMainTxt}>{item.mainText}</Text>
          <Text style={styles.productSubTxt}>{item.subText}</Text>
          <TouchableOpacity style={styles.blackBtn}>
            <Text style={styles.blackBtnTxt}>{item.buttonLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };


  const onMomentumScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / BANNER_WIDTH);

    setActiveIndex(index);

    // 👇 Jump logic (this creates loop illusion)
    if (index === 0) {
      flatListRef.current?.scrollToIndex({
        index: BANNERS_DATA.length,
        animated: false,
      });
      setActiveIndex(BANNERS_DATA.length);
    } else if (index === INFINITE_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: 1,
        animated: false,
      });
      setActiveIndex(1);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Profile')} style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 3, borderColor: '#999' }}>
              <Image source={require('../assets/images/user.jpeg')} style={styles.avatar} />
            </TouchableOpacity>
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

        {/* TOP PROMO BANNER */}
        <Image source={require('../assets/images/banner1.jpeg')} style={{ width: '90%', height: 150, alignSelf: 'center', borderRadius: 5, marginTop: 20 }} resizeMode="cover" />

        {/* MONEY MATTERS PILLS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>MONEY MATTERS</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          <TouchableOpacity style={styles.pillCard} onPress={() => navigation.navigate('Pan')}>
            <WalletCards color="#000" size={18} />
            <Text style={styles.pillCardText}>wallet</Text>
            <Text style={styles.setupNowText}>setup now</Text>
            <ChevronRight color="#666" size={16} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.pillCard}>
            <Image source={require('../assets/images/hdfc.png')} style={{ width: 15, height: 15 }} resizeMode="contain" />
            <Text style={styles.pillCardText}>bank accounts</Text>
            <Text style={styles.checkBaText}>check ba...</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* FOR YOU CIRCLE ICONS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>FOR YOU</Text>
        </View>
        <View style={styles.forYouCircles}>
          <View style={styles.forYouItem}>
            <View style={styles.forYouCircle}>
              <UserSquare color="#000" size={32} strokeWidth={1} />
            </View>
            <Text style={styles.forYouLabel}>pay{'\n'}contacts</Text>
          </View>

          <View style={styles.forYouItem}>
            <View style={styles.forYouCircle}>
              <FileText color="#000" size={32} strokeWidth={1} />
            </View>
            <Text style={styles.forYouLabel}>bills &{'\n'}recharges</Text>
          </View>

          <View style={styles.forYouItem}>
            <View style={styles.forYouCircle}>
              <Book color="#000" size={32} strokeWidth={1} />
            </View>
            <Text style={styles.forYouLabel}>education{'\n'}fees</Text>
          </View>

          <View style={styles.forYouItem}>
            <View style={styles.forYouCircle}>
              <Image source={require('../assets/images/reww.jpeg')} style={{ width: 32, height: 32 }} resizeMode="contain" />
            </View>
            <Text style={styles.forYouLabel}>rewards</Text>
          </View>
        </View>

        {/* EXPLORE CRED PILLS */}
        <View style={[styles.sectionHeader, styles.spaceBetweenRow]}>
          <Text style={styles.sectionTitle}>EXPLORE CRED</Text>
          <Text style={styles.viewAllText}>view all  &gt;</Text>
        </View>
        <View style={styles.exploreCredPills}>
          <TouchableOpacity style={styles.explorePill}>
            <Gift color="#f06292" size={20} style={{ marginRight: 8 }} />
            <Text style={styles.explorePillTxt}>refer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.explorePill}>
            <ShoppingBag color="#ffa726" size={20} style={{ marginRight: 8 }} />
            <Text style={styles.explorePillTxt}>shop</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.explorePill}>
            <View style={styles.carIconBox}>
              <Car color="#ef5350" size={20} />
            </View>
            <Text style={styles.explorePillTxt}>garage</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.exploreCredPills}>
          <TouchableOpacity style={styles.explorePill}>
            <Coins color="#ffca28" size={20} style={{ marginRight: 8 }} />
            <Text style={styles.explorePillTxt}>gold</Text>
          </TouchableOpacity>
        </View>

        {/* UPI ID DASHED BAR */}
        <View style={styles.upiIdDashedBar}>
          <View style={styles.upiIdLeft}>
            <Zap color="#aaa" size={16} />
            <Text style={styles.upiIdTxt}>UPI ID: 8360268985@axisb</Text>
            <Copy color="#999" size={16} />
          </View>
          <View style={styles.upiIdRight}>
            <View style={styles.verticalPipe} />
            <Text style={styles.upiSafetyTxt}>upi safety tips &gt;</Text>
          </View>
        </View>

        {/* UPI CLAIM REWARD BANNER (PURPLE) */}
        <View style={{ width: '90%', height: 150, alignSelf: 'center', marginBottom: 10, marginTop: 20, overflow: 'hidden', borderRadius: 10 }}>
          <Image source={require('../assets/images/banner2.jpeg')} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
        </View>

        {/* INFINITE LOOP CAROUSEL (OFFERS, GARAGE, STORE) */}
        <View style={styles.carouselWrapper}>
          <FlatList
            ref={flatListRef}
            data={INFINITE_DATA}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={renderBannerCard}
            horizontal
            pagingEnabled={false}
            snapToInterval={BANNER_WIDTH}
            snapToAlignment="center"
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            contentContainerStyle={{ paddingHorizontal: (width - BANNER_WIDTH) / 2 }}
            onMomentumScrollEnd={onMomentumScrollEnd}
            scrollEventThrottle={16}
            initialScrollIndex={2}
            getItemLayout={(data, index) => ({
              length: BANNER_WIDTH,
              offset: BANNER_WIDTH * index,
              index,
            })}
          />
          <View style={styles.paginationRow}>
            {BANNERS_DATA.map((_, i) => {
              const isActive = (activeIndex === 0 ? BANNERS_DATA.length : activeIndex === INFINITE_DATA.length - 1 ? 1 : activeIndex) === (i + 1);
              return <View key={i} style={[styles.dot, isActive && styles.dotActive]} />;
            })}
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>QUICK ACCESS</Text>
        </View>
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
  safeArea: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { paddingBottom: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, alignItems: 'center' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 48, height: 48, borderRadius: 24, marginTop: -4 },
  greetingText: { fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular' },
  nameText: { fontSize: 16, color: '#000', fontFamily: 'Poppins-Medium' },
  bellContainer: { padding: 8, backgroundColor: '#fff', borderRadius: 20 },
  badge: { position: 'absolute', top: 5, right: 5, width: 16, height: 16, borderRadius: 8, backgroundColor: '#e53935', justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: '#fff' },
  badgeText: { color: '#fff', fontSize: 8, fontWeight: 'bold' },

  // FOR YOU CIRCLES
  forYouCircles: { flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', marginBottom: 40, marginTop: 10 },
  forYouItem: { alignItems: 'center', width: (width - 40) / 4 },
  forYouCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 12
  },
  forYouLabel: { fontSize: 11, fontFamily: 'Poppins-Bold', color: '#111', textAlign: 'center', lineHeight: 14 },
  rewardIconInner: { flexDirection: 'row', alignItems: 'center' },
  rewardMiniCircle: { width: 20, height: 20, borderRadius: 4, transform: [{ rotate: '45deg' }] }, // Mocking the stack icon

  // EXPLORE PILLS
  exploreCredPills: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 10 },
  explorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5
  },
  explorePillTxt: { fontSize: 12, fontFamily: 'Poppins-Bold', color: '#111' },
  carIconBox: { marginRight: 8 },

  // UPI ID BAR
  upiIdDashedBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 30,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderStyle: 'dashed',
    borderRadius: 2
  },
  upiIdLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  upiIdTxt: { fontSize: 11, fontFamily: 'Poppins-Regular', color: '#888' },
  upiIdRight: { flexDirection: 'row', alignItems: 'center' },
  verticalPipe: { width: 1, height: 14, backgroundColor: '#eee', marginRight: 12 },
  upiSafetyTxt: { fontSize: 11, fontFamily: 'Poppins-Medium', color: '#888' },

  upiRewardBanner: { flex: 1, borderRadius: 16, padding: 20, justifyContent: 'center' },
  upiContent: { flexDirection: 'row', alignItems: 'center' },
  upiImage: { width: 70, height: 75, marginRight: 20 },
  upiTextContainer: { flex: 1 },
  upiMainTxt: { color: '#fff', fontSize: 13, fontFamily: 'Poppins-Medium', lineHeight: 20, marginBottom: 15 },
  upiBtn: { alignSelf: 'flex-start', backgroundColor: '#ffd54f', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 4 },
  upiBtnTxt: { color: '#000', fontSize: 11, fontFamily: 'Poppins-Bold' },

  // CAROUSEL STYLES
  carouselWrapper: { marginVertical: 10, height: 500, alignItems: 'center' },
  bannerContainer: { width: BANNER_WIDTH, height: '100%', justifyContent: 'center', alignItems: 'center' },
  contentBanner: { alignItems: 'center', flex: 1, width: '100%' },
  serifTitle: { fontFamily: 'Poppins-Bold', fontSize: 40, color: '#f5f5f5', marginBottom: -30, letterSpacing: 0.5, opacity: 0.8 },
  productCard: { width: '90%', height: 240, borderRadius: 12, backgroundColor: '#fff', elevation: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 20, overflow: 'hidden', marginBottom: 25, borderWidth: 1, borderColor: '#f0f0f0' },
  productImg: { width: '100%', height: '100%' },
  productMainTxt: { fontFamily: 'Poppins-Bold', fontSize: 14, color: '#111', textAlign: 'center', marginBottom: 4 },
  productSubTxt: { fontFamily: 'Poppins-Regular', fontSize: 11, color: '#666', textAlign: 'center', marginBottom: 20 },
  blackBtn: { backgroundColor: '#111', paddingHorizontal: 40, paddingVertical: 14, borderRadius: 6 },
  blackBtnTxt: { color: '#fff', fontSize: 12, fontFamily: 'Poppins-Bold' },
  paginationRow: { flexDirection: 'row', position: 'absolute', bottom: 10, gap: 8 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#eee' },
  dotActive: { backgroundColor: '#ccc' },

  sectionHeader: { paddingHorizontal: 20, marginBottom: 15, marginTop: 25 },
  spaceBetweenRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 10, fontFamily: 'Poppins-Bold', color: '#999', letterSpacing: 1 },
  viewAllText: { fontSize: 12, color: '#999', fontWeight: '600' },
  horizontalScroll: { paddingLeft: 20, paddingRight: 10 },
  pillCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderColor: '#f0f0f0', borderRadius: 80, paddingVertical: 8, paddingHorizontal: 12, marginRight: 12, borderWidth: 2 },
  pillCardText: { fontWeight: '700', fontSize: 12, marginLeft: 8, color: '#000', fontFamily: 'Poppins-Medium' },
  setupNowText: { color: '#999', fontSize: 10, marginLeft: 10, marginRight: 4, fontFamily: 'Poppins-Medium' },
  checkBaText: { color: '#999', fontSize: 9, marginLeft: 10, fontFamily: 'Poppins-Regular' },

  quickAccessList: { backgroundColor: '#fff', borderRadius: 12, borderColor: '#f0f0f0', padding: 10 },
  quickAccessItem: { flexDirection: 'row', alignItems: 'center', padding: 15, paddingHorizontal: 10 },
  quickAccessText: { flex: 1, marginLeft: 13, fontSize: 14, color: '#111', fontFamily: 'Poppins-Medium' },
  dashedDivider: { height: 1, backgroundColor: '#f0f0f0', marginHorizontal: 15 },
  bottomSpacer: { height: 100 }
});
