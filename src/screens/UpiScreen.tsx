import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Percent,
  Settings,
  ChevronDown,
  Plus,
  CreditCard,
  History,
  BadgePercent,
  Verified,
  Gauge,
  MessageSquare,
  Link2,
  Trash2,
  ChevronRight,
  Zap,
  TrendingDown,
  ArrowRight
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const UpiScreen: React.FC = () => {
  const QUICK_ACTIONS = [
    { id: 'add', icon: <Plus size={20} color="#000" />, title: 'add a new card', sub: 'give your new card the CRED experience' },
    { id: 'history', icon: <History size={20} color="#000" />, title: 'view bill payments history', sub: 'check your recent bill payments' },
    { id: 'offers', icon: <BadgePercent size={20} color="#000" />, title: 'card offers', sub: 'view exciting offers on your card' },
    { id: 'guarantee', icon: <Verified size={20} color="#000" />, title: 'claim CRED guarantee', sub: '100% late fee refund for delayed settlem...' },
    { id: 'score', icon: <Gauge size={20} color="#000" />, title: 'check my credit score', sub: 'what impacts your credit score' },
    { id: 'support', icon: <MessageSquare size={20} color="#000" />, title: 'contact support', sub: 'reach out for any queries' },
    { id: 'link', icon: <Link2 size={20} color="#000" />, title: 'link cards', sub: 'link multiple credit cards' },
    { id: 'remove', icon: <Trash2 size={20} color="#000" />, title: 'remove a card', sub: 'remove my credit card from CRED' },
  ];

  const DO_MORE = [
    { id: 'fees', title: 'FEES ON CREDIT', sub: 'pay tuition fees using your card', icon: <Image source={require('../assets/images/mywall.png')} style={{ width: 24, height: 24, backgroundColor: '#fff' }} />, label: 'Explore' },
    { id: 'bills', title: 'CLEAR BILLS', sub: 'clear your bills & mobile recharges', icon: <Image source={require('../assets/images/ee.jpeg')} style={{ width: 24, height: 24 }} />, label: 'Pay now', hasFlash: true },
    { id: 'gift', title: 'GIFT CARDS', sub: 'buy gift cards for your loved ones', icon: <Image source={require('../assets/images/cc.png')} style={{ width: 24, height: 24 }} />, label: 'Explore' },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fdfdfd" />

      <Image
        source={require('../assets/images/top.png')} // Placeholder for 3D chest
        style={{ width: '100%', height: 200 }}
        resizeMode="cover"
      />



      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>


        {/* Card Section */}
        <View style={styles.cardSection}>
          {/* Main SBI Card */}
          <View style={styles.sbiCard}>
            <Image
              source={require('../assets/images/cardsbi.png')}
              style={{ width: '100%', height: 200 }}
              resizeMode="stretch"
            />
          </View>

          {/* Stacked Cards Visualization */}
          {/* <View style={styles.stackedCardsContainer}>
            <View style={[styles.stackedCard, styles.standardCharteredCard]} />
            <View style={[styles.stackedCard, styles.bobCard]} />
          </View> */}

          {/* Pending Action Badge */}
          {/* <TouchableOpacity style={styles.pendingAction}>
            <View style={styles.pendingDot}><Text style={styles.pendingDotTxt}>!</Text></View>
            <Text style={styles.pendingTxt}>1 pending action</Text>
            <ChevronRight color="#888" size={14} />
          </TouchableOpacity> */}
        </View>

        {/* Carousel: DO MORE WITH A CARD */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>DO MORE WITH A CARD USING CRED</Text>
          <Text style={styles.pagerText}>05</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContainer}
          snapToInterval={width * 0.45}
          decelerationRate="fast"
        >
          {DO_MORE.map((item) => (
            <View key={item.id} style={styles.doMoreCard}>
              <View style={styles.doMoreHeader}>
                <View style={styles.doMoreIconWrap}>
                  {item.icon}
                </View>
                {item.hasFlash && (
                  <View style={styles.flashBadge}>
                    <Zap color="#fff" size={8} fill="#fff" />
                  </View>
                )}
              </View>
              <Text style={styles.doMoreTitle}>{item.title}</Text>
              <Text style={styles.doMoreSub}>{item.sub}</Text>
              <TouchableOpacity style={styles.exploreBtn}>
                <Text style={styles.exploreTxt}>{item.label}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* QUICK ACTIONS List */}
        <View style={styles.quickActionsHeader}>
          <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
        </View>

        <View style={styles.quickActionsList}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity key={action.id} style={styles.actionRow} activeOpacity={0.7}>
              <View style={styles.actionIconBox}>
                {action.icon}
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSub}>{action.sub}</Text>
              </View>
              <ArrowRight color="#000" size={20} strokeWidth={1} />
            </TouchableOpacity>
          ))}
        </View>

        {/* <View style={styles.bottomSpacer} /> */}

      </ScrollView>

      {/* FIXED BOTTOM BAR */}
      {/* <View style={styles.bottomActionBar}>
        <View style={styles.bottomInner}>
          <View style={styles.allCount}>
            <Text style={styles.allCountTitle}>ALL (4)</Text>
            <View style={styles.activeTabIndicator} />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardThumbnails} contentContainerStyle={{ alignItems: 'center' }}>
            <View style={[styles.thumbnail, styles.thumbnailActive]}>
              <View style={styles.thumbGraphicSBI} />
            </View>
            <View style={styles.thumbnail}>
              <View style={styles.thumbGraphicBob} />
            </View>
            <View style={styles.thumbnail}>
              <View style={styles.thumbGraphicStanchart} />
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.addCardMiniBtn}>
            <Plus size={16} color="#000" strokeWidth={3} />
            <Text style={styles.addCardMiniTxt}>Add card</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </SafeAreaView>
  );
};

export default UpiScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fdfdfd' },
  scrollContainer: { paddingBottom: 110 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fdfdfd',
  },
  headerIcon: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: '#eee', justifyContent: 'center', alignItems: 'center' },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 24,
    padding: 3,
    width: width * 0.6,
    height: 48,
  },
  toggleBtnActive: { flex: 1, backgroundColor: '#fff', borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 3 },
  toggleBtn: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  toggleTextActive: { fontFamily: 'Poppins-Bold', fontSize: 10, color: '#000', letterSpacing: 0.5 },
  toggleText: { fontFamily: 'Poppins-Bold', fontSize: 10, color: '#999', letterSpacing: 0.5 },
  badgeCount: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#ff4d4d', marginLeft: 6, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontSize: 8, color: '#fff', fontWeight: 'bold' },

  amountWrap: { alignItems: 'center', marginTop: 30 },
  statementLabel: { fontFamily: 'Poppins-Bold', fontSize: 9, color: '#888', letterSpacing: 1.5 },
  amountValueRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  amountValue: { fontFamily: 'CirkaRegular400', fontSize: 32, color: '#000', marginRight: 4 },

  promoWrap: { paddingHorizontal: 40, marginTop: 25 },
  promoInner: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 8,
    shadowColor: '#aaa', shadowOpacity: 0.2, shadowRadius: 10
  },
  promoIcons: { flexDirection: 'row' },
  miniAppIcon: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#fff' },
  promoTxt: { flex: 1, marginLeft: 12, fontSize: 12, fontFamily: 'Poppins-SemiBold', color: '#111' },

  cardSection: { marginTop: 40, alignItems: 'center', paddingHorizontal: 20 },
  sbiCard: {
    width: '100%',
    // height: 220,
    backgroundColor: '#0a0a0a',
    borderRadius: 16,
    // padding: 24,
    overflow: 'hidden',
    zIndex: 3,
    elevation: 10, shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 15
  },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sbiLogoRow: { flexDirection: 'row', alignItems: 'center' },
  sbiIcon: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#00aed9', marginRight: 6 },
  sbiText: { color: '#fff', fontSize: 16, fontFamily: 'Poppins-Bold' },
  sbiAmountRow: { flexDirection: 'row', alignItems: 'center' },
  statusDotRed: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ff4d4d', marginRight: 6 },
  sbiAmount: { color: '#fff', fontSize: 14, fontFamily: 'Poppins-SemiBold' },
  cardOverdue: { color: '#888', alignSelf: 'flex-end', fontSize: 12, fontFamily: 'Poppins-Regular', marginTop: 4 },
  cardMidRow: { marginTop: 10 },
  visaText: { color: '#fff', fontSize: 10, fontFamily: 'Poppins-SemiBold', letterSpacing: 1 },
  cardGraphic: { position: 'absolute', bottom: -50, right: -40, width: 220, height: 220, borderRadius: 110, borderWidth: 1, borderColor: '#333', opacity: 0.5 },
  cardChip: { width: 36, height: 26, backgroundColor: '#c5a044', borderRadius: 4, left: 24, bottom: 90, opacity: 0.7 },
  cardCurves: { position: 'absolute', right: 0, top: 40, width: 150, height: 120, borderTopLeftRadius: 100, borderBottomLeftRadius: 100, borderWidth: 1, borderColor: '#444', opacity: 0.2 },
  cardFooter: { position: 'absolute', bottom: 20, left: 24, right: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  userName: { color: '#fff', fontSize: 13, fontFamily: 'Poppins-Bold', letterSpacing: 1.5 },
  payNowBtn: { backgroundColor: '#fff', paddingHorizontal: 22, paddingVertical: 12, borderRadius: 6 },
  payNowTxt: { color: '#000', fontSize: 12, fontFamily: 'Poppins-Bold' },

  stackedCardsContainer: { width: '100%', height: 100, marginTop: -180, zIndex: 1 },
  stackedCard: { width: '90%', height: 200, borderRadius: 16, alignSelf: 'center', position: 'absolute' },
  standardCharteredCard: { backgroundColor: '#111', top: 110, zIndex: 2, borderWidth: 1, borderColor: '#222' },
  bobCard: { backgroundColor: '#00529b', top: 140, zIndex: 1 },

  pendingAction: {
    marginTop: 180,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 3, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5
  },
  pendingDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#ff4d4d', alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  pendingDotTxt: { color: '#fff', fontSize: 9, fontWeight: 'bold' },
  pendingTxt: { fontSize: 12, fontFamily: 'Poppins-SemiBold', color: '#111', marginRight: 10 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginTop: 40 },
  sectionTitle: { fontSize: 10, fontFamily: 'Poppins-Bold', color: '#888', letterSpacing: 1.5 },
  pagerText: { fontSize: 10, fontFamily: 'Poppins-Bold', color: '#ccc' },

  carouselContainer: { paddingLeft: 24, paddingVertical: 20, paddingRight: 40 },
  doMoreCard: {
    width: width * 0.4,
    backgroundColor: '#fff',
    borderRadius: 2,
    padding: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    elevation: 5, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8
  },
  doMoreHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  doMoreIconWrap: { width: 44, height: 50, backgroundColor: '#fcfcfc', borderBottomWidth: 2, borderRightWidth: 2, borderColor: '#eee', justifyContent: 'center', alignItems: 'center', borderRadius: 4 },
  flashBadge: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', marginLeft: -10, marginTop: -5 },
  doMoreTitle: { fontSize: 11, fontFamily: 'Poppins-Bold', color: '#111', marginTop: 16, letterSpacing: 1 },
  doMoreSub: { fontSize: 9, fontFamily: 'Poppins-Medium', color: '#777', marginTop: 6, lineHeight: 14 },
  exploreBtn: { marginTop: 20 },
  exploreTxt: { fontSize: 11, fontFamily: 'Poppins-Bold', color: '#114499' },

  quickActionsHeader: { paddingHorizontal: 24, marginTop: 20 },
  quickActionsList: { backgroundColor: '#fff', marginTop: 10 },
  actionRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 24, borderBottomWidth: 1, borderBottomColor: '#f7f7f7' },
  actionIconBox: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: '#eee', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  actionContent: { flex: 1 },
  actionTitle: { fontSize: 12, fontFamily: 'Poppins-SemiBold', color: '#111', marginBottom: 2 },
  actionSub: { fontSize: 10, fontFamily: 'Poppins-Medium', color: '#999' },
  bottomSpacer: { height: 100 },

  bottomActionBar: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#fff',
    marginHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 20, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 15
  },
  bottomInner: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  allCount: { marginRight: 15, height: '100%', justifyContent: 'center' },
  allCountTitle: { fontSize: 9, fontFamily: 'Poppins-Bold', color: '#000', letterSpacing: 1 },
  activeTabIndicator: { height: 3, backgroundColor: '#000', position: 'absolute', bottom: 15, left: 0, right: 0 },
  cardThumbnails: { flex: 1 },
  thumbnail: { width: 50, height: 30, borderRadius: 4, marginRight: 12, backgroundColor: '#eee', borderWidth: 1, borderColor: '#f0f0f0', overflow: 'hidden' },
  thumbnailActive: { borderWidth: 2, borderColor: '#333' },
  thumbGraphicSBI: { flex: 1, backgroundColor: '#0a0a0a' },
  thumbGraphicBob: { flex: 1, backgroundColor: '#00529b' },
  thumbGraphicStanchart: { flex: 1, backgroundColor: '#111' },
  addCardMiniBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6fff5',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d0f0e0'
  },
  addCardMiniTxt: { fontSize: 10, fontFamily: 'Poppins-Bold', color: '#000', marginLeft: 4 }
});
