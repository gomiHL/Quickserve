import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { useCart } from './context/CartContext';
import { Trash2, ArrowRight, MessageCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function CartScreen() {
  const { cart, removeFromCart } = useCart();
  const router = useRouter();

  const parsePrice = (p: string) => parseFloat(p.replace(' DH', '')) || 0;
  const total = cart.reduce((s, i) => s + (parsePrice(i.price) * i.quantity), 0);

  const sendOrder = () => {
    let msg = `*طلب جديد* 🛒\n\n`;
    cart.forEach(i => msg += `- ${i.name}: ${i.quantity} ${i.unit} (${parsePrice(i.price) * i.quantity} DH)\n`);
    msg += `\n*المجموع: ${total} DH*`;
    Linking.openURL(`whatsapp://send?phone=+212600000000&text=${encodeURIComponent(msg)}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><ArrowRight color="#333" /></TouchableOpacity>
        <Text style={styles.headerTitle}>سلة المشتريات</Text>
      </View>

      <FlatList
        data={cart}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.img }} style={styles.img} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.info}>{item.quantity} x {item.unit}</Text>
              <Text style={styles.p}>{parsePrice(item.price) * item.quantity} DH</Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}><Trash2 color="red" size={20} /></TouchableOpacity>
          </View>
        )}
      />

      {cart.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>المجموع: {total} DH</Text>
          <TouchableOpacity style={styles.btn} onPress={sendOrder}>
            <MessageCircle color="#fff" />
            <Text style={styles.btnText}>تأكيد عبر واتساب</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  header: { flexDirection: 'row-reverse', justifyContent: 'space-between', padding: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  item: { flexDirection: 'row-reverse', padding: 15, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' },
  img: { width: 60, height: 60, borderRadius: 10 },
  details: { flex: 1, marginRight: 15, alignItems: 'flex-end' },
  name: { fontWeight: 'bold' },
  info: { color: '#888' },
  p: { color: '#4CAF50', fontWeight: 'bold' },
  footer: { padding: 20, borderTopWidth: 1, borderColor: '#eee' },
  totalText: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  btn: { backgroundColor: '#25D366', flexDirection: 'row', justifyContent: 'center', padding: 15, borderRadius: 15, gap: 10 },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});