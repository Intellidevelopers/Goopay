// components/BottomTabs.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon, { Icons } from '../components/Icons';
import * as Animatable from 'react-native-animatable';
import HomeScreen from '../screens/HomeScreen';
import Card from '../screens/Card';
import Transactions from '../screens/Transactions';
import Savings from '../screens/Savings';
import colors from './colors';

const TabArr = [
    { route: 'Home', label: 'Home', type: Icons.Feather, icon: 'home', component: HomeScreen, color: colors.primary, alphaClr: colors.white },
    { route: 'Card', label: 'Cards', type: Icons.MaterialCommunityIcons, icon: 'cards', component: Card, color: colors.primary, alphaClr: colors.white },
    { route: 'Account', label: 'Savings', type: Icons.MaterialIcons, icon: 'savings', component: Savings, color: colors.primary, alphaClr: colors.white },
  ];
  

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
      textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
    } else {
      viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
      textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { flex: focused ? 1 : 0.6 }]}
    >
      <View>
        <Animatable.View
          ref={viewRef}
          style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color, borderRadius: 16 }]}
        />
        <View style={[styles.btn, { backgroundColor: focused ? null : item.alphaClr }]}>
          <Icon type={item.type} name={item.icon} color={focused ? colors.white : colors.primary} />
          <Animatable.View ref={textViewRef}>
            {focused && (
              <Text style={styles.labelText}>
                {item.label}
              </Text>
            )}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function BottomTabs() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />,
              }}
            />
          );
        })}
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
  },
  labelText: {
    color: colors.white,
    paddingHorizontal: 8,
  },
  tabBarStyle: {
    height: 60,
    position: 'absolute',
    margin: 16,
    borderRadius: 16,
    backgroundColor: colors.white, // Add your preferred background color here
  },
});
