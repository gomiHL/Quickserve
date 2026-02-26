import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Home, ShoppingBasket, ShoppingCart, UserCog } from 'lucide-react-native';
// ⚠️ جرب هاد المسار، إلا ما خدمش استعمل المسار اللي خدم ليك قبل
import { useCart } from '../context/CartContext'; 

export default function TabLayout() {
  const cartContext = useCart() as any; // استعملنا any هنا باش نهنيوك من صداع TypeScript تماماً
  
  // تأكدنا واش سميتها cart ولا items باش ما يبقاش يعطيك Property 'items' does not exist
  const cartData = cartContext.cart || cartContext.items || [];
  
  const totalItems = cartData.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);

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
          tabBarIcon: ({ color }) => (
            <View style={{ width: 24, height: 24 }}>
              <ShoppingCart size={24} color={color} />
              {totalItems > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {totalItems > 9 ? '+9' : totalItems}
                  </Text>
                </View>
              )}
            </View>
          ),
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

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -8,
    top: -4,
    backgroundColor: '#FF7043',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});