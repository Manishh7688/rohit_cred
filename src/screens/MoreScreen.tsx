import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  FileText,
  User,
  BookOpen,
  History,
  BarChart2,
  Wallet,
  Gauge,
  FastForward,
  Building2,
  Gem,
  LayoutTemplate,
  CreditCard,
  Home,
  ShieldCheck,
  ScanLine,
  ShoppingBag,
  Car,
  Gift,
  Coins,
  Ticket,
  MessageSquare,
  Settings,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Define reusable types
type ActionItemType = {
  id: string;
  label: string;
  icon: JSX.Element;
  routeName?: string;
};

type AppSection = {
  title: string;
  items: ActionItemType[];
};

// Reusable configurations for thin, aesthetic icons
const iconProps = {
  size: 28,
  color: '#222',
  strokeWidth: 1.2,
};

const SECTIONS_TOP: AppSection[] = [
  {
    title: 'POPULAR',
    items: [
      { id: '1', label: 'bills &\nrecharges', icon: <FileText {...iconProps} /> },
      { id: '2', label: 'pay\ncontacts', icon: <User {...iconProps} /> },
      { id: '3', label: 'education\nfees', icon: <BookOpen {...iconProps} /> },
      { id: '4', label: 'payment\nhistory', icon: <History {...iconProps} />, routeName: 'PaymentHistory' },
    ],
  },
];

const SECTIONS_MIDDLE: AppSection[] = [
  {
    title: 'MONEY MATTERS',
    items: [
      { id: '5', label: 'money', icon: <BarChart2 {...iconProps} /> },
      { id: '6', label: 'cash', icon: <Wallet {...iconProps} /> },
      { id: '7', label: 'CIBIL score', icon: <Gauge {...iconProps} /> },
      { id: '8', label: 'bank\nbalance', icon: <FastForward {...iconProps} /> },
      { id: '9', label: 'bank\naccounts', icon: <Building2 {...iconProps} /> },
      { id: '10', label: 'gold', icon: <Gem {...iconProps} /> },
      { id: '11', label: 'CRED wallet', icon: <LayoutTemplate {...iconProps} /> },
    ],
  },
  {
    title: 'BILLS',
    items: [
      { id: '12', label: 'credit card', icon: <CreditCard {...iconProps} /> },
      { id: '13', label: 'bills &\nrecharges', icon: <FileText {...iconProps} /> },
      { id: '14', label: 'house rent', icon: <Home {...iconProps} /> },
      { id: '15', label: 'education\nfees', icon: <BookOpen {...iconProps} /> },
      { id: '16', label: 'motor\ninsurance', icon: <ShieldCheck {...iconProps} /> },
    ],
  },
  {
    title: 'PAYMENTS',
    items: [
      { id: '17', label: 'scan & pay', icon: <ScanLine {...iconProps} /> },
      { id: '18', label: 'pay\ncontacts', icon: <User {...iconProps} /> },
    ],
  },
  {
    title: 'EXPLORE',
    items: [
      { id: '19', label: 'shop', icon: <ShoppingBag {...iconProps} /> },
      { id: '20', label: 'garage', icon: <Car {...iconProps} /> },
      { id: '21', label: 'gift cards', icon: <Gift {...iconProps} /> },
    ],
  },
  {
    title: 'BENEFITS',
    items: [
      { id: '22', label: 'refer', icon: <Gift {...iconProps} /> },
      { id: '23', label: 'coins', icon: <Coins {...iconProps} /> },
      { id: '24', label: 'vouchers', icon: <Ticket {...iconProps} /> },
    ],
  },
  {
    title: 'OTHERS',
    items: [
      { id: '25', label: 'support', icon: <MessageSquare {...iconProps} /> },
      { id: '26', label: 'payment\nhistory', icon: <History {...iconProps} /> },
      { id: '27', label: 'settings', icon: <Settings {...iconProps} /> },
    ],
  },
];

const ActionGrid = ({ data }: { data: ActionItemType[] }) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.gridContainer}>
      {data.map((item) => (
        <View key={item.id} style={styles.gridItemWrapper}>
          <TouchableOpacity 
            activeOpacity={0.7} 
            style={styles.circleOuter}
            onPress={() => item.routeName ? navigation.navigate(item.routeName) : null}
          >
            <View style={styles.circleInner}>{item.icon}</View>
          </TouchableOpacity>
          <Text style={styles.gridItemLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

const MoreScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* <Text style={styles.notificationCount}>29</Text> */}

        <View style={styles.headerArea}>
          <View style={styles.headerLeft}>
            <Text style={styles.exploreText}>explore</Text>
            <Text style={styles.credTitle}>CRED</Text>
          </View>
          <View style={styles.headerRight}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/100?img=5' }}
              style={styles.avatarImage}
            />
            <TouchableOpacity style={styles.supportButton}>
              <MessageSquare size={16} color="#222" strokeWidth={2} />
              <Text style={styles.supportButtonText}>support</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Top Sections */}
        {SECTIONS_TOP.map((section) => (
          <View key={section.title} style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <ActionGrid data={section.items} />
          </View>
        ))}

        {/* Promo Banner */}
        <View style={styles.promoWrapper}>
          <View style={styles.promoCard}>
            <View style={styles.promoTextCol}>
              <Text style={styles.promoValidText}>VALID TILL 31ST MARCH</Text>
              <Text style={styles.promoMainText}>
                withdraw now. start your EMI in May.
              </Text>
              <TouchableOpacity activeOpacity={0.8} style={styles.checkOfferBtn}>
                <Text style={styles.checkOfferText}>Check offer</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.promoImageWrapper}>
              {/* Dummy placeholder for calendar/money illustration */}
              <Image
                source={{
                  uri: 'https://picsum.photos/seed/promo/200/200',
                }}
                style={styles.promoHeroImg}
              />
            </View>
          </View>
        </View>

        {/* Remaining Sections */}
        {SECTIONS_MIDDLE.map((section) => (
          <View key={section.title} style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <ActionGrid data={section.items} />
          </View>
        ))}

        {/* Bottom padding block to account for transparent tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingTop: 15,
  },
  notificationCount: {
    position: 'absolute',
    top: 5,
    right: 25,
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    zIndex: 10,
  },
  headerArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    // marginTop: 35,
    marginBottom: 35,
  },
  headerLeft: {},
  exploreText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#111',
    lineHeight: 24,
    marginBottom: -4,
  },
  credTitle: {
    fontSize: 36,
    fontFamily: 'Poppins-SemiBold', // The user injected UI logic requested this fallback format
    color: '#000',
    letterSpacing: -1,
    lineHeight: 52,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  avatarImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#eee',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  supportButtonText: {
    marginLeft: 6,
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    color: '#222',
  },
  sectionWrapper: {
    marginBottom: 20, // Tighter margin between sections
  },
  sectionTitle: {
    paddingHorizontal: 25,
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
    color: '#666',
    letterSpacing: 2.5,
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 25, // Leaves 5 on each edge
  },
  gridItemWrapper: {
    width: width / 5, // Exactly 4 items fit exactly width of screen
    alignItems: 'center',
    marginBottom: 30, // vertical spacing between rows
    // backgroundColor: 'red'
  },
  circleOuter: {
    width: 45,
    height: 45,
    borderRadius: 32,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#f5f5f5',
    marginBottom: 10,
    // Add specifically requested subtle shadow
    shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  circleInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItemLabel: {
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#333',
    lineHeight: 14,
  },
  promoWrapper: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  promoCard: {
    backgroundColor: '#1c3425',
    borderRadius: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  promoTextCol: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  promoValidText: {
    fontSize: 8,
    fontFamily: 'Poppins-Bold',
    color: '#95bba1',
    letterSpacing: 1.5,
    // marginBottom: 8,
  },
  promoMainText: {
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    // lineHeight: 20,
    marginBottom: 16,
  },
  checkOfferBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    // paddingVertical: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  checkOfferText: {
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
    color: '#111',
  },
  promoImageWrapper: {
    width: 130,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  promoHeroImg: {
    width: 120,
    height: 80,
    opacity: 0.9,
    // Note: use a generic dummy representation as requested!
    resizeMode: 'contain',
  },
});
