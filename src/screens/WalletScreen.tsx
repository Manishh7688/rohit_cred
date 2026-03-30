import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const WalletScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.title}>Wallet</Text>
        
        {/* Balance Card */}
        <LinearGradient colors={['#111', '#222']} style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>₹3,50,000</Text>
          <TouchableOpacity style={styles.addMoneyBtn}>
            <Text style={styles.addMoneyText}>Add Money</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Recent Transactions */}
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        
        <View style={styles.transaction}>
          <View style={styles.transactionIcon}><Text style={styles.emoji}>🏦</Text></View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>HDFC Bank Transfer</Text>
            <Text style={styles.transactionSub}>Received from ****2278</Text>
          </View>
          <Text style={styles.transactionAmount}>+ ₹10,000</Text>
        </View>

        <View style={styles.transaction}>
          <View style={styles.transactionIcon}><Text style={styles.emoji}>🎁</Text></View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>Daily Reward</Text>
            <Text style={styles.transactionSub}>Claim reward</Text>
          </View>
          <Text style={styles.transactionAmount}>+ ₹500</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    color: '#fff',
  },
  balanceCard: {
    margin: 20,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 10,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addMoneyBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  addMoneyText: {
    color: '#000',
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#fff',
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: '#111',
    borderRadius: 15,
    marginBottom: 10,
  },
  transactionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  emoji: { fontSize: 24 },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  transactionSub: {
    color: '#ccc',
    fontSize: 14,
  },
  transactionAmount: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
});

export default WalletScreen;
