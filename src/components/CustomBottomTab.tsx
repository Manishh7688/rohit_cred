import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, Image } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Home, CreditCard, Star, LayoutGrid, ChevronRight } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const CustomBottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const renderIcon = (routeName: string, focused: boolean) => {
          const color = focused ? '#fff' : '#666';
          const size = 24;
          switch (routeName) {
            case 'Home':
              return <Image source={require('../assets/images/ss.png')} style={{ width: 20, height: 20 }} />;
            case 'Cards':
              return <Image source={require('../assets/images/wallet.png')} style={{ width: 20, height: 20 }} />;
            case 'UPI':
              // Center oversized button handled differently below
              return null;
            case 'Rewards':
              return <Image source={require('../assets/images/star.png')} style={{ width: 20, height: 20 }} />;
            case 'More':
              return <Image source={require('../assets/images/menu.png')} style={{ width: 20, height: 20 }} />;
            default:
              return <Home color={color} size={size} />;
          }
        };

        if (route.name === 'UPI') {
          return (
            <View key={route.key} style={styles.centerButtonWrapper}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={onPress}
                style={styles.centerButtonContainer}
              >
                <View style={styles.glowOuter}>
                  {/* <LinearGradient
                    colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.05)', 'transparent']}
                    style={styles.glowInner}
                  > */}
                  <Image source={require('../assets/images/mid.png')} style={{ width: 60, height: 60 }} />
                  {/* </LinearGradient> */}
                </View>
              </TouchableOpacity>
            </View>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              {renderIcon(route.name, isFocused)}
            </View>
            <Text
              style={[
                styles.label,
                { color: isFocused ? '#fff' : '#666' },
              ]}
            >
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomBottomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 85 : 100,
    backgroundColor: '#000',
    // borderTopWidth: 0.5,
    // borderColor: '#222',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  iconContainer: {
    marginBottom: 4,
    height: 30,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  label: {
    fontSize: 8,
    fontFamily: 'Poppins-Medium',
    // letterSpacing: 0.5,
    marginTop: 2,
  },
  centerButtonWrapper: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    position: 'relative',
  },
  centerButtonContainer: {
    top: 5, // Elevate above the tab bar
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowOuter: {
    width: 80,
    height: 80,
    // borderRadius: 40,
    // backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#333',
    // shadowColor: '#ffffff',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.6,
    // shadowRadius: 15,
    // elevation: 15,
  },
  glowInner: {
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  centerButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#222',
  },
  upiContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  upiText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    fontStyle: 'italic',
    letterSpacing: 2,
  },
  upiChevron: {
    transform: [{ translateX: -4 }],
  },
});