import React, { useState } from 'react'; 
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCart } from './context/CartContext';
import { ArrowLeft, ShoppingBag, Plus, Minus } from 'lucide-react-native';

const THEME_COLOR = '#FF7043';

export default function ProductDetails() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [unit, setUnit] = useState('حبة'); 
  const [qty, setQty] = useState(1);

  const units = ['حبة', 'كيلو (Kg)', 'غرام (g)', 'لتر (L)'];

  const handleAddToCart = () => {
    addToCart({
      id: params.id as string,
      name: params.name as string,
      price: params.price as string,
      img: params.img as string,
      unit: unit,
      quantity: qty
    });
    router.replace("/(tabs)/cart");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* صورة المنتج */}
      <Image source={{ uri: params.img as string }} style={styles.headerImg} />
      
      {/* زر الرجوع */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <ArrowLeft color="#fff" size={24} />
      </TouchableOpacity>

      <View style={styles.content}>
        {/* معلومات المنتج */}
        <View style={styles.infoRow}>
            <Text style={styles.price}>{params.price}</Text>
            <Text style={styles.title}>{params.name}</Text>
        </View>

        <Text style={styles.sectionTitle}>اختر الوحدة:</Text>
        <View style={styles.unitGrid}>
          {units.map((u) => (
            <TouchableOpacity 
              key={u} 
              style={[styles.unitBtn, unit === u && styles.unitActive]} 
              onPress={() => setUnit(u)}
            >
              <Text style={[styles.unitText, unit === u && styles.unitTextActive]}>{u}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* التحكم في الكمية */}
        <View style={styles.qtyContainer}>
            <Text style={styles.sectionTitle}>الكمية:</Text>
            <View style={styles.qtyRow}>
              <TouchableOpacity onPress={() => setQty(qty + 1)} style={styles.qtyBtn}>
                <Plus size={20} color="#333" />
              </TouchableOpacity>
              
              <Text style={styles.qtyValue}>{qty}</Text>
              
              <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))} style={styles.qtyBtn}>
                <Minus size={20} color="#333" />
              </TouchableOpacity>
            </View>
        </View>

        {/* زر الإضافة للسلة */}
        <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
          <ShoppingBag color="#fff" size={22} />
          <Text style={styles.addBtnText}>إضافة {qty} {unit} للسلة</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerImg: { width: '100%', height: 350 },
  backBtn: { 
    position: 'absolute', 
    top: 50, 
    left: 20, 
    backgroundColor: 'rgba(0,0,0,0.3)', 
    padding: 10, 
    borderRadius: 15 
  },
  content: { 
    padding: 25, 
    marginTop: -35, 
    backgroundColor: '#fff', 
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  infoRow: { 
    flexDirection: 'row-reverse', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 20
  },
  title: { fontSize: 26, fontWeight: '800', color: '#222' },
  price: { fontSize: 22, color: THEME_COLOR, fontWeight: '900' },
  sectionTitle: { fontSize: 17, fontWeight: '700', textAlign: 'right', marginTop: 15, color: '#444' },
  unitGrid: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 10, marginTop: 15 },
  unitBtn: { 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 15, 
    borderWidth: 1, 
    borderColor: '#F0F0F0',
    backgroundColor: '#F9F9F9'
  },
  unitActive: { backgroundColor: THEME_COLOR, borderColor: THEME_COLOR },
  unitText: { fontSize: 15, color: '#666', fontWeight: '600' },
  unitTextActive: { color: '#fff' },
  qtyContainer: { marginTop: 30 },
  qtyRow: { 
    flexDirection: 'row-reverse', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 15, 
    gap: 30,
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 20
  },
  qtyBtn: { backgroundColor: '#fff', padding: 12, borderRadius: 15, elevation: 2 },
  qtyValue: { fontSize: 22, fontWeight: '900', color: '#222' },
  addBtn: { 
    backgroundColor: THEME_COLOR, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    padding: 20, 
    borderRadius: 22, 
    marginTop: 40, 
    gap: 12,
    elevation: 4
  },
  addBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});