import React from 'react';
import { View, Text, ScrollView, TextInput, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Search, MapPin, Bell, Star, Clock, Filter, RotateCcw, Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
// ✅ تأكد أن المسار هو ../context/CartContext لأن index.tsx كاين فـ app/(tabs)
import { useCart } from '../context/CartContext'; 

const THEME_COLOR = '#FF7043';
const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { addToCart } = useCart() as any;

  const BEST_SELLERS = [
    { id: '101', name: 'طاكوس ميكست', price: '35 DH', img: 'https://images.unsplash.com/photo-1582234372483-421741573385?q=80&w=300' },
    { id: '102', name: 'برغر كلاسيك', price: '25 DH', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300' }
  ];

  const CATEGORIES = [
    { n: 'أكل', i: '🍔' }, { n: 'مشروبات', i: '🥤' }, { n: 'صيدلة', i: '💊' }, { n: 'بقالة', i: '🛒' },
    { n: 'مخبزة', i: '🍞' }, { n: 'تجميل', i: '💄' }, { n: 'باتسري', i: '🍰' }, { n: 'ماركت', i: '⚡' }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* --- Header --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconCircle}>
          <Bell size={22} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationContainer}>
          <Text style={styles.locationText}>تيفلت، حي الأندلس</Text>
          <MapPin size={18} color={THEME_COLOR} />
        </TouchableOpacity>
      </View>

      {/* --- Search & Filter --- */}
      <View style={styles.searchSection}>
        <TouchableOpacity style={styles.filterBtn}>
          <Filter size={20} color="#fff" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Search size={20} color="#999" />
          <TextInput 
            placeholder="قلب على اللي بغيتي..." 
            style={styles.searchInput} 
            textAlign="right" 
          />
        </View>
      </View>

      {/* --- Banners --- */}
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
        <View style={styles.bannerCard}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600' }} style={styles.bannerImg} />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>توصيل فابور اليوم! 🛵</Text>
          </View>
        </View>
      </ScrollView>

      {/* --- الأصناف --- */}
      <View style={styles.gridContainer}>
        {CATEGORIES.map((cat, i) => (
          <TouchableOpacity key={i} style={styles.gridItem}>
            <View style={[styles.catIconCircle, { backgroundColor: '#FFF2F0' }]}>
              <Text style={{ fontSize: 22 }}>{cat.i}</Text>
            </View>
            <Text style={styles.gridText}>{cat.n}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* --- الأكثر مبيعاً 🔥 --- */}
      <View style={styles.sectionHeader}>
        <TouchableOpacity><Text style={{ color: THEME_COLOR, fontWeight: 'bold' }}>عرض الكل</Text></TouchableOpacity>
        <Text style={styles.sectionTitle}>الأكثر مبيعاً 🔥</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
        {BEST_SELLERS.map((item) => (
          <View key={item.id} style={styles.bestSellerCard}>
            <TouchableOpacity 
              onPress={() => router.push({ pathname: "/product-details", params: item })}
            >
              <Image source={{ uri: item.img }} style={styles.bestImg} />
            </TouchableOpacity>

            {/* ✅ الزر اللي بغيتي: إضافة مباشرة للسلة */}
            <TouchableOpacity 
              style={styles.quickAddBtn}
              onPress={() => addToCart({ ...item, quantity: 1 })}
            >
              <Plus size={20} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.bestName}>{item.name}</Text>
            <Text style={styles.bestPrice}>{item.price}</Text>
          </View>
        ))}
      </ScrollView>

      {/* --- محلات قريبة --- */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>محلات قريبة منك 📍</Text>
      </View>
      <TouchableOpacity style={styles.nearCard}>
        <View style={styles.nearInfo}>
          <Text style={styles.nearName}>سناك مبروكة</Text>
          <View style={styles.nearTags}>
            <Text style={styles.nearText}><Star size={12} color="#FFD700" fill="#FFD700"/> 4.8</Text>
            <Text style={styles.nearText}><Clock size={12} color="#666"/> 15 دقيقة</Text>
          </View>
        </View>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=200' }} style={styles.nearImg} />
      </TouchableOpacity>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 50, alignItems: 'center' },
  locationContainer: { flexDirection: 'row', alignItems: 'center' },
  locationText: { marginRight: 5, fontSize: 14, fontWeight: 'bold' },
  iconCircle: { backgroundColor: '#F5F5F5', padding: 10, borderRadius: 15 },
  searchSection: { padding: 20, flexDirection: 'row', gap: 10 },
  searchBar: { flex: 1, flexDirection: 'row-reverse', backgroundColor: '#F2F2F2', padding: 12, borderRadius: 18, alignItems: 'center' },
  searchInput: { flex: 1, marginRight: 10 },
  filterBtn: { backgroundColor: THEME_COLOR, padding: 12, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  bannerCard: { width: width - 40, height: 160, marginLeft: 20, borderRadius: 25, overflow: 'hidden' },
  bannerImg: { width: '100%', height: '100%' },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', padding: 20 },
  bannerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', textAlign: 'right' },
  gridContainer: { flexDirection: 'row-reverse', flexWrap: 'wrap', marginTop: 20, paddingHorizontal: 10 },
  gridItem: { width: '25%', alignItems: 'center', marginBottom: 15 },
  catIconCircle: { width: 60, height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  gridText: { fontSize: 12, fontWeight: 'bold', color: '#333' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 20, alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#222' },
  horizontalList: { paddingLeft: 20, marginTop: 15 },
  bestSellerCard: { width: 150, marginRight: 15, position: 'relative' },
  bestImg: { width: 150, height: 150, borderRadius: 20 },
  quickAddBtn: { 
    position: 'absolute', 
    top: 10, 
    left: 10, 
    backgroundColor: THEME_COLOR, 
    width: 36, 
    height: 36, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  bestName: { textAlign: 'right', fontWeight: 'bold', marginTop: 8 },
  bestPrice: { textAlign: 'right', color: THEME_COLOR, fontWeight: 'bold' },
  nearCard: { marginHorizontal: 20, marginTop: 15, flexDirection: 'row', backgroundColor: '#F9F9F9', borderRadius: 20, padding: 12, alignItems: 'center' },
  nearImg: { width: 80, height: 80, borderRadius: 15 },
  nearInfo: { flex: 1, paddingRight: 15, alignItems: 'flex-end' },
  nearName: { fontSize: 16, fontWeight: 'bold' },
  nearTags: { flexDirection: 'row-reverse', gap: 10, marginTop: 5 },
  nearText: { fontSize: 12, color: '#666', flexDirection: 'row', alignItems: 'center' }
});