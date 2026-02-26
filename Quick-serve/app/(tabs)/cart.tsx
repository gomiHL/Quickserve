import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // أيقونات التحكم والمسح
import { useCart } from '../context/CartContext'; 
import { calculateOrder } from '../../utils/orderCalculator';
import { OrderSummary } from '../../components/OrderSummary';

export default function CartScreen() {
  const { items, getTotalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  // 1. الحسابات الأساسية
  const basketTotal = getTotalPrice() || 0;
  const distance = 3.5; 
  const breakdown = calculateOrder(basketTotal, distance);

  // 2. دالة تأكيد الطلب
  const handleCheckout = async () => {
    if (items.length === 0) {
      Alert.alert("السلة فارغة", "ضيف شي حاجة للسلة قبل ما تطلب.");
      return;
    }

    Alert.alert(
      "تأكيد الطلب",
      `المجموع النهائي هو ${breakdown.finalTotal.toFixed(2)} درهم. واش بغيتي تأكد الطلب؟`,
      [
        { text: "إلغاء", style: "cancel" },
        { 
          text: "تأكيد", 
          onPress: async () => {
            setLoading(true);
            // محاكاة الإرسال
            setTimeout(() => {
              setLoading(false);
              Alert.alert("نجاح!", "طلبك داز بنجاح.");
              clearCart(); 
            }, 1500);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen options={{ 
        title: 'سلة المشتريات', 
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: '#fff' }
      }} />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>السلة ديالك خاوية حالياً 🛒</Text>
          </View>
        ) : (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>الطلبيات</Text>
            
            {items.map((item: any, index: number) => {
              const price = parseFloat(item.price) || 0;
              const qty = item.quantity || 1;
              return (
                <View key={index} style={styles.itemRow}>
                  {/* زر حذف المنتج نهائياً */}
                  <TouchableOpacity 
                    onPress={() => removeFromCart(item.id)} 
                    style={styles.deleteBtn}
                  >
                    <Ionicons name="trash-outline" size={22} color="#FF4757" />
                  </TouchableOpacity>

                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    
                    {/* أزرار التحكم في الكمية */}
                    <View style={styles.quantityActions}>
                      <TouchableOpacity 
                        onPress={() => updateQuantity(item.id, 'plus')} 
                        style={styles.actionBtn}
                      >
                        <Text style={styles.actionText}>+</Text>
                      </TouchableOpacity>
                      
                      <Text style={styles.qtyText}>{qty}</Text>
                      
                      <TouchableOpacity 
                        onPress={() => updateQuantity(item.id, 'minus')} 
                        style={styles.actionBtn}
                      >
                        <Text style={styles.actionText}>-</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={styles.itemPrice}>{(price * qty).toFixed(2)} درهم</Text>
                </View>
              );
            })}

            <View style={styles.divider} />
            <OrderSummary breakdown={breakdown} basketTotal={basketTotal} />
          </View>
        )}
      </ScrollView>

      {/* زر تأكيد الطلب */}
      {items.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.checkoutButton, loading && { opacity: 0.7 }]} 
            onPress={handleCheckout}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                 تأكيد الطلب - {breakdown.finalTotal.toFixed(2)} درهم
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { flex: 1 },
  content: { paddingBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', margin: 16, textAlign: 'right', color: '#333' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 150 },
  emptyText: { fontSize: 16, color: '#999' },
  itemRow: { 
    flexDirection: 'row-reverse', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 16, 
    borderBottomWidth: 1, 
    borderColor: '#f9f9f9' 
  },
  itemDetails: { alignItems: 'flex-end', flex: 1, marginRight: 15 },
  itemName: { fontSize: 16, fontWeight: '600', color: '#2D3436' },
  itemPrice: { fontSize: 15, fontWeight: 'bold', color: '#2D3436', minWidth: 80, textAlign: 'left' },
  
  // تنسيق أزرار الكمية
  quantityActions: { 
    flexDirection: 'row-reverse', 
    alignItems: 'center', 
    marginTop: 10,
    backgroundColor: '#F1F2F6',
    borderRadius: 8,
    padding: 3
  },
  actionBtn: { 
    width: 30, 
    height: 30, 
    backgroundColor: '#fff', 
    borderRadius: 6, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 2
  },
  actionText: { fontSize: 20, fontWeight: 'bold', color: '#FF4500' },
  qtyText: { marginHorizontal: 15, fontSize: 16, fontWeight: 'bold' },
  
  // زر الحذف
  deleteBtn: { padding: 10, backgroundColor: '#FFF0F0', borderRadius: 12 },
  
  divider: { height: 10, backgroundColor: '#F1F2F6', marginVertical: 10 },
  footer: { padding: 20, borderTopWidth: 1, borderColor: '#F1F2F6' },
  checkoutButton: { 
    backgroundColor: '#FF4500', 
    padding: 18, 
    borderRadius: 15, 
    alignItems: 'center',
    elevation: 8,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});