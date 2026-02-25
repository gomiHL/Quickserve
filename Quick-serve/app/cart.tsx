import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { useCart } from './context/CartContext';
import { Trash2, ArrowRight, MessageCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

// 1. تغيير طريقة الاستيراد لتجنب مشاكل الـ Types
import { FlashList as OriginalFlashList } from "@shopify/flash-list";
const FlashList = OriginalFlashList as any; 

export default function CartScreen() {
  const { cart, removeFromCart } = useCart();
  const router = useRouter();

  const parsePrice = (p: any) => {
    if (typeof p === 'number') return p;
    return parseFloat(p?.toString().replace(' DH', '')) || 0;
  };

  const total = cart.reduce((s, i) => s + (parsePrice(i.price) * (i.quantity || 1)), 0);

  const sendOrder = () => {
    let msg = `*طلب جديد من تطبيق QuickServe* 🛒\n\n`;
    cart.forEach(i => {
      msg += `• ${i.name}\n   الكمية: ${i.quantity} ${i.unit}\n   الثمن: ${parsePrice(i.price) * (i.quantity || 1)} DH\n\n`;
    });
    msg += `*المجموع الإجمالي: ${total} DH*`;
    Linking.openURL(`whatsapp://send?phone=+212600000000&text=${encodeURIComponent(msg)}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowRight color="#333" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>سلة المشتريات</Text>
      </View>

      <View style={{ flex: 1 }}>
        {/* دابا FlashList غتقبل أي حاجة بلا ما تعطي خطأ أحمر */}
        <FlashList
          data={cart}
          keyExtractor={(item: any, index: number) => item?.id?.toString() || index.toString()}
          estimatedItemSize={115} 
          renderItem={({ item }: any) => (
            <View style={styles.itemCard}>
              <Image source={{ uri: item.img }} style={styles.itemImg} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemMeta}>{item.quantity} x {item.unit}</Text>
                <Text style={styles.itemPrice}>{parsePrice(item.price) * (item.quantity || 1)} DH</Text>
              </View>
              <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.deleteBtn}>
                <Trash2 color="#FF5252" size={20} />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>السلة ديالك خاوية حالياً 🛒</Text>
              <TouchableOpacity onPress={() => router.push("/")} style={styles.shopBtn}>
                <Text style={styles.shopBtnText}>اكتشف المأكولات</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>

      {cart.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>المجموع الإجمالي:</Text>
            <Text style={styles.totalValue}>{total} DH</Text>
          </View>
          <TouchableOpacity style={styles.whatsappBtn} onPress={sendOrder}>
            <MessageCircle color="#fff" size={22} />
            <Text style={styles.whatsappBtnText}>تأكيد الطلب عبر واتساب</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// ... الـ styles بقات هي هي ...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', paddingTop: 50 },
  header: { flexDirection: 'row-reverse', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 20, alignItems: 'center' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  backBtn: { padding: 5 },
  itemCard: { flexDirection: 'row-reverse', backgroundColor: '#fff', marginHorizontal: 15, marginVertical: 8, padding: 12, borderRadius: 20, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3 },
  itemImg: { width: 75, height: 75, borderRadius: 15 },
  itemInfo: { flex: 1, marginRight: 15, alignItems: 'flex-end' },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  itemMeta: { color: '#888', fontSize: 13, marginVertical: 4 },
  itemPrice: { color: '#4CAF50', fontWeight: 'bold', fontSize: 16 },
  deleteBtn: { padding: 10, backgroundColor: '#FFF5F5', borderRadius: 12 },
  footer: { padding: 25, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.1, shadowRadius: 5 },
  totalRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 20 },
  totalLabel: { fontSize: 16, color: '#666' },
  totalValue: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  whatsappBtn: { backgroundColor: '#25D366', flexDirection: 'row', justifyContent: 'center', padding: 18, borderRadius: 18, gap: 10, alignItems: 'center' },
  whatsappBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  emptyContainer: { alignItems: 'center', marginTop: 150 },
  emptyText: { fontSize: 18, color: '#999', marginBottom: 20 },
  shopBtn: { backgroundColor: '#4CAF50', paddingHorizontal: 25, paddingVertical: 12, borderRadius: 12 },
  shopBtnText: { color: '#fff', fontWeight: 'bold' }
});