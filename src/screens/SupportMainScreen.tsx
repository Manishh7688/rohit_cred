import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  Search,
  MessageSquare,
  ChevronRight,
  Headphones,
  Play,
  BarChart2,
  FileBadge,
  Settings,
  ShoppingBag,
  Palmtree,
  Hexagon,
  TrendingUp,
  Layout,
  Zap,
  Car,
  TriangleAlert,
  ArrowRight,
  CheckCircle2,
  MessageSquareMore,
} from 'lucide-react-native';
import ArrowIcon from '../components/ArrowIcon';

const { width } = Dimensions.get('window');

const TRANSACTIONS = [
  {
    id: '1',
    name: 'urban company',
    date: '28 Mar 2026',
    amount: '2,374.00',
    status: 'paid',
  },
  {
    id: '2',
    name: 'mygate',
    date: '25 Mar 2026',
    amount: '10,002.36',
    status: 'paid',
  },
];

const VIDEOS = [
  {
    id: '1',
    title: 'how to foreclose your loan',
    duration: '0:33',
    mainText: 'foreclosing your loan on CRED is simple.',
  },
  {
    id: '2',
    title: 'what to do with stuck payments on CRED',
    duration: '0:41',
    mainText: 'how to deal with a stuck payment?',
  },
];

const CATEGORIES = [
  { id: '1', label: 'getting started', icon: <BarChart2 size={32} color="#000" strokeWidth={1.5} /> },
  { id: '2', label: 'payments & refunds', icon: <FileBadge size={32} color="#000" strokeWidth={1.5} /> },
  { id: '3', label: 'account management', icon: <Settings size={32} color="#000" strokeWidth={1.5} /> },
  { id: '4', label: 'shopping', icon: <ShoppingBag size={32} color="#000" strokeWidth={1.5} /> },
  { id: '5', label: 'travel', icon: <Palmtree size={32} color="#000" strokeWidth={1.5} /> },
  { id: '6', label: 'rewards & currencies', icon: <Hexagon size={32} color="#000" strokeWidth={1.5} /> },
  { id: '7', label: 'CRED mint', icon: <TrendingUp size={32} color="#000" strokeWidth={1.5} /> },
  { id: '8', label: 'digital gold', icon: <Layout size={32} color="#000" strokeWidth={1.5} /> },
  { id: '9', label: 'CRED cash', icon: <Zap size={32} color="#000" strokeWidth={1.5} /> },
  { id: '10', label: 'CRED flash', icon: <ChevronRight size={32} color="#000" strokeWidth={1.5} /> }, // Using Chevron as fallback
  { id: '11', label: 'CRED garage', icon: <Car size={32} color="#000" strokeWidth={1.5} /> },
  { id: '12', label: 'miscellaneous', icon: <TriangleAlert size={32} color="#000" strokeWidth={1.5} /> },
];

const SupportMainScreen: React.FC = () => {
  const navigation = useNavigation();


  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowIcon width={28} height={12} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <Text style={styles.mainTitle}>how can we{'\n'}help you today?</Text>

        {/* Conversations Card */}
        <TouchableOpacity style={styles.convCard} onPress={() => (navigation as any).navigate('AutomatedChat')}>
          <View style={styles.convLeft}>
            <View style={styles.messageIconWrap}>
              <MessageSquareMore size={24} color="#000" strokeWidth={1.5} />
            </View>
            <View>
              <Text style={styles.convTitle}>my conversations</Text>
              <Text style={styles.convSub}>view my past conversations</Text>
            </View>
          </View>
          <View style={{ transform: [{ rotate: '180deg' }] }}>
            <ArrowIcon width={20} height={20} color="#000" />
          </View>
        </TouchableOpacity>

        {/* Recent Transactions Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>YOUR RECENT TRANSACTIONS</Text>
        </View>

        {TRANSACTIONS.map((item, index) => (
          <View key={item.id}>
            <View style={styles.transactionItem}>
              <View style={styles.txnLeft}>
                <View style={styles.txnIconWrap}>
                  <Layout size={18} color="#000" strokeWidth={1.5} />
                </View>
                <View>
                  <Text style={styles.txnName}>{item.name}</Text>
                  <View style={styles.txnStatusRow}>
                    <CheckCircle2 size={12} color="#fff" fill={'#4caf50'} strokeWidth={2.5} style={{ marginRight: 4 }} />
                    <Text style={styles.txnStatus}>paid on {item.date}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.txnRight}>
                <Text style={styles.txnAmount}>{item.amount}</Text>
                <TouchableOpacity style={styles.supportBtn} onPress={() => (navigation as any).navigate('AutomatedChat')}>
                  <Headphones size={18} color="#000" strokeWidth={1.5} />
                </TouchableOpacity>
              </View>
            </View>
            {index === 0 && <View style={styles.dashedDivider} />}
          </View>
        ))}

        <TouchableOpacity style={styles.showAllBtn}>
          <Text style={styles.showAllBtnText}>Show all transactions</Text>
        </TouchableOpacity>

        {/* Questions? Answers Section */}
        <View style={styles.sectionHeaderWide}>
          <Text style={styles.serifLabel}>QUESTIONS? ANSWERS</Text>
        </View>

        <View style={styles.searchBar}>
          <Search size={20} color="#ccc" style={{ marginRight: 12 }} />
          <TextInput
            placeholder="ask me anything"
            placeholderTextColor="#bbb"
            style={styles.searchInput}
          />
        </View>

        {/* Video Tutorial Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.videoScroll}
          snapToInterval={width * 0.45 + 16}
          decelerationRate="fast"
        >
          {VIDEOS.map((video) => (
            <View key={video.id} style={styles.videoItem}>
              <View style={styles.videoCard}>
                <Text style={styles.videoMainText}>{video.mainText}</Text>
                <View style={styles.badgeWrap}>
                  <View style={styles.durationBadge}>
                    <Text style={styles.durationText}>{video.duration}</Text>
                    <Play size={10} color="#fff" fill="#fff" style={{ marginLeft: 4 }} />
                  </View>
                </View>
                {/* Wavy Background Placeholder */}
                <View style={styles.videoPattern} />
              </View>
              <Text style={styles.videoTitle}>{video.title}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Categories Grid */}
        <View style={styles.categoriesGrid}>
          {CATEGORIES.map((cat) => (
            <View key={cat.id} style={styles.catItemWrap}>
              <TouchableOpacity style={styles.catCard}>
                {cat.icon}
              </TouchableOpacity>
              <Text style={styles.catLabel}>{cat.label}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            stay protected from fraud <Text style={styles.footerLink}>here's how</Text>
          </Text>
          <View style={styles.footerLine} />
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    // marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    marginBottom: 25,
    paddingVertical: 5,
  },
  mainTitle: {
    fontSize: 28,
    fontFamily: 'CirkaBold700',
    color: '#000',
    lineHeight: 34,
    letterSpacing: -0.5,
    marginBottom: 20,
  },
  convCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 2,
    padding: 20,
    marginBottom: 40,
  },
  convLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageIconWrap: {
    marginRight: 16,
  },
  convTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#000',
    marginBottom: 2,
  },
  convSub: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#999',
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
    color: '#aaa',
    letterSpacing: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  txnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  txnIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  txnName: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#000',
    marginBottom: 2,
  },
  txnStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txnStatus: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#999',
  },
  txnRight: {
    alignItems: 'flex-end',
  },
  txnAmount: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#000',
    marginBottom: 4,
  },
  supportBtn: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashedDivider: {
    height: 1,
    borderWidth: 1,
    borderColor: '#eee',
    borderStyle: 'dashed',
    marginVertical: 5,
    opacity: 0.5,
  },
  showAllBtn: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 2,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 50,
  },
  showAllBtnText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  sectionHeaderWide: {
    marginBottom: 15,
  },
  serifLabel: {
    fontSize: 11,
    fontFamily: 'CirkaRegular400',
    color: '#666',
    letterSpacing: 1.5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 2,
    marginBottom: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    padding: 0,
  },
  videoScroll: {
    paddingRight: 20,
    marginBottom: 50,
  },
  videoItem: {
    width: width * 0.45,
    marginRight: 16,
  },
  videoCard: {
    width: '100%',
    height: 220,
    backgroundColor: '#000',
    borderRadius: 4,
    padding: 16,
    marginBottom: 12,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  videoMainText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    zIndex: 2,
    lineHeight: 24,
  },
  badgeWrap: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    zIndex: 2,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  durationText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
  },
  videoPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    // Note: Simulated wavy background
    backgroundColor: '#000',
  },
  videoTitle: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#555',
    lineHeight: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  catItemWrap: {
    width: (width - 60) / 3,
    alignItems: 'center',
    marginBottom: 25,
  },
  catCard: {
    width: '100%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  catLabel: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#000',
    textAlign: 'center',
    lineHeight: 14,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#999',
  },
  footerLink: {
    // textDecorationLine: 'underline',
    color: '#000',
    fontFamily: 'Poppins-Medium',
  },
  footerLine: {
    height: 1.5,
    backgroundColor: '#000',
    width: 60,
    marginTop: 1,
    marginLeft: 150, // Position under "here's how"
  },
});

export default SupportMainScreen;
