import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput, Image, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, UserSquare, Landmark, ChevronsRight, ArrowRight, MessageSquare, FileClock, GraduationCap, ChevronRight, Book } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import ArrowIcon from '../components/ArrowIcon';

const { width } = Dimensions.get('window');

const EducationScreen: React.FC = () => {
  const navigation = useNavigation();
  const TUTORS = [
    { id: '1', name: 'Harnoor Kaur Gulati', sub: 'French CBSE', img: 'https://picsum.photos/seed/harnoor/200' },
    { id: '2', name: 'S Anup Kumar', sub: 'Pain Management', img: 'https://picsum.photos/seed/anup/200' },
    { id: '3', name: 'Jessica Roshni\nBenedict', sub: 'Piano', img: 'https://picsum.photos/seed/jessica/200' },
    { id: '4', name: 'Swarupa Santhosh', sub: 'Yoga', img: 'https://picsum.photos/seed/swarupa/200' },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar backgroundColor="#fff" barStyle={'dark-content'} />
      {/* Header with Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <ArrowIcon color="#1a1a1a" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>


        {/* Title */}
        <Text style={styles.title}>Shivam, pay all your{'\n'}education-related expenses
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
        <Image
          source={require('../assets/images/paynow2.png')} // Placeholder for 3D chest
          style={styles.chestImageBanner}
          resizeMode="stretch"
        />

        {/* ADD A TUTOR Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ADD A TUTOR</Text>
        </View>

        {/* Actions Grid */}
        <View style={styles.actionsGrid}>
          {/* Pay Contacts */}
          <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('Contact')}>
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
        <View style={styles.listCard}>
          <View style={styles.listItem}>
            <View style={[styles.avatarCircle, { backgroundColor: '#aee4ea' }]}>
              <Text style={styles.avatarInitials}>ah</Text>
            </View>
            <View style={styles.listTextWrap}>
              <Text style={styles.listName}>Alok Maheshwari Huf</Text>
              <Text style={styles.listSub}>tuition fees • ₹8,400</Text>
            </View>
            <TouchableOpacity style={styles.blackBtn} activeOpacity={0.8}>
              <Text style={styles.blackBtnText}>Pay now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />

          <View style={styles.listItem}>
            <View style={[styles.avatarCircle, { backgroundColor: '#dcaee4' }]}>
              <Text style={styles.avatarInitials}>kc</Text>
            </View>
            <View style={styles.listTextWrap}>
              <Text style={styles.listName}>Kaushalya Wo Tarsee...</Text>
              <Text style={styles.listSub}>tuition fees • ₹25,200</Text>
            </View>
            <TouchableOpacity style={styles.blackBtn} activeOpacity={0.8}>
              <Text style={styles.blackBtnText}>Pay now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />

          <View style={styles.listItem}>
            <View style={[styles.avatarCircle, { backgroundColor: '#f9cca9' }]}>
              <Text style={styles.avatarInitials}>sc</Text>
            </View>
            <View style={styles.listTextWrap}>
              <Text style={styles.listName}>Suyash Chourasia</Text>
              <Text style={styles.listSub}>tuition fees</Text>
            </View>
            <TouchableOpacity style={styles.blackBtn} activeOpacity={0.8}>
              <Text style={styles.blackBtnText}>Pay now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* UNVERIFIED TUTORS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>UNVERIFIED TUTORS</Text>
        </View>
        <View style={styles.listCard}>
          <View style={styles.listItem}>
            <View style={[styles.avatarCircle, { backgroundColor: '#f9cca9' }]}>
              <Text style={styles.avatarInitials}>sg</Text>
            </View>
            <View style={styles.listTextWrap}>
              <Text style={styles.listName}>Suraj Goyal</Text>
              <Text style={styles.listSubOrange}>onboarding pending</Text>
            </View>
            <TouchableOpacity style={styles.blackBtn} activeOpacity={0.8}>
              <Text style={styles.blackBtnText}>Request</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* TOP TUTORS ON CRED */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>TOP TUTORS ON CRED</Text>
        </View>
        <View style={styles.tutorGrid}>
          {TUTORS.map((tutor) => (
            <View key={tutor.id} style={styles.tutorCard}>
              <View style={styles.tutorBadge}>
                <Text style={styles.tutorBadgeText}>New Tutor</Text>
              </View>
              <View style={styles.tutorImageWrap}>
                <Image source={{ uri: tutor.img }} style={styles.tutorImage} />
                <View style={styles.tutorVerifiedBadge}>
                  <Image source={require('../assets/images/check.jpeg')} style={{ width: 15, height: 15 }} />
                  {/* <Text style={{ color: '#fff', fontSize: 10, lineHeight: 10, textAlign: 'center' }}>✓</Text> */}
                </View>
              </View>
              <Text style={styles.tutorName} numberOfLines={2}>{tutor.name}</Text>
              <Text style={styles.tutorSub}>{tutor.sub}</Text>
              <TouchableOpacity style={styles.viewProfileBtn} activeOpacity={0.8}>
                <Text style={styles.viewProfileBtnText}>View profile</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* View all button */}
        <TouchableOpacity style={styles.outlineBtn} activeOpacity={0.7}>
          <Text style={styles.outlineBtnText}>View all</Text>
        </TouchableOpacity>

        {/* Education Fees Banner Section */}
        <View style={styles.eduBannerWrap}>
          <LinearGradient
            colors={['#00000000', '#5e72e433', '#825ee433', '#00000000']}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            style={styles.eduBannerGlow}
          />
          <Text style={styles.eduBannerTitle}>pay education fees, effortlessly</Text>

          <TouchableOpacity style={styles.eduBannerCard} activeOpacity={0.8}>
            <View style={styles.eduBannerIconWrap}>
              <Book color="#1a1a1a" size={20} strokeWidth={1.5} />
            </View>
            <View style={styles.eduBannerTextWrap}>
              <Text style={styles.eduBannerMain}>Indian schools and universities</Text>
              <Text style={styles.eduBannerDesc}>tuition fees, uniform fees, and more</Text>
            </View>
            <ChevronRight color="#1a1a1a" size={18} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.eduBannerCard} activeOpacity={0.8}>
            <View style={styles.eduBannerIconWrap}>
              <GraduationCap color="#1a1a1a" size={20} strokeWidth={1.5} />
            </View>
            <View style={styles.eduBannerTextWrap}>
              <Text style={styles.eduBannerMain}>International universities</Text>
            </View>
            <Text style={styles.eduBannerComingSoon}>COMING SOON</Text>
          </TouchableOpacity>
        </View>

        {/* MORE ACTIONS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>MORE ACTIONS</Text>
        </View>
        <View style={styles.actionList}>
          <TouchableOpacity style={styles.actionRow} activeOpacity={0.7} onPress={() => navigation.navigate('PaymentHistory')}>
            <View style={styles.actionListIconWrap}>
              <FileClock color="#000" size={20} strokeWidth={1.5} />
            </View>
            <View style={styles.actionListTextWrap}>
              <Text style={styles.actionListMain} >transaction history</Text>
              <Text style={styles.actionListSub}>see your transactions</Text>
            </View>
            <ArrowRight color="#1a1a1a" size={20} strokeWidth={1.5} />
          </TouchableOpacity>
          <View style={styles.actionDivider} />

          <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
            <View style={styles.actionListIconWrap}>
              <MessageSquare color="#000" size={20} strokeWidth={1.5} />
            </View>
            <View style={styles.actionListTextWrap}>
              <Text style={styles.actionListMain}>contact support</Text>
              <Text style={styles.actionListSub}>reach out for any help</Text>
            </View>
            <ArrowRight color="#1a1a1a" size={20} strokeWidth={1.5} />
          </TouchableOpacity>
          <View style={styles.actionDivider} />

          <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
            <View style={styles.actionListIconWrap}>
              <MessageSquare color="#000" size={20} strokeWidth={1.5} />
            </View>
            <View style={styles.actionListTextWrap}>
              <Text style={styles.actionListMain}>FAQs</Text>
              <Text style={styles.actionListSub}>reach out for any help</Text>
            </View>
            <ArrowRight color="#1a1a1a" size={20} strokeWidth={1.5} />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footerWrap}>
          <Text style={styles.footerSecureTxt}>PCI DSS</Text>
          <Text style={styles.footerSecureTxt}>256 bit encryption</Text>
          <View style={styles.footerCircles}>
            <View style={[styles.footerCircle, { backgroundColor: '#ea4335' }]} />
            <View style={[styles.footerCircle, { backgroundColor: '#fbbc05', marginLeft: -8 }]} />
          </View>
          <Text style={styles.footerBrandTxt}>VISA</Text>
          <Text style={[styles.footerBrandTxt, { color: '#d48a27' }]}>RuPay</Text>
        </View>

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
    // marginBottom: 24,
    marginLeft: 24,
    height: 50,
    justifyContent: 'center'
  },
  title: {
    fontFamily: 'CirkaBold700',
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
    marginTop: 20
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
  chestImageBanner: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    marginBottom: 40,
  },
  // List Card (1-click payments & unverified)
  listCard: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#f0f0f0', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 1 },
  listItem: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  avatarCircle: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  avatarInitials: { fontFamily: 'Poppins-Medium', fontSize: 14, color: '#333' },
  listTextWrap: { flex: 1, justifyContent: 'center' },
  listName: { fontFamily: 'Poppins-Medium', fontSize: 13, color: '#111', marginBottom: 2 },
  listSub: { fontFamily: 'Poppins-Regular', fontSize: 11, color: '#888' },
  listSubOrange: { fontFamily: 'Poppins-Regular', fontSize: 11, color: '#d27c3a' },
  blackBtn: { backgroundColor: '#111', borderRadius: 4, paddingHorizontal: 16, paddingVertical: 8, minWidth: 70, alignItems: 'center' },
  blackBtnText: { fontFamily: 'Poppins-Medium', fontSize: 11, color: '#fff' },
  divider: { height: 1, backgroundColor: '#f2f2f2', marginHorizontal: 16 },

  // Tutors Grid
  tutorGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  tutorCard: { width: (width - 50) / 2, backgroundColor: '#fff', borderRadius: 16, padding: 16, alignItems: 'center', marginBottom: 14, borderWidth: 1, borderColor: '#f0f0f0', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2 },
  tutorBadge: { position: 'absolute', top: 0, right: 0, backgroundColor: '#dfdfdf', borderBottomLeftRadius: 8, borderTopRightRadius: 16, paddingHorizontal: 8, paddingVertical: 4 },
  tutorBadgeText: { fontFamily: 'Poppins-Regular', fontSize: 9, color: '#666' },
  tutorImageWrap: { width: 66, height: 66, borderRadius: 33, marginBottom: 12, marginTop: 10 },
  tutorImage: { width: 66, height: 66, borderRadius: 33, backgroundColor: '#eee' },
  tutorVerifiedBadge: { position: 'absolute', top: 0, right: 0, width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  tutorName: { fontFamily: 'Poppins-Medium', fontSize: 12, color: '#111', textAlign: 'center', marginBottom: 2, height: 36 },
  tutorSub: { fontFamily: 'Poppins-Regular', fontSize: 10, color: '#888', textAlign: 'center', marginBottom: 16 },
  viewProfileBtn: { backgroundColor: '#000', borderRadius: 20, width: '100%', paddingVertical: 10, alignItems: 'center' },
  viewProfileBtnText: { fontFamily: 'Poppins-Medium', fontSize: 11, color: '#fff' },

  outlineBtn: { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, paddingVertical: 14, alignItems: 'center', marginTop: 6, marginBottom: 10, backgroundColor: '#fff' },
  outlineBtnText: { fontFamily: 'Poppins-Medium', fontSize: 13, color: '#111' },

  // EDU BANNER SECTION
  eduBannerWrap: { marginTop: 40, marginBottom: 20 },
  eduBannerGlow: {
    position: 'absolute',
    top: 100, // Centered between the two cards
    left: -24,
    right: -24,
    height: 140, // Wider spread vertically
    opacity: 0.8, // Slightly darker as requested
  },
  eduBannerTitle: { fontFamily: 'CirkaBold700', fontSize: 20, color: '#111', marginBottom: 20, letterSpacing: 0.2 },
  eduBannerCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#fcfcfc',
  },
  eduBannerIconWrap: { width: 42, height: 42, borderRadius: 21, borderWidth: 1, borderColor: '#f2f2f2', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  eduBannerTextWrap: { flex: 1 },
  eduBannerMain: { fontFamily: 'Poppins-Medium', fontSize: 11, color: '#111', marginBottom: 2 },
  eduBannerDesc: { fontFamily: 'Poppins-Regular', fontSize: 10, color: '#888' },
  eduBannerComingSoon: { fontFamily: 'Poppins-Medium', fontSize: 9, color: '#aaa', letterSpacing: 1 },

  // MORE ACTIONS
  actionList: { marginTop: 0 },
  actionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18 },
  actionListIconWrap: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  actionListTextWrap: { flex: 1 },
  actionListMain: { fontFamily: 'Poppins-Medium', fontSize: 13, color: '#222', marginBottom: 2 },
  actionListSub: { fontFamily: 'Poppins-Regular', fontSize: 11, color: '#999' },
  actionDivider: { height: 1, backgroundColor: '#f5f5f5', marginLeft: 60 },

  // FOOTER
  footerWrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 40, gap: 10 },
  footerSecureTxt: { fontFamily: 'Poppins-Medium', fontSize: 9, color: '#666' },
  footerCircles: { flexDirection: 'row', alignItems: 'center' },
  footerCircle: { width: 14, height: 14, borderRadius: 7 },
  footerBrandTxt: { fontFamily: 'Poppins-Bold', fontSize: 10, color: '#114499', fontStyle: 'italic' },
});
