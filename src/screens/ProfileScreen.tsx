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
import { MessageSquareMore, Pencil, Landmark, CheckCircle2, IndianRupee, ChevronsRight } from 'lucide-react-native';

// ── helpers ──────────────────────────────────────────────────────────────────

const ChevronRight = () => (
  <Text style={styles.chevron}>›</Text>
);

const ArrowRight = () => (
  <Text style={styles.arrowRight}>→</Text>
);

// ── sub-components ────────────────────────────────────────────────────────────

interface MenuRowProps {
  label: React.ReactNode;
  subtitle?: React.ReactNode;
  rightText?: string;
  hasArrow?: boolean;
  onpress?: () => void;
}

const MenuRow = ({ label, subtitle, rightText, hasArrow = false, onpress }: MenuRowProps) => (
  <TouchableOpacity style={styles.menuRow} activeOpacity={0.6} onPress={onpress}>
    <View style={styles.menuRowLeft}>
      <View>
        {typeof label === 'string' ? (
          <Text style={[styles.menuRowLabel, subtitle ? { marginBottom: 2 } : null]}>{label}</Text>
        ) : (
          label
        )}
      </View>
      {subtitle ? (
        typeof subtitle === 'string' ? (
          <Text style={styles.menuRowSub}>{subtitle}</Text>
        ) : (
          subtitle
        )
      ) : null}
    </View>
    <View style={styles.menuRowRight}>
      {rightText ? <Text style={styles.menuRowValue}>{rightText}</Text> : null}
      {hasArrow ? <ArrowRight /> : <ChevronRight />}
    </View>
  </TouchableOpacity>
);

interface StatRowProps {
  icon: React.ReactNode;
  label: string;
  subLabel?: string;
  subLabelColor?: string;
  value?: React.ReactNode;
}

const StatRow = ({ icon, label, subLabel, subLabelColor, value }: StatRowProps) => (
  <TouchableOpacity style={styles.statRow} activeOpacity={0.6}>
    <View style={styles.statLeft}>
      <View style={styles.statIconCircle}>
        {icon}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.statLabel}>{label}</Text>
        {subLabel && (
          <Text style={[styles.statLabel, { color: subLabelColor || '#888' }]}>
            {subLabel}
          </Text>
        )}
      </View>
    </View>
    <View style={styles.statRight}>
      {value ? (
        typeof value === 'string' ? (
          <Text style={styles.statValue}>{value}</Text>
        ) : (
          value
        )
      ) : null}
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

// ── banner ───────────────────────────────────────────────────────────────

const CredMoneyBanner = ({ onPress }: any) => {
  return (
    <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
      <TouchableOpacity activeOpacity={0.8} style={styles.moneyBanner}>
        <View style={styles.moneyBannerLeft}>
          <View style={styles.moneyBannerIcon}>
            <Landmark color="#fff" size={18} />
          </View>
        </View>
        <View style={styles.moneyBannerTextWrap}>
          <Text style={styles.moneyBannerSubtitle} onPress={onPress}>track all your bank accounts</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
            <Text style={styles.moneyBannerTitle}>Access CRED money</Text>
            <ArrowRight />
          </View>
        </View>
      </TouchableOpacity>
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
              source={require('../assets/images/user.jpeg')}
              style={styles.avatar}
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Shivam Bansal</Text>
            <Text style={styles.profileSince}>member since Dec, 2019</Text>
          </View>
          <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
            <Pencil color='#fff' size={14} />
          </TouchableOpacity>
        </View>

        {/* ── Promo Banner ── */}
        <CredMoneyBanner onPress={() => navigation.navigate('PaymentHistory')} />

        {/* ── Stats ── */}
        <View style={styles.divider} />
        <StatRow
          icon={<CheckCircle2 color="#888" size={14} />}
          label="credit score "
          subLabel="• REFRESH AVAILABLE"
          subLabelColor="#4caf50"
        />
        <View style={styles.divider} />
        <StatRow
          icon={<IndianRupee color="#888" size={14} />}
          label="lifetime cashback"
          value={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <IndianRupee color="#fff" size={10} strokeWidth={3} />
              <Text style={styles.statValue}>498</Text>
            </View>
          }
        />
        <View style={styles.divider} />
        <StatRow
          icon={<ChevronsRight color="#888" size={14} />}
          label="bank balance"
          value="check"
        />
        {/* <View style={styles.divider} /> */}

        {/* ── Your Rewards & Benefits ── */}
        <SectionHeader title="YOUR REWARDS & BENEFITS" />

        <MenuRow
          label="cashback balance"
          subtitle={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <IndianRupee color="#777" size={10} strokeWidth={3} />
              <Text style={styles.menuRowSub}>157</Text>
            </View>
          }
        />
        <View style={styles.divider} />

        <MenuRow label="coins" subtitle="3,07,022" />
        <View style={styles.divider} />

        <MenuRow
          label={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.menuRowLabel}>win assured </Text>
              <IndianRupee color="#ddd" size={10} strokeWidth={3} />
              <Text style={styles.menuRowLabel}>200</Text>
            </View>
          }
          subtitle="refer and earn"
        />
        {/* <View style={styles.divider} /> */}

        {/* ── Transactions & Support ── */}
        <SectionHeader title="TRANSACTIONS & SUPPORT" />
        <MenuRow label="all transactions" onpress={() => navigation.navigate('PaymentHistory')} />
        <View style={styles.divider} />
        <MenuRow label="access support" />
        {/* <View style={styles.divider} /> */}

        {/* ── Transactions & Support ── */}
        <SectionHeader title="PAYMENT & BANK ACCOUNT" />
        <MenuRow label="UPI settings" />
        <View style={styles.divider} />
        <MenuRow label="token management" />
        <View style={styles.divider} />
        <MenuRow label="instant refund account setup" />
        <View style={styles.divider} />
        <MenuRow label="use RuPay credit card for UPI transactions" />
        {/* <View style={styles.divider} /> */}
        {/* ── Transactions & Support ── */}
        <SectionHeader title="ACCOUNT SETTINGS" />
        <MenuRow label="manage autopay" />
        <View style={styles.divider} />
        <MenuRow label="manage CRED protect" />
        <View style={styles.divider} />
        <MenuRow label="manage account" />
        <View style={styles.divider} />
        <MenuRow label="manage addresses" />

        <SectionHeader title="ABOUT" />
        <MenuRow label="terms & conditions" />
        <View style={styles.divider} />
        <MenuRow label="privacy policy" />
        <View style={styles.divider} />
        <MenuRow label="security" />
        <View style={styles.divider} />
        <MenuRow label="Google API disclosure" />
        <View style={styles.divider} />
        <MenuRow label="open source licenses" />
        <View style={styles.divider} />
        <MenuRow label="UPI FAQs and grievance" />
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
    fontSize: 13,
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

  // ── Banner ──
  moneyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151515',
    borderRadius: 4,
    paddingVertical: 18,
    paddingHorizontal: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: '#262626',
  },
  moneyBannerLeft: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  moneyBannerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moneyBannerTextWrap: {
    flex: 1,
  },
  moneyBannerSubtitle: {
    color: '#888',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  moneyBannerTitle: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
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
    fontFamily: 'Poppins-Medium',
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
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  menuRowLeft: {
    flex: 1,
  },
  menuRowLabel: {
    color: '#ddd',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  menuRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  menuRowValue: {
    color: '#888',
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
  },
  menuRowSub: {
    color: '#777',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },

  // ── Arrows / Chevrons ──
  chevron: {
    color: '#555',
    fontSize: 24,
    fontFamily: 'Poppins-Light',
    lineHeight: 22,
  },
  arrowRight: {
    color: '#666',
    fontSize: 16,
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
