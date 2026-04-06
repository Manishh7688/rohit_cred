import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  FlatList,
  Animated,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import ArrowIcon from '../components/ArrowIcon';

const { width } = Dimensions.get('window');

interface Message {
  id: string;
  text: string;
  sender: 'support' | 'you';
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'please choose an option below, Shivam',
    sender: 'support',
    timestamp: '12:46 PM',
  },
];

const INITIAL_OPTIONS = [
  'WhatsApp notifications',
  'Instant refund account',
  'Other account issues',
  'Talk to us',
  'Bank offers',
];

const AutomatedChatScreen: React.FC = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [options, setOptions] = useState<string[]>(INITIAL_OPTIONS);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const addSupportMessage = (text: string, newOptions: string[] = []) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: 'support',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, newMessage]);
      setOptions(newOptions);
      setIsTyping(false);
    }, 1000);
  };

  const handleOptionSelect = (option: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      text: option,
      sender: 'you',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setOptions([]);

    // Automated Logic
    if (option === 'Talk to us') {
      addSupportMessage('please choose an option below', [
        'Reward Related Issue',
        'I have other issues',
      ]);
    } else if (option === 'I have other issues') {
      addSupportMessage(
        'please elaborate on your query / concern and mention the CRED product you seek assistance with.',
        ['one transaction is not reflecting in transaction history.']
      );
    } else if (option === 'one transaction is not reflecting in transaction history.') {
      addSupportMessage('please check your transaction details below.', [
        'view transactions',
        'no, this is not helpful',
      ]);
    } else {
      // Default fallback for other options
      addSupportMessage('we are looking into your request. please wait...', []);
    }
  };

  const renderBubble = ({ item }: { item: Message }) => {
    const isSupport = item.sender === 'support';
    return (
      <View style={[styles.messageWrapper, isSupport ? styles.supportAlign : styles.youAlign]}>
        <View style={styles.bubbleRow}>
          {isSupport && (
            <View style={styles.tailContainer}>
              <View style={styles.supportTailBase} />
            </View>
          )}
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>{item.text}</Text>
          </View>
          {!isSupport && (
            <View style={styles.tailContainer}>
              <View style={styles.youTailBase} />
            </View>
          )}
        </View>
        <Text style={[styles.timestamp, isSupport ? styles.supportTimeAlign : styles.youTimeAlign]}>
          {isSupport ? 'SUPPORT' : 'YOU'} • {item.timestamp}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowIcon width={28} height={12} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CRED support</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderBubble}
        contentContainerStyle={styles.chatList}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        ListFooterComponent={
          <>
            {isTyping && (
              <View style={[styles.messageWrapper, styles.supportAlign]}>
                 <Text style={styles.typingText}>Support is typing...</Text>
              </View>
            )}
            <View style={styles.optionsWrap}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionPill}
                  onPress={() => handleOptionSelect(option)}
                >
                  <ImageBackground 
                    source={require('../assets/images/ww.jpeg')} 
                    style={styles.pillBg}
                    imageStyle={{ opacity: 0.05, resizeMode: 'repeat' }}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  backButton: {
    marginRight: 20,
  },
  headerTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#000',
    letterSpacing: -0.2,
  },
  chatList: {
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 100,
  },
  messageWrapper: {
    marginBottom: 35,
  },
  supportAlign: {
    alignSelf: 'flex-start',
  },
  youAlign: {
    alignSelf: 'flex-end',
  },
  bubbleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tailContainer: {
    width: 6,
    height: 10,
    marginTop: 10, // Point starts slightly from the top
    zIndex: 1,
  },
  supportTailBase: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    transform: [{ rotate: '45deg' }],
    marginLeft: 3,
  },
  youTailBase: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
    transform: [{ rotate: '45deg' }],
    marginRight: 3,
    marginLeft: -6,
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 2, // Sharp rectangle look
    maxWidth: '90%',
  },
  bubbleText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#bbb',
    marginTop: 10,
    letterSpacing: 0.5,
  },
  supportTimeAlign: {
    marginLeft: 10,
  },
  youTimeAlign: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  optionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
    gap: 12,
  },
  optionPill: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  pillBg: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#111',
  },
  typingText: {
    fontSize: 10,
    fontFamily: 'Poppins-Italic',
    color: '#999',
    marginLeft: 10,
  }
});

export default AutomatedChatScreen;
