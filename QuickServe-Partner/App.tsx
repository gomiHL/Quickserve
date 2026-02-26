import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// محاكاة البيانات
const MOCK_ORDERS = [
  {
    id: 'ORD-7721',
    customer: 'أحمد علي',
    items: [
      { name: 'برغر كلاسيك', quantity: 4, price: 25 },
      { name: 'طاكوس ميكست', quantity: 2, price: 35 }
    ],
    total: 186.50,
    status: 'pending',
    time: '03:45 AM'
  }
];

export default function App() { // ضروري يكون الاسم App هنا
  const [orders, setOrders] = useState(MOCK_ORDERS);

  const updateStatus = (orderId: string, newStatus: string) => {
    Alert.alert("تحديث الحالة", `واش بغيتي تبدل حالة الطلب لـ ${newStatus}؟`, [
      { text: "إلغاء", style: "cancel" },
      { text: "تأكيد", onPress: () => {
        setOrders(prev => prev.map(o => o.id === orderId ? {...o, status: newStatus} : o));
      }}
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>طلبات QuickServe 👨‍🍳</Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.orderId}>#{item.id}</Text>
              <Text style={styles.orderStatus}>{item.status === 'pending' ? 'جديد' : 'مقبول'}</Text>
              <Text style={styles.orderTime}>{item.time}</Text>
            </View>

            <Text style={styles.customerName}>الزبون: {item.customer}</Text>
            
            <View style={styles.itemsList}>
              {item.items.map((food, idx) => (
                <Text key={idx} style={styles.foodText}>
                   • {food.name} (x{food.quantity})
                </Text>
              ))}
            </View>

            <View style={styles.divider} />

            <View style={styles.footer}>
              <Text style={styles.totalPrice}>{item.total.toFixed(2)} درهم</Text>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={[styles.btn, styles.acceptBtn]} 
                  onPress={() => updateStatus(item.id, 'preparing')}
                >
                  <Text style={styles.btnText}>قبول ✅</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.btn, styles.rejectBtn]} 
                  onPress={() => updateStatus(item.id, 'rejected')}
                >
                  <Text style={styles.btnText}>رفض ❌</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F2F6' },
  header: { padding: 20, backgroundColor: '#fff', alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#2D3436' },
  orderCard: { backgroundColor: '#fff', margin: 12, borderRadius: 12, padding: 15, elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
  cardHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 10 },
  orderId: { fontWeight: 'bold', color: '#FF4500', fontSize: 16 },
  orderStatus: { backgroundColor: '#FFF3E0', color: '#E67E22', paddingHorizontal: 8, borderRadius: 5, fontSize: 12, overflow: 'hidden' },
  orderTime: { color: '#B2BEC3', fontSize: 12 },
  customerName: { textAlign: 'right', fontSize: 16, fontWeight: '700', color: '#2D3436', marginBottom: 10 },
  itemsList: { marginBottom: 10 },
  foodText: { textAlign: 'right', color: '#636E72', fontSize: 14, marginBottom: 5 },
  divider: { height: 1, backgroundColor: '#F1F2F6', marginVertical: 10 },
  footer: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
  totalPrice: { fontSize: 18, fontWeight: 'bold', color: '#2D3436' },
  actionButtons: { flexDirection: 'row' },
  btn: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginLeft: 10 },
  acceptBtn: { backgroundColor: '#00B894' },
  rejectBtn: { backgroundColor: '#D63031' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});