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
} from 'react-native';
import { Shimmer } from '../components/Shimmer';
import {
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

const { height } = Dimensions.get('window');

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

// Mock Data
const MOCK_DATA: Transaction[] = [
  {
    id: '1',
    vendor: 'Blinkit',
    amount: 1291.0,
    dateStr: '7th mar 7:24 am',
    monthGroup: "MAR '26",
    status: 'FAILED',
    hasSupportAction: true,
    iconType: 'blinkit',
  },
  {
    id: '2',
    vendor: 'HDFC MILLENNIA .. 3876',
    amount: 56541.0,
    dateStr: '2nd mar 6:49 pm',
    monthGroup: "MAR '26",
    status: 'COMPLETED',
    completionTimeStr: 'COMPLETED WITHIN 8 SECONDS',
    iconType: 'hdfc',
  },
  {
    id: '3',
    vendor: 'HDFC MILLENNIA .. 3876',
    amount: 12624.0,
    dateStr: '3rd feb 11:38 am',
    monthGroup: "FEB '26",
    status: 'COMPLETED',
    completionTimeStr: 'COMPLETED WITHIN 8 SECONDS',
    iconType: 'hdfc',
  },
  {
    id: '4',
    vendor: 'Education Fees Payment',
    amount: 27720.0,
    dateStr: '2nd feb 4:49 pm',
    monthGroup: "FEB '26",
    status: 'COMPLETED',
    iconType: 'book',
  },
  {
    id: '5',
    vendor: 'Education Fees Payment',
    amount: 5600.0,
    dateStr: '28th jan 3:56 pm',
    monthGroup: "JAN '26",
    status: 'COMPLETED',
    iconType: 'book',
  },
];

const MORE_MOCK_DATA: Transaction[] = [
  {
    id: '6',
    vendor: 'CRED RentPay',
    amount: 14000.0,
    dateStr: '15th jan 10:00 am',
    monthGroup: "JAN '26",
    status: 'COMPLETED',
    iconType: 'book',
  },
];

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
  const [fetchingMore, setFetchingMore] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadedAll, setLoadedAll] = useState(false);

  // Filter States
  const [modalVisible, setModalVisible] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState('category');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Simulation of API load
  useEffect(() => {
    const loadInitial = setTimeout(() => {
      setTransactions(MOCK_DATA);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(loadInitial);
  }, []);

  const fetchMoreData = () => {
    if (!fetchingMore && !loadedAll) {
      setFetchingMore(true);
      setTimeout(() => {
        setTransactions((prev) => [...prev, ...MORE_MOCK_DATA]);
        setFetchingMore(false);
        setLoadedAll(true);
      }, 1500);
    }
  };

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories((prev) => prev.filter((c) => c !== cat));
    } else {
      setSelectedCategories((prev) => [...prev, cat]);
    }
  };

  const applyFilters = () => {
    // Dummy apply logic: just close modal for UI demo
    setModalVisible(false);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
  };

  const renderIcon = (type: string | undefined) => {
    switch (type) {
      case 'blinkit':
        return (
          <View style={[styles.vendorIcon, { backgroundColor: '#FFEB3B' }]}>
            <Text style={{ fontSize: 8, fontWeight: '800', color: '#000' }}>blinkit</Text>
          </View>
        );
      case 'hdfc':
        return (
          <View style={styles.vendorIcon}>
            <View style={{ width: 16, height: 16, backgroundColor: '#c5112e' }} />
          </View>
        );
      case 'book':
        return (
          <View style={styles.vendorIcon}>
            <BookOpen size={18} color="#00695c" strokeWidth={1.5} />
          </View>
        );
      default:
        return <View style={styles.vendorIcon} />;
    }
  };

  const renderItem = ({ item, index }: { item: Transaction; index: number }) => {
    const showMonthHeader =
      index === 0 || transactions[index - 1].monthGroup !== item.monthGroup;

    return (
      <View>
        {showMonthHeader && (
          <Text style={styles.monthHeader}>{item.monthGroup}</Text>
        )}
        <View style={styles.transactionCard}>
          <View style={styles.cardLeft}>
            {renderIcon(item.iconType)}
            <View style={styles.cardContent}>
              <Text style={styles.vendorText}>{item.vendor}</Text>
              <View style={styles.statusRow}>
                {item.status === 'FAILED' ? (
                  <XCircle size={14} color="#D32F2F" fill="#FFEBEE" />
                ) : (
                  <CheckCircle2 size={14} color="#388E3C" fill="#E8F5E9" />
                )}
                <Text style={styles.dateText}>{item.dateStr}</Text>
              </View>
              {item.completionTimeStr && (
                <View style={styles.completionPill}>
                  <Text style={styles.completionText}>{item.completionTimeStr}</Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.cardRight}>
            <Text style={styles.amountText}>
              ₹
              {item.amount.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
            {item.hasSupportAction && (
              <TouchableOpacity style={styles.supportMiniBtn}>
                <Headphones size={14} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.divider} />
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
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#000"
        translucent={true}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <ArrowLeft size={24} color="#000" strokeWidth={1.5} />
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
        <TouchableOpacity style={styles.filterPillActive} onPress={() => setModalVisible(true)}>
          <Filter size={12} color="#000" style={{ marginRight: 6 }} />
          <Text style={styles.filterPillTextActive}>FILTER</Text>
          <ChevronDown size={14} color="#000" style={{ marginLeft: 4 }} />
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
          onEndReached={fetchMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            fetchingMore ? (
              <View style={{ alignSelf: 'center', marginVertical: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Shimmer width={40} height={40} borderRadius={20} style={{ marginRight: 15 }} />
                  <View>
                    <Shimmer width={150} height={14} style={{ marginBottom: 8 }} />
                    <Shimmer width={100} height={12} />
                  </View>
                </View>
              </View>
            ) : null
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
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#000',
    marginLeft: 15,
    marginTop: 2,
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
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    height: 32,
  },
  filterPillActive: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    height: 32,
  },
  filterPillText: {
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    color: '#999',
    letterSpacing: 1,
  },
  filterPillTextActive: {
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    color: '#222',
    letterSpacing: 1,
  },
  monthHeader: {
    marginTop: 35,
    marginBottom: 20,
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#999',
    letterSpacing: 2,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  cardLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  vendorIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  vendorText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#111',
    lineHeight: 20,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  dateText: {
    fontSize: 12,
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
  },
  amountText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#111',
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
    borderColor: '#f5f5f5',
    borderStyle: 'dashed',
    marginVertical: 10,
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
    fontSize: 14,
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
    fontSize: 14,
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
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
});
