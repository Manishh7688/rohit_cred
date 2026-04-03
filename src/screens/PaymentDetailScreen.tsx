import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Image,
  Modal,
  Pressable,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import ArrowIcon from '../components/ArrowIcon';
import { IndianRupee, FileDown } from 'lucide-react-native';
import RNFS from 'react-native-fs';

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
      pdf?: any;
      [key: string]: any;
    };
  };
};

const PaymentDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'PaymentDetail'>>();
  const { transaction } = route.params || {};
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const LabelValue = ({ label, value, isBold = false, isGrayValue = false }: { label: string; value: React.ReactNode; isBold?: boolean; isGrayValue?: boolean }) => (
    <View style={styles.labelValueContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {typeof value === 'string' ? (
        <Text style={[styles.fieldValue, isBold && styles.fieldValueBold, isGrayValue && styles.fieldValueGray]}>
          {value}
        </Text>
      ) : (
        value
      )}
    </View>
  );

  const downloadPDF = async (pdfUri: any) => {
    console.log("Original pdfUri (Resource ID):", pdfUri);

    if (!pdfUri) {
      Alert.alert('Error', 'No document found for this transaction');
      return;
    }

    try {
      // Resolve the require(path) into a valid source/URI
      const asset = Image.resolveAssetSource(pdfUri);
      let url = asset?.uri;

      if (!url) {
        Alert.alert('Error', 'Unable to resolve document path');
        return;
      }

      // Fix for Android Emulators: redirect localhost to 10.0.2.2
      if (Platform.OS === 'android' && url.includes('localhost')) {
        url = url.replace('localhost', '10.0.2.2');
      }

      console.log("Resolved Download URL:", url);

      // Dynamic naming based on transaction vendor or ID
      const cleanedVendor = transaction?.vendor?.replace(/[^a-zA-Z0-9]/g, '_');
      const fileName = `${cleanedVendor || 'receipt'}_${transaction?.id || 'doc'}.pdf`;

      // Android path
      const downloadPath =
        Platform.OS === 'android'
          ? `${RNFS.DownloadDirectoryPath}/${fileName}`
          : `${RNFS.DocumentDirectoryPath}/${fileName}`;

      // Ask permission (Android only)
      if (Platform.OS === 'android' && Platform.Version < 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied!', 'Storage access is required to save the document.');
          return;
        }
      }

      const result = await RNFS.downloadFile({
        fromUrl: url,
        toFile: downloadPath,
        connectionTimeout: 15000,
        readTimeout: 15000,
      }).promise;

      if (result.statusCode === 200) {
        Alert.alert('Download Complete', `Saved to: Downloads/${fileName}`);
      } else {
        Alert.alert('Download Failed', `Status Code: ${result.statusCode}\n\nHint: Check if your Metro bundler is running.`);
      }
    } catch (error) {
      console.log('PDF Download Error Detail:', error);
      Alert.alert('Error', 'An error occurred while saving the file. Check the console for logs.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowIcon color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>transaction Detail</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* White Card Section */}
        <View style={styles.whiteCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.amountLabel}>AMOUNT</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>PAYMENT SUCCESSFUL</Text>
            </View>
          </View>

          <View style={styles.amountContainer}>
            <IndianRupee size={28} color="#1a1a1a" strokeWidth={3} style={{ marginTop: -2 }} />
            <Text style={styles.amountValue}>{transaction?.amount?.toLocaleString('en-IN') || '8,400'}</Text>
          </View>

          <View style={styles.cardDivider} />

          {/* Timeline */}
          <View style={styles.timelineContainer}>
            {/* Step 1 */}
            <View style={styles.timelineRow}>
              <View style={styles.timelineLeftColumn}>
                <View style={styles.dot} />
                <View style={styles.vLine} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>payment initiated</Text>
                <Text style={styles.timelineSub}>paid using credit card</Text>
              </View>
              <Text style={styles.timelineTime}>{transaction?.TransactionDate}</Text>
            </View>

            {/* Step 2 */}
            <View style={styles.timelineRow}>
              <View style={styles.timelineLeftColumn}>
                <View style={styles.pulsingDotWrapper}>
                  <View style={styles.pulsingDot} />
                  <View style={styles.innerDot} />
                </View>
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>bank confirmation</Text>
                <Text style={styles.timelineSub}>
                  {`amount deposited to ${transaction?.AmountDepositedToUpiId}`}
                </Text>
              </View>
              <Text style={styles.timelineTime}>{transaction?.BankConfirmationDate}{transaction?.BankConfirmationTime}</Text>
            </View>
          </View>
        </View>

        {/* Tutor Name Section */}
        <View style={styles.tutorSection}>
          <Text style={styles.tutorLabel}>tutor name</Text>
          <Text style={styles.tutorName}>{transaction?.TutorName?.toUpperCase() || 'KAUSHALYA WO TARSEEM CHAND'}</Text>
        </View>

        {/* Action Buttons & Details */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.downloadBtn}
            onPress={() => setShowDownloadModal(true)}
          >
            <Text style={styles.downloadBtnText}>Download documents</Text>
          </TouchableOpacity>

          <View style={styles.paymentMethodSection}>
            <Text style={styles.fieldLabel}>paid through credit card</Text>
            <View style={styles.bankRow}>
              <View style={styles.bankLogoWrap}>
                <Image
                  source={require('../assets/images/sbilogo.png')}
                  style={styles.bankLogo}
                  resizeMode="contain"
                />
              </View>
              <View>
                <Text style={styles.bankName}>SBI</Text>
                <Text style={styles.cardNumber}>XXXX-XXXX-XXXX-2030</Text>
              </View>
            </View>
          </View>

          <LabelValue
            label="order id"
            value="01KCTWFPY4A31ZKFMAHEHZ3JR3-4480672"
            isBold
          />

          <LabelValue
            label="utr"
            value={transaction.Utr}
            isBold
          />

          <LabelValue
            label="total amount paid"
            value={
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IndianRupee size={14} color="#fff" strokeWidth={3} />
                <Text style={[styles.fieldValue, styles.fieldValueBold]}>
                  {(transaction?.TransactionAmount || 8631).toLocaleString('en-IN')}
                </Text>
              </View>
            }
            isBold
          />

          <View style={styles.bottomDivider} />

          {/* Support Section */}
          <View style={styles.supportSection}>
            <Text style={styles.supportTitle}>still having trouble?</Text>
            <Text style={styles.supportSub}>our customer support should be able to help you out with all your queries</Text>
            <TouchableOpacity style={styles.contactBtn} onPress={() => navigation.navigate('CredSupport', { Item: transaction })}>
              <Text style={styles.contactBtnText}>Contact support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Download Documents Modal */}
      <Modal
        visible={showDownloadModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDownloadModal(false)}
        statusBarTranslucent={true}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setShowDownloadModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>select the document you{"\n"}want to download</Text>

              <TouchableOpacity
                style={styles.documentItem}
                onPress={() => {
                  setShowDownloadModal(false);
                  downloadPDF(transaction?.pdf);
                }}
              >
                <Text style={styles.documentItemText}>education receipt</Text>
                <View style={styles.documentIconContainer}>
                  <FileDown size={18} color="#888" strokeWidth={1.5} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.documentItem}
                onPress={() => {
                  setShowDownloadModal(false);
                  downloadPDF(transaction?.pdf);
                }}
              >
                <Text style={styles.documentItemText}>tax invoice</Text>
                <View style={styles.documentIconContainer}>
                  <FileDown size={18} color="#888" strokeWidth={1.5} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>

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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backBtn: {
    padding: 8,
    marginRight: 15,
  },
  headerTitle: {
    color: '#fff',
    fontFamily: 'CirkaBold700',
    fontSize: 16,
    // letterSpacing: 0.5,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  whiteCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 2,
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  amountLabel: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'Poppins-Medium',
    letterSpacing: 1.2,
  },
  statusBadge: {
    backgroundColor: '#28B478',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 2,
  },
  statusBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  amountValue: {
    fontSize: 32,
    color: '#1a1a1a',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 4,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginBottom: 25,
  },
  timelineContainer: {
    paddingLeft: 5,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 0,
    minHeight: 80,
  },
  timelineLeftColumn: {
    alignItems: 'center',
    marginRight: 15,
    width: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#28B478',
    marginTop: 6,
  },
  vLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#28B478',
    marginVertical: 4,
  },
  pulsingDotWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#28B47833',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  pulsingDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#28B47866',
    position: 'absolute',
  },
  innerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#28B478',
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 16,
    color: '#1a1a1a',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 2,
  },
  timelineSub: {
    fontSize: 13,
    color: '#888',
    fontFamily: 'Poppins-Regular',
    lineHeight: 18,
  },
  timelineTime: {
    fontSize: 10,
    color: '#333',
    fontFamily: 'Poppins-Medium',
    marginTop: 6,
  },
  tutorSection: {
    paddingHorizontal: 25,
    marginTop: 40,
    marginBottom: 30,
  },
  tutorLabel: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Poppins-Medium',
    marginBottom: 8,
  },
  tutorName: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'CirkaBold700',
    letterSpacing: 0.5,
  },
  actionsContainer: {
    paddingHorizontal: 25,
  },
  downloadBtn: {
    borderWidth: 1,
    borderColor: '#555',
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginBottom: 40,
  },
  downloadBtnText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  paymentMethodSection: {
    marginBottom: 35,
  },
  bankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  bankLogoWrap: {
    width: 44,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  bankLogo: {
    width: 30,
    height: 30,
  },
  bankName: {
    color: '#888',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  cardNumber: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    marginTop: 2,
  },
  labelValueContainer: {
    marginBottom: 30,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Poppins-Medium',
    marginBottom: 6,
  },
  fieldValue: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  fieldValueBold: {
    fontFamily: 'Poppins-Bold',
  },
  fieldValueGray: {
    color: '#888',
  },
  bottomDivider: {
    height: 1,
    backgroundColor: '#222',
    marginVertical: 10,
  },
  supportSection: {
    marginTop: 30,
  },
  supportTitle: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    marginBottom: 6,
  },
  supportSub: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    lineHeight: 18,
    marginBottom: 20,
  },
  contactBtn: {
    borderWidth: 1,
    borderColor: '#555',
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  contactBtnText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
  },
  // Modal Styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  modalContent: {
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 25,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    marginBottom: 40,
    lineHeight: 30,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 2,
    marginBottom: 15,
    height: 75,
    paddingLeft: 20,
  },
  documentItemText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#999',
    letterSpacing: 0.2,
  },
  documentIconContainer: {
    width: 50,
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
  },
});
