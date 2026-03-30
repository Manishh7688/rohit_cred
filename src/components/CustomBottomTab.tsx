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
              return <Image source={require('../assets/images/home1.png')} style={{ width: 36, height: 36 }} />;
            case 'Cards':
              return <CreditCard color={color} size={size} strokeWidth={focused ? 2.5 : 2} />;
            case 'UPI':
              // Center oversized button handled differently below
              return null;
            case 'Rewards':
              return <Star color={color} size={size} strokeWidth={focused ? 2.5 : 2} />;
            case 'More':
              return <LayoutGrid color={color} size={size} strokeWidth={focused ? 2.5 : 2} />;
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
                  <LinearGradient
                    colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.05)', 'transparent']}
                    style={styles.glowInner}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                  >
                    <View style={styles.centerButton}>
                      <Text style={styles.upiText}>UPI</Text>
                      <ChevronRight color="#fff" size={14} style={{ marginLeft: 2 }} strokeWidth={3} />
                    </View>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
              {/* No label under UPI usually, or just leave it empty if there is none. In the screenshot, there is no label for UPI below the circle. */}
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
    fontSize: 10,
    fontFamily: 'CirkaBold700',
    letterSpacing: 0.5,
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
    borderRadius: 40,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 15,
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
  upiText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    fontStyle: 'italic',
    letterSpacing: 1,
  },
});