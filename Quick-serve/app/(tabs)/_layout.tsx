import React from 'react';
import { Tabs } from 'expo-router';
import { Home, ShoppingBasket, ShoppingCart, UserCog } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#FF7043',
      tabBarInactiveTintColor: '#888',
      tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
      tabBarStyle: { height: 65, paddingBottom: 10 },
      headerShown: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'الرئيسية',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          tabBarLabel: 'السوق',
          tabBarIcon: ({ color }) => <ShoppingBasket size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarLabel: 'السلة',
          tabBarIcon: ({ color }) => <ShoppingCart size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'حسابي',
          tabBarIcon: ({ color }) => <UserCog size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}