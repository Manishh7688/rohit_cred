import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { ArrowLeft, IndianRupee } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowIcon from '../components/ArrowIcon';

const CredSupportScreen = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  const { Item } = route.params;

  const ChatBubble = ({ text, time }: { text: string | React.ReactNode; time: string }) => (
    <View style={styles.messageWrapper}>
      <View style={styles.bubbleContainer}>
        {/* Triangle Tail */}
        <View style={styles.tailContainer}>
          <View style={styles.tailBase} />
        </View>

        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>{text}</Text>
        </View>
      </View>
      <Text style={styles.supportTimeText}>{time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ArrowIcon color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CRED support</Text>
      </View>

      <ScrollView
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        <ChatBubble
          text={
            <Text>
              Shivam, your payment of <IndianRupee size={12} color="#333" strokeWidth={3} />
              <Text>{Item?.TransactionAmount}</Text> has been successfully deposited to your recipient's account on {Item?.TransactionDate} with the UTR number as {Item?.UtrNumber}
            </Text>
          }
          time={`SUPPORT • ${Item?.BankConfirmationTime}`}
        />

        <ChatBubble
          text={
            <Text>
              we recommend you share the above UTR number with your recipient so that they can find your transaction in their bank statement
              {"\n\n"}
              the payment will reflect by the name of{" "}
              <Text style={{ fontFamily: 'Poppins-Bold' }}>"CRED"</Text> or{" "}
              <Text style={{ fontFamily: 'Poppins-Bold' }}>"DREAMPLUG"</Text> in your recipient's bank account
            </Text>
          }
          time={`SUPPORT • ${Item?.BankConfirmationTime}`}
        />
        {/* Quick Actions Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <Text style={styles.actionButtonText}>Payment is not reflecting</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonSmall} activeOpacity={0.8}>
            <Text style={styles.actionButtonText}>Okay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

export default CredSupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  backButton: {
    padding: 4,
    marginRight: 20,
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#000',
    letterSpacing: -0.2,
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  messageWrapper: {
    marginBottom: 35,
  },
  bubbleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tailContainer: {
    width: 10,
    height: 10,
    marginTop: 12,
    marginRight: -1, // Overlap with bubble border
    zIndex: 1,
  },
  tailBase: {
    width: 12,
    height: 12,
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    transform: [{ rotate: '45deg' }],
    marginLeft: 4,
  },
  bubble: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 18,
    maxWidth: '92%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  bubbleText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    lineHeight: 22,
  },
  supportTimeText: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#bbb',
    marginTop: 10,
    marginLeft: 2,
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    // paddingHorizontal: 20,
    paddingBottom: 30,
    // paddingTop: 10,
    justifyContent: 'flex-start'
  },
  actionButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonSmall: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
});
