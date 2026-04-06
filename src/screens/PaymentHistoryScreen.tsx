import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { Shimmer } from '../components/Shimmer';
import {
  IndianRupee,
  ArrowLeft,
  Filter,
  ChevronDown,
  Headphones,
  CheckCircle2,
  XCircle,
  BookOpen,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowIcon from '../components/ArrowIcon';
import { MOCK_DATA } from '../utils/staticdata';

const { width, height } = Dimensions.get('window');

// Data Types
type Transaction = {
  id: string;
  vendor: string;
  amount: number;
  dateStr: string;
  monthGroup: string;
  status: 'COMPLETED' | 'FAILED';
  hasSupportAction?: boolean;
  completionTimeStr?: string;
  iconType?: string; // e.g., 'blinkit', 'hdfc', 'book'
};


const FILTER_TABS = [
  { id: 'category', label: 'category' },
  { id: 'status', label: 'status' },
  { id: 'payment_methods', label: 'payment methods' },
  { id: 'amount', label: 'amount' },
  { id: 'date_range', label: 'date range' },
];

const CATEGORY_OPTIONS = [
  'credit card payments',
  'bill payments',
  'rent payments',
  'education payments',
  'store orders',
  'travel bookings',
  'CRED flights',
  'CRED hotels',
  'loan repayments',
  'flash repayments',
  'cred pay transactions',
  'scan & pay',
  'pay contacts',
  'self transfer',
];

const PaymentHistoryScreen = () => {
  const navigation = useNavigation();

  // Screen States
  const [loading, setLoading] = useState(true);

  // Filter States
  const [modalVisible, setModalVisible] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState('category');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Filtered transactions computed from raw data and selected filters
  const transactions = React.useMemo(() => {
    if (selectedCategories.length === 0) return MOCK_DATA;

    return MOCK_DATA.filter((item: any) => {
      // Map category options to vendor patterns
      return selectedCategories.some(cat => {
        if (cat === 'education payments') return item.vendor === 'Education Fees Payment';
        if (cat === 'rent payments') return item.vendor === 'Rent Payment';
        // Add more category-to-vendor mappings as needed
        return false;
      });
    });
  }, [selectedCategories]);

  // Simulation of API load
  useEffect(() => {
    const loadInitial = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(loadInitial);
  }, []);

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories((prev) => prev.filter((c) => c !== cat));
    } else {
      setSelectedCategories((prev) => [...prev, cat]);
    }
  };

  const applyFilters = () => {
    setModalVisible(false);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
  };

  const InitialsIcon = ({ name }: { name: string }) => {
    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    return (
      <View style={[styles.vendorIcon, { backgroundColor: '#f9f9f9' }]}>
        <Text style={styles.initialsText}>{initials}</Text>
      </View>
    );
  };

  const renderIcon = (type: string | undefined, vendor: string) => {
    const source = (t: string) => {
      switch (t) {
        case 'zomato': return require('../assets/images/zomato.png');
        case 'zepto': return require('../assets/images/zepto.png');
        case 'blinkit': return require('../assets/images/blinkit.png');
        case 'rent': return require('../assets/images/ghar.jpeg');
        case 'hdfc': return require('../assets/images/hdfc.png');
        case 'urban': return require('../assets/images/urbancompany.webp');
        case 'mygate': return require('../assets/images/mm.jpeg');
        case 'education': return require('../assets/images/copy.jpeg');
        case 'card': return require('../assets/images/tokk.jpeg');
        case 'swiggy': return require('../assets/images/instamart.jpeg');

        default: return null;
      }
    };

    const iconSrc = type ? source(type) : null;

    if (iconSrc) {
      return (
        <View style={styles.vendorIcon}>
          <Image source={iconSrc} style={styles.vendorImage} resizeMode="contain" />
        </View>
      );
    }

    return <InitialsIcon name={vendor} />;
  };

  const renderItem = ({ item, index }: any) => {
    const isLastInMonth = index === transactions.length - 1 || transactions[index + 1].monthGroup !== item.monthGroup;
    const isFirstInMonth = index === 0 || transactions[index - 1].monthGroup !== item.monthGroup;

    return (
      <View>
        {isFirstInMonth && (
          <Text style={styles.monthHeader}>{item.monthGroup}</Text>
        )}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            console.log(item?.TransactionDate, '.........................')
            if (item.TransactionDate) {
              navigation.navigate('PaymentDetail', { transaction: item })
            } else {
              navigation.navigate('Education', { transaction: item })
            }
          }}
        >
          <View style={styles.transactionCard}>
            <View style={styles.cardLeft}>
              {renderIcon(item.iconType, item.vendor)}
              <View style={styles.cardContent}>
                <Text style={styles.vendorText}>{item.vendor}</Text>
                <View style={styles.statusRow}>
                  {item.status === 'FAILED' ? (
                    <XCircle size={16} color="#fff" fill="#F24534" />
                  ) : (
                    <CheckCircle2 size={16} color="#fff" fill="#388E3C" />
                  )}
                  <Text style={styles.dateText}>{item.dateStr}</Text>
                </View>
                {item.status === 'FAILED' && (
                  <View style={styles.failedBadge}>
                    <Text style={styles.failedText}>PAYMENT FAILED</Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.cardRight}>
              <View style={styles.amountContainer}>
                <IndianRupee size={10} color="#000" strokeWidth={3} style={{}} />
                <Text style={styles.amountText}>
                  {(() => {
                    const parts = item.amount.toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).split('.');
                    return (
                      <>
                        {parts[0]}
                        <Text style={styles.decimalText}>.{parts[1]}</Text>
                      </>
                    );
                  })()}
                </Text>
              </View>
              {item.status === 'FAILED' && (
                <TouchableOpacity style={styles.supportMiniBtn}>
                  <Headphones size={14} color="#666" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableOpacity>
        {isLastInMonth ? (
          <View style={styles.solidDivider} />
        ) : (
          <View style={styles.divider} />
        )}
      </View>
    );
  };

  const renderShimmers = () => {
    return (
      <View style={{ paddingHorizontal: 20 }}>
        {[1, 2, 3, 4].map((i) => (
          <View key={i} style={{ marginBottom: 30, marginTop: 15 }}>
            <Shimmer width={60} height={14} style={{ marginBottom: 15 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <Shimmer width={40} height={40} borderRadius={20} style={{ marginRight: 15 }} />
                <View>
                  <Shimmer width={150} height={14} style={{ marginBottom: 8 }} />
                  <Shimmer width={100} height={12} />
                </View>
              </View>
              <Shimmer width={80} height={14} />
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <ArrowIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>payment history</Text>
      </View>

      {/* Filters Strip */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterStrip}
        contentContainerStyle={{ paddingHorizontal: 20, alignItems: 'center' }}
      >
        <TouchableOpacity
          style={selectedCategories.length > 0 ? styles.filterPillActive : styles.filterPill}
          onPress={() => setModalVisible(true)}
        >
          {selectedCategories.length > 0 && (
            <View style={styles.filterCountBadge}>
              <Text style={styles.filterCountText}>{selectedCategories.length}</Text>
            </View>
          )}
          <Text style={selectedCategories.length > 0 ? styles.filterPillTextActive : styles.filterPillText}>FILTER</Text>
          <ChevronDown size={14} color={selectedCategories.length > 0 ? "#000" : "#999"} style={{ marginLeft: 4 }} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterPill} onPress={() => setModalVisible(true)}>
          <Text style={styles.filterPillText}>CATEGORY</Text>
          <ChevronDown size={14} color="#999" style={{ marginLeft: 4 }} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterPill} onPress={() => setModalVisible(true)}>
          <Text style={styles.filterPillText}>STATUS</Text>
          <ChevronDown size={14} color="#999" style={{ marginLeft: 4 }} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterPill} onPress={() => setModalVisible(true)}>
          <Text style={styles.filterPillText}>PAYMENT METHODS</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Main List */}
      {loading ? (
        renderShimmers()
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View style={styles.footerLogos}>
              <Image
                source={require('../assets/images/up.png')}
                style={styles.logosImage}
                resizeMode="contain"
              />
              <Image
                source={require('../assets/images/rupay.jpg')}
                style={styles.logosImage}
                resizeMode="contain"
              />
              <Image
                source={require('../assets/images/axis.png')}
                style={styles.logosImage}
                resizeMode="contain"
              />
              <Image
                source={require('../assets/images/yes.jpg')}
                style={styles.logosImage}
                resizeMode="contain"
              />
              <Image
                source={require('../assets/images/dream.jpg')}
                style={styles.logosImage}
                resizeMode="contain"
              />
            </View>
          }
        />
      )}

      {/* Bottom Modal Filter */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>filters</Text>
            </View>

            {/* Modal Body: Left Tab | Right Options */}
            <View style={styles.modalBody}>
              <View style={styles.modalLeftNav}>
                {FILTER_TABS.map((tab) => (
                  <TouchableOpacity
                    key={tab.id}
                    style={[
                      styles.modalTabItem,
                      activeFilterTab === tab.id && styles.modalTabItemActive,
                    ]}
                    onPress={() => setActiveFilterTab(tab.id)}
                  >
                    <Text
                      style={[
                        styles.modalTabText,
                        activeFilterTab === tab.id && styles.modalTabTextActive,
                      ]}
                    >
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.modalRightContent}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {activeFilterTab === 'category' &&
                    CATEGORY_OPTIONS.map((cat) => {
                      const isChecked = selectedCategories.includes(cat);
                      return (
                        <TouchableOpacity
                          key={cat}
                          style={styles.checkboxRow}
                          activeOpacity={0.7}
                          onPress={() => toggleCategory(cat)}
                        >
                          <Text style={styles.checkboxLabel}>{cat}</Text>
                          <View style={[styles.checkboxBox, isChecked && styles.checkboxBoxActive]}>
                            {isChecked && <Text style={styles.checkmarkIcon}>✓</Text>}
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                </ScrollView>
              </View>
            </View>

            {/* Modal Footer */}
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
                <Text style={styles.resetBtnText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
                <Text style={styles.applyBtnText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PaymentHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#111',
    marginLeft: 10,
    marginTop: 2,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  filterStrip: {
    minHeight: 50,
    maxHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#efefef',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 10,
    height: 36,
    backgroundColor: '#fff',
  },
  filterPillActive: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#efefef',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 10,
    height: 36,
  },
  filterPillText: {
    fontSize: 9,
    fontFamily: 'Poppins-Bold',
    color: '#999',
    letterSpacing: 1.2,
  },
  filterPillTextActive: {
    fontSize: 9,
    fontFamily: 'Poppins-Bold',
    color: '#222',
    letterSpacing: 1.2,
  },
  filterCountBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  filterCountText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
    lineHeight: 14,
  },
  monthHeader: {
    marginTop: 40,
    marginBottom: 15,
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
    color: '#999',
    letterSpacing: 2.2,
    textTransform: 'uppercase',
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingVertical: 10,
    alignItems: 'flex-start'

  },
  cardLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  vendorIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    overflow: 'hidden',
  },
  vendorImage: {
    width: '50%',
    height: '50%',
  },
  initialsText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#888',
  },
  cardContent: {
    flex: 1,
    paddingTop: 5,
  },
  vendorText: {
    fontSize: 11,
    fontFamily: 'Poppins-SemiBold',
    color: '#111',
    // lineHeight: 22,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  dateText: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#888',
    marginLeft: 6,
  },
  completionPill: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 2,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  completionText: {
    fontSize: 9,
    fontFamily: 'Poppins-Bold',
    color: '#388e3c',
    letterSpacing: 1,
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    minWidth: 90,
    paddingTop: 5,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 13,
    fontFamily: 'Gilroy-font',
    color: '#000',
    // fontWeight: '600',
    // marginLeft: 2,
  },
  decimalText: {
    color: '#000',
    fontFamily: 'Gilroy-Light',
  },
  failedBadge: {
    backgroundColor: '#fff5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#FFE0DD',
  },
  failedText: {
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
    color: '#F24534',
    letterSpacing: 0.5,
  },
  footerLogos: {
    paddingVertical: 1,
    alignItems: 'center',
    opacity: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    alignSelf: 'center'
    // gap: 10,
  },
  logosImage: {
    width: 20,
    height: 20,
    opacity: 0.9
  },
  supportMiniBtn: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginTop: 10,
  },
  divider: {
    height: 1,
    borderBottomWidth: 1,
    borderColor: '#efefef',
    borderStyle: 'dashed',
    marginVertical: 14,
  },
  solidDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 14,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: height * 0.85,
    overflow: 'hidden',
  },
  modalHeader: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#111',
  },
  modalBody: {
    flexDirection: 'row',
    flex: 1,
  },
  modalLeftNav: {
    width: '35%',
    backgroundColor: '#f5f5f5',
    paddingTop: 10,
  },
  modalTabItem: {
    paddingVertical: 15,
    paddingLeft: 25,
  },
  modalTabItemActive: {
    backgroundColor: '#fff',
  },
  modalTabText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#888',
  },
  modalTabTextActive: {
    color: '#111',
    fontFamily: 'Poppins-Bold',
  },
  modalRightContent: {
    width: '65%',
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 25,
    paddingTop: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  checkboxLabel: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#222',
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  checkboxBoxActive: {
    backgroundColor: '#fff',
  },
  checkmarkIcon: {
    color: '#000',
    fontSize: 12,
    fontWeight: '900',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  resetBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#111',
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: 'center',
    marginRight: 10,
  },
  resetBtnText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#111',
  },
  applyBtn: {
    flex: 1,
    backgroundColor: '#111',
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: 'center',
    marginLeft: 10,
  },
  applyBtnText: {
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
});
