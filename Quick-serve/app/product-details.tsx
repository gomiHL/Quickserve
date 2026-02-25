import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCart } from './context/CartContext';
import { ArrowLeft, ShoppingBag, Plus, Minus } from 'lucide-react-native';

export default function ProductDetails() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [unit, setUnit] = useState('حبة'); 
  const [qty, setQty] = useState(1);

  const units = ['حبة', 'كيلو (Kg)', 'غرام (g)', 'لتر (L)'];

  const handleAddToCart = () => {
    addToCart({
      id: params.id,
      name: params.name,
      price: params.price,
      img: params.img,
      unit: unit,
      quantity: qty
    });
    router.replace("/(tabs)"); 
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: params.img as string }} style={styles.headerImg} />
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}><ArrowLeft color="#fff" /></TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>{params.name}</Text>
        <Text style={styles.price}>{params.price}</Text>

        <Text style={styles.sectionTitle}>اختر الوحدة:</Text>
        <View style={styles.unitGrid}>
          {units.map((u) => (
            <TouchableOpacity key={u} style={[styles.unitBtn, unit === u && styles.unitActive]} onPress={() => setUnit(u)}>
              <Text style={[styles.unitText, unit === u && styles.unitTextActive]}>{u}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.qtyRow}>
          <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))} style={styles.qtyBtn}><Minus size={20} /></TouchableOpacity>
          <Text style={styles.qtyValue}>{qty}</Text>
          <TouchableOpacity onPress={() => setQty(qty + 1)} style={styles.qtyBtn}><Plus size={20} /></TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
          <ShoppingBag color="#fff" />
          <Text style={styles.addBtnText}>إضافة {qty} {unit} للسلة</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerImg: { width: '100%', height: 300 },
  backBtn: { position: 'absolute', top: 50, left: 20, backgroundColor: 'rgba(0,0,0,0.3)', padding: 10, borderRadius: 12 },
  content: { padding: 25, marginTop: -30, backgroundColor: '#fff', borderTopLeftRadius: 35, borderTopRightRadius: 35 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'right' },
  price: { fontSize: 20, color: '#4CAF50', fontWeight: 'bold', textAlign: 'right', marginVertical: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'right', marginTop: 10 },
  unitGrid: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 10, marginTop: 10 },
  unitBtn: { padding: 10, borderRadius: 12, borderWidth: 1, borderColor: '#eee' },
  unitActive: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
  unitTextActive: { color: '#fff' },
  qtyRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30, gap: 20 },
  qtyBtn: { backgroundColor: '#f0f0f0', padding: 10, borderRadius: 10 },
  qtyValue: { fontSize: 20, fontWeight: 'bold' },
  addBtn: { backgroundColor: '#4CAF50', flexDirection: 'row', justifyContent: 'center', padding: 18, borderRadius: 20, marginTop: 30, gap: 10 },
  addBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});