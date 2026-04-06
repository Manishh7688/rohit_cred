import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  Pressable,
} from 'react-native';
import { ArrowLeft, IndianRupee, ThumbsUp, ThumbsDown } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowIcon from '../components/ArrowIcon';

const CredSupportScreen = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  const { Item } = route.params;
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showPaymentNotReflectingModal, setShowPaymentNotReflectingModal] = useState(false);

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
            <Text style={{ fontSize: 11, fontFamily: 'Gilroy-Medium' }}>
              Shivam, your payment of <IndianRupee size={8} color="#999" strokeWidth={3} />
              <Text>{Item?.TransactionAmount.toLocaleString('en-IN')}</Text> has been successfully deposited to your recipient's account on {Item?.BankConfirmationTime}, {Item?.Both} with the{'\n'}UTR number as {Item?.UtrNumber}
            </Text>
          }
          time={`SUPPORT • ${new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}`}
        />

        <ChatBubble
          text={
            <Text style={{ fontSize: 11, fontFamily: 'Gilroy-Medium' }}>
              we recommend you share the above UTR number with your recipient so that they can find your transaction in their bank{'\n'}statement
              {"\n\n"}
              the payment will reflect by the name of{"\n"}
              <Text style={{ fontFamily: 'Poppins-Bold' }}>"CRED"</Text> or{" "}
              <Text style={{ fontFamily: 'Poppins-Bold' }}>"DREAMPLUG"</Text> in your recipient's{'\n'}bank account
            </Text>
          }
          time={`SUPPORT • ${new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}`}
        />

        {/* Quick Actions Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8} onPress={() => setShowPaymentNotReflectingModal(true)} >
            <Text style={styles.actionButtonText}>Payment is not reflecting</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButtonSmall}
            activeOpacity={0.8}
            onPress={() => setShowHelpModal(true)}
          >
            <Text style={styles.actionButtonText}>Okay</Text>
          </TouchableOpacity>
        </View>
        {
          showPaymentNotReflectingModal && (
            <ChatBubble
              text={
                <Text style={{ fontSize: 11 }}>
                  we are sorry to hear that.
                  {"\n"}
                  please try again in sometime {" "}
                </Text>
              }
              time={`SUPPORT • ${new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}`}
            />
          )
        }
      </ScrollView>

      {/* Feedback Modal */}
      <Modal
        visible={showHelpModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowHelpModal(false)}
        statusBarTranslucent={true}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setShowHelpModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>was it helpful?</Text>
              <Text style={styles.modalSubtitle}>your feedback will help us to serve you better</Text>

              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.feedbackButton}
                  onPress={() => setShowHelpModal(false)}
                >
                  <ThumbsUp size={18} color="#000" strokeWidth={2.5} />
                  <Text style={styles.feedbackButtonText}>YES</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.feedbackButton}
                  onPress={() => setShowHelpModal(false)}
                >
                  <ThumbsDown size={18} color="#000" strokeWidth={2.5} />
                  <Text style={styles.feedbackButtonText}>NO</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>

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
    fontFamily: 'Gilroy-Medium',
    color: '#bbb',
    marginTop: 10,
    marginLeft: 10,
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
    fontSize: 11,
    fontFamily: 'Gilroy-Medium',
    color: '#333',
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
    paddingTop: 30,
    paddingBottom: 50,
    paddingHorizontal: 25,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 13,
    fontFamily: 'cirkaRegular300',
    color: '#888',
    marginBottom: 30,
    letterSpacing: -0.2,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 2,
    width: '48%',
    height: 80,
  },
  feedbackButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#000',
    marginLeft: 10,
    letterSpacing: 1,
  },
});
