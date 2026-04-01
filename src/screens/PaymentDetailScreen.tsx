import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, ExternalLink, Copy, AlertTriangle, ChevronUp } from 'lucide-react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  PaymentDetail: {
    transaction: {
      id: string;
      vendor: string;
      amount: number;
      dateStr: string;
      status: 'COMPLETED' | 'FAILED';
      iconType?: string;
    };
  };
};

const PaymentDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'PaymentDetail'>>();
  const { transaction } = route.params || {};

  const isFailed = transaction?.status === 'FAILED';

  const DetailRow = ({ label, value, isBold = false }: { label: string, value: string, isBold?: boolean }) => (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <View style={styles.valueRow}>
        <Text style={[styles.detailValue, isBold && styles.detailValueBold]}>{value}</Text>
        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Copy size={16} color="#888" strokeWidth={1.5} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderVendorLogo = (type: string | undefined) => {
    switch (type) {
      case 'blinkit': return require('../assets/images/blinkit.png');
      case 'zomato': return require('../assets/images/zomato.png');
      case 'zepto': return require('../assets/images/zepto.png');
      case 'hdfc': return require('../assets/images/hdfc.png');
      case 'education': return require('../assets/images/book.png');
      default: return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header Overlay (on dark bg) */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => navigation.goBack()}
        >
          <X color="#fff" size={20} strokeWidth={2} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerBtn}>
          <ExternalLink color="#fff" size={20} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* TOP WHITE CARD SECTION */}
        <View style={styles.whiteCard}>
          {/* Vendor Header */}
          <View style={styles.vendorHeader}>
            <View style={styles.vendorLogoBox}>
              {transaction?.iconType ? (
                <Image
                  source={renderVendorLogo(transaction.iconType)}
                  style={styles.vendorLogo}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.vendorLetterIcon}>
                  <Text style={styles.vendorLetter}>{transaction?.vendor?.[0]}</Text>
                </View>
              )}
            </View>
            <Text style={styles.vendorName}>{transaction?.vendor?.toLowerCase() || 'vendor'}</Text>
          </View>

          <View style={styles.horizontalDivider} />

          {/* Amount & Date */}
          <View style={styles.amountSection}>
            <View style={styles.amountMainRow}>
              <Text style={styles.amountTxt}>₹{transaction?.amount?.toLocaleString('en-IN') || '0'}</Text>
              {isFailed && (
                <View style={styles.failBadge}>
                  <Text style={styles.failBadgeTxt}>PAYMENT FAILED</Text>
                </View>
              )}
            </View>
            <Text style={styles.dateTxt}>{transaction?.dateStr || '...'}am, 7th mar'26</Text>

            <View style={styles.intentBadge}>
              <Text style={styles.intentBadgeTxt}>UPIIntent</Text>
            </View>

            {isFailed && (
              <Text style={styles.declineTxt}>
                this payment has been declined by your bank as per UPI risk policy. your money if debited will be reversed. try again with a different bank account
              </Text>
            )}
          </View>

          {/* Bank Info Card */}
          <View style={styles.bankInfoCard}>
            <View style={styles.bankCardHeader}>
              <Image
                source={require('../assets/images/hdfc.png')}
                style={styles.bankIcon}
                resizeMode="contain"
              />
              <View style={styles.bankNameCol}>
                <Text style={styles.bankLabel}>HDFC BANK LTD</Text>
                <View style={styles.accRow}>
                  <Text style={styles.accNum}>XXXXXX5945</Text>
                  <Text style={styles.upiItalic}>UPI‣</Text>
                </View>
              </View>
              <ChevronUp color="#000" size={20} />
            </View>

            <TouchableOpacity style={styles.checkBalanceBtn}>
              <Text style={styles.checkBalanceTxt}>Check balance</Text>
            </TouchableOpacity>
          </View>

          {/* Timeline Stepper */}
          <View style={styles.timeline}>
            <View style={styles.timelineEntry}>
              <View style={[styles.timelineDot, { backgroundColor: '#4caf50' }]} />
              <View style={styles.timelineLine} />
              <Text style={styles.timelineTxt}>payment initiated from your HDFC BANK LTD account</Text>
            </View>

            <View style={styles.timelineEntry}>
              <View style={[styles.timelineDot, { backgroundColor: '#4caf50' }]} />
              <View style={styles.timelineLine} />
              <Text style={styles.timelineTxt}>bank details of {transaction?.vendor?.toLowerCase() || 'vendor'} have been authenticated by NPCI</Text>
            </View>

            <View style={styles.timelineEntry}>
              <View style={[styles.timelineDot, { backgroundColor: isFailed ? '#e53935' : '#4caf50' }]} />
              <Text style={styles.timelineTxt}>
                {isFailed
                  ? `payment could not be credited to ${transaction?.vendor?.toLowerCase() || 'vendor'}'s bank account`
                  : `payment successfully credited to ${transaction?.vendor?.toLowerCase() || 'vendor'}'s bank account`
                }
              </Text>
            </View>
          </View>

          {/* Refund Banner Tip */}
          <View style={styles.refundBannerCard}>
            <Text style={styles.refundBannerTxt}>ANY AMOUNT DEBITED WILL BE REFUNDED IN 5-7 BUSINESS DAYS</Text>
          </View>
        </View>

        {/* BOTTOM DARK SECTION (TRANSACTION DETAILS) */}
        <View style={styles.darkSection}>
          <DetailRow
            label="transaction id"
            value={transaction?.id ? `23f3ad66-e54a-4d55-adf8-ee75d7212252${transaction.id}` : "23f3ad66-e54a-4d55-adf8-ee75d7212252"}
          />

          <DetailRow
            label="upi txn id"
            value="643292019062"
          />

          <DetailRow
            label="paid to UPI ID"
            value="blinkit3.payu@hdfcbank"
            isBold
          />

          <DetailRow
            label="paid from UPI ID"
            value="9465322970@axisb"
            isBold
          />

          <View style={styles.darkDivider} />

          {/* Refund Notice */}
          <View style={styles.refundNotice}>
            <View style={styles.alertIconBg}>
              <AlertTriangle size={24} color="#d4c9ff" fill="#2a2442" strokeWidth={1.5} />
            </View>
            <Text style={styles.refundNoticeTxt}>
              if the transaction fails, any amount debited will be automatically refunded to your account within 5-7 days.
            </Text>
            <Text style={styles.supportTipTxt}>
              got more questions? our support team is only a click away.
            </Text>
            <TouchableOpacity style={styles.contactSupportBtn}>
              <Text style={styles.contactSupportTxt}>Contact support</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Logos */}
          <View style={styles.footerLogos}>
            <Image source={require('../assets/images/up.png')} style={{ width: 35, height: 20 }} resizeMode="contain" />
            <View style={styles.footerPipe} />
            <Image source={require('../assets/images/rupay.jpg')} style={{ width: 35, height: 20 }} resizeMode="contain" />
            <View style={styles.footerPipe} />
            <View style={styles.footerBank}>
              <Image source={require('../assets/images/axis.png')} style={{ width: 14, height: 14, marginRight: 4 }} />
              <Text style={styles.footerBankTxt}>AXIS BANK</Text>
            </View>
            <View style={styles.footerPipe} />
            <View style={styles.footerBank}>
              <Text style={{ color: '#888', fontSize: 10, marginRight: 2 }}>✓</Text>
              <Text style={styles.footerBankTxt}>YES BANK</Text>
            </View>
            <View style={styles.footerPipe} />
            <View style={styles.footerBank}>
              <View style={styles.dreamCircle}><Text style={styles.dreamD}>D</Text></View>
              <Text style={styles.footerBankTxt}>DREAMPURSE</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    top: StatusBar.currentHeight || 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingTop: 100, // accommodate sticky-ish header
  },

  // WHITE CARD STYLES
  whiteCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 40,
  },
  vendorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  vendorLogoBox: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  vendorLogo: {
    width: 24,
    height: 24,
  },
  vendorLetterIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  vendorLetter: {
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    color: '#888'
  },
  vendorName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: '#000',
    letterSpacing: 0.2,
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 24,
  },
  amountSection: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  amountMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  amountTxt: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#000',
  },
  failBadge: {
    backgroundColor: '#fff5f5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  failBadgeTxt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: '#e53935',
    letterSpacing: 0.5,
  },
  dateTxt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#888',
    marginBottom: 16,
  },
  intentBadge: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 20,
  },
  intentBadgeTxt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#888',
  },
  declineTxt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#888',
    lineHeight: 20,
    marginBottom: 10,
  },

  // BANK CARD STYLES
  bankInfoCard: {
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginHorizontal: 16,
    borderRadius: 4,
    padding: 16,
    marginBottom: 30,
  },
  bankCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  bankIcon: {
    width: 36,
    height: 36,
    marginRight: 12,
  },
  bankNameCol: {
    flex: 1,
  },
  bankLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#888',
    marginBottom: 2,
  },
  accRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accNum: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#000',
    marginRight: 6,
  },
  upiItalic: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#000',
    fontStyle: 'italic',
  },
  checkBalanceBtn: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 2,
  },
  checkBalanceTxt: {
    fontFamily: 'Poppins-Bold',
    fontSize: 11,
    color: '#000',
  },

  // TIMELINE STYLES
  timeline: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  timelineEntry: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 25,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 16,
    zIndex: 1,
  },
  timelineLine: {
    position: 'absolute',
    left: 3.5,
    top: 14,
    bottom: 0,
    width: 1,
    backgroundColor: '#eee',
  },
  timelineTxt: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#333',
    lineHeight: 18,
  },

  refundBannerCard: {
    backgroundColor: '#111',
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  refundBannerTxt: {
    fontFamily: 'Poppins-Bold',
    fontSize: 9,
    color: '#fff',
    letterSpacing: 0.8,
    textAlign: 'center',
  },

  // DARK SECTION STYLES
  darkSection: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 40,
  },
  detailRow: {
    marginBottom: 30,
  },
  detailLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#888',
    marginBottom: 6,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: '#fff',
    flex: 1,
    marginRight: 10,
  },
  detailValueBold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
  },
  darkDivider: {
    height: 1,
    backgroundColor: '#1a1a1a',
    marginVertical: 10,
  },
  refundNotice: {
    marginTop: 40,
  },
  alertIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  refundNoticeTxt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#777',
    lineHeight: 20,
    marginBottom: 20,
  },
  supportTipTxt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#555',
    lineHeight: 20,
    marginBottom: 30,
  },
  contactSupportBtn: {
    borderWidth: 1,
    borderColor: '#555',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 2,
  },
  contactSupportTxt: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: '#fff',
  },

  // Footer
  footerLogos: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    opacity: 0.4,
    justifyContent: 'center',
    gap: 8
  },
  footerPipe: {
    width: 1,
    height: 12,
    backgroundColor: '#888',
  },
  footerBank: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  footerBankTxt: {
    fontSize: 8,
    color: '#888',
    fontWeight: '600'
  },
  dreamCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2
  },
  dreamD: {
    fontSize: 7,
    color: '#888',
    fontWeight: 'bold'
  }
});
