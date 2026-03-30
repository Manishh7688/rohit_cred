import { useNavigation } from '@react-navigation/native';
import ArrowIcon from '../components/ArrowIcon';
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageSquareMore, Pencil, Car, Gift, Shield } from 'lucide-react-native';

// ── helpers ──────────────────────────────────────────────────────────────────

const ChevronRight = () => (
  <Text style={styles.chevron}>›</Text>
);

const ArrowRight = () => (
  <Text style={styles.arrowRight}>→</Text>
);

// ── sub-components ────────────────────────────────────────────────────────────

interface MenuRowProps {
  label: string;
  rightText?: string;
  hasArrow?: boolean;   // → arrow (for stats rows)
  rightLabel?: string;  // extra right label
}

const MenuRow = ({ label, rightText, hasArrow = false }: MenuRowProps) => (
  <TouchableOpacity style={styles.menuRow} activeOpacity={0.6}>
    <Text style={styles.menuRowLabel}>{label}</Text>
    <View style={styles.menuRowRight}>
      {rightText ? <Text style={styles.menuRowValue}>{rightText}</Text> : null}
      {hasArrow ? <ArrowRight /> : <ChevronRight />}
    </View>
  </TouchableOpacity>
);

interface StatRowProps {
  icon: string;
  label: string;
  value: string;
}

const StatRow = ({ icon, label, value }: StatRowProps) => (
  <TouchableOpacity style={styles.statRow} activeOpacity={0.6}>
    <View style={styles.statLeft}>
      <View style={styles.statIconCircle}>
        <Text style={styles.statIcon}>{icon}</Text>
      </View>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
    <View style={styles.statRight}>
      <Text style={styles.statValue}>{value}</Text>
      <ArrowRight />
    </View>
  </TouchableOpacity>
);

interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

// ── banner data ───────────────────────────────────────────────────────────────

const BANNERS = [
  {
    id: '1',
    icon: <Car color="#fff" size={20} />,
    subtitle: 'get to know your vehicles, inside out',
    link: 'CRED garage',
  },
  {
    id: '2',
    icon: <Gift color="#fff" size={20} />,
    subtitle: 'share & earn rewards with friends',
    link: 'refer and earn',
  },
  {
    id: '3',
    icon: <Shield color="#fff" size={20} />,
    subtitle: 'secure your account from fraud',
    link: 'CRED protect',
  },
];

const BANNER_WIDTH = Dimensions.get('window').width - 32; // 16 margin each side

const PromoBannerCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / BANNER_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        snapToInterval={BANNER_WIDTH + 14}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 16, gap: 14 }}
        style={{ width: Dimensions.get('window').width }}
      >
        {BANNERS.map((banner) => (
          <TouchableOpacity
            key={banner.id}
            activeOpacity={1}
            style={[styles.promoBanner, { width: BANNER_WIDTH }]}
          >
            <View style={styles.promoIconCircle}>
              {banner.icon}
            </View>
            <View style={styles.promoTextWrap}>
              <Text style={styles.promoSubtitle}>{banner.subtitle}</Text>
              <View style={styles.promoLinkRow}>
                <Text style={styles.promoLink}>{banner.link}</Text>
                <View style={{ transform: [{ rotate: '180deg' }] }}>
                  <ArrowIcon color="#fff" width={25} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Dot indicator */}
      <View style={styles.dotRow}>
        {BANNERS.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === activeIndex ? styles.dotActive : styles.dotInactive]}
          />
        ))}
      </View>
    </View>
  );
};

// ── main screen ───────────────────────────────────────────────────────────────

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* ── Top Bar ── */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} activeOpacity={1} onPress={() => navigation.goBack()}>
          <ArrowIcon color='#fff' />
          <Text style={styles.topBarTitle}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportBtn} activeOpacity={0.7}>
          <MessageSquareMore color='#fff' size={14} />
          <Text style={styles.supportText}>support</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Profile Header ── */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrap}>
            <Image
              source={{ uri: 'https://picsum.photos/seed/profile/200' }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Aarti goyal</Text>
            <Text style={styles.profileSince}>member since Apr, 2022</Text>
          </View>
          <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
            <Pencil color='#fff' size={14} />
          </TouchableOpacity>
        </View>

        {/* ── Promo Banner (scrollable) ── */}
        <PromoBannerCarousel />

        {/* ── Stats ── */}
        <View style={styles.divider} />
        <StatRow icon="✦" label="credit score" value="748" />
        <View style={styles.divider} />
        <StatRow icon="₹" label="lifetime cashback" value="₹818" />
        <View style={styles.divider} />
        <StatRow icon="𝙥" label="bank balance" value="check" />
        <View style={styles.divider} />

        {/* ── Your Rewards & Benefits ── */}
        <SectionHeader title="YOUR REWARDS & BENEFITS" />

        <MenuRow label="cashback balance" rightText="" />
        <Text style={styles.menuRowSub}>₹14</Text>
        <View style={styles.divider} />

        <MenuRow label="coins" rightText="" />
        <Text style={styles.menuRowSub}>2,53,981</Text>
        <View style={styles.divider} />

        <MenuRow label="win assured ₹200" rightText="" />
        <Text style={styles.menuRowSub}>refer and earn</Text>
        <View style={styles.divider} />

        {/* ── Transactions & Support ── */}
        <SectionHeader title="TRANSACTIONS & SUPPORT" />
        <MenuRow label="all transactions" />
        <View style={styles.divider} />
        <MenuRow label="use RuPay credit cards for UPI transactions" />
        <View style={styles.divider} />
        <MenuRow label="brand permissions" />
        <View style={styles.divider} />

        {/* ── Account Settings ── */}
        <SectionHeader title="ACCOUNT SETTINGS" />
        <MenuRow label="manage autopay" />
        <View style={styles.divider} />
        <MenuRow label="manage CRED protect" />
        <View style={styles.divider} />
        <MenuRow label="manage account" />
        <View style={styles.divider} />
        <MenuRow label="manage addresses" />
        <View style={styles.divider} />

        {/* ── About ── */}
        <SectionHeader title="ABOUT" />
        <MenuRow label="terms and conditions" />
        <View style={styles.divider} />
        <MenuRow label="privacy policy" />
        <View style={styles.divider} />
        <MenuRow label="security" />
        <View style={styles.divider} />
        <MenuRow label="Google API disclosure" />
        <View style={styles.divider} />
        <MenuRow label="open source licenses" />
        <View style={styles.divider} />
        <MenuRow label="UPI FAQs and grievances" />
        <View style={styles.divider} />

        {/* Bottom home bar spacing */}
        <View style={{ height: 30 }} />
        {/* <View style={styles.homeBar} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

// ── styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scroll: {
    backgroundColor: '#000',
    paddingBottom: 20,
  },

  // ── Top Bar ──
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  backArrow: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins-Light',
    marginRight: 6,
  },
  topBarTitle: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.3,
  },
  supportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 5,
  },
  supportIcon: {
    fontSize: 14,
    color: '#aaa',
  },
  supportText: {
    color: '#aaa',
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
  },

  // ── Profile Header ──
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  avatarWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 14,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    marginBottom: 3,
  },
  profileSince: {
    color: '#888',
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
  },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    color: '#aaa',
    fontSize: 16,
  },

  // ── Promo Banner ──
  promoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f0f0f',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: '#222',
  },
  promoIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoIconText: {
    fontSize: 20,
  },
  promoTextWrap: {
    flex: 1,
  },
  promoSubtitle: {
    color: '#888',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginBottom: 4,
  },
  promoLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  promoLink: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
  },

  // ── Dots ──
  dotRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 10,
    marginBottom: 10,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  dotActive: {
    backgroundColor: '#fff',
  },
  dotInactive: {
    backgroundColor: '#444',
  },

  // ── Divider ──
  divider: {
    height: 1,
    backgroundColor: '#1a1a1a',
    marginHorizontal: 0,
  },

  // ── Stat Row ──
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  statLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statIcon: {
    color: '#888',
    fontSize: 12,
  },
  statLabel: {
    color: '#ccc',
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
  },
  statRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
  },

  // ── Section Header ──
  sectionHeader: {
    color: '#555',
    fontSize: 11,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1.2,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 4,
    textTransform: 'uppercase',
  },

  // ── Menu Row ──
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuRowLabel: {
    color: '#ddd',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    flex: 1,
  },
  menuRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  menuRowValue: {
    color: '#888',
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
  },
  menuRowSub: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 20,
    marginTop: -10,
    marginBottom: 8,
  },

  // ── Arrows / Chevrons ──
  chevron: {
    color: '#555',
    fontSize: 22,
    fontFamily: 'Poppins-Light',
    lineHeight: 22,
  },
  arrowRight: {
    color: '#666',
    fontSize: 14,
    fontFamily: 'Poppins-Light',
  },

  // ── Home bar ──
  homeBar: {
    width: 130,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#444',
    alignSelf: 'center',
  },
});

export default ProfileScreen;
