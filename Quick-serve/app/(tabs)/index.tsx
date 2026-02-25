import React from 'react';
import { View, Text, ScrollView, TextInput, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Search, MapPin, Bell, ChevronLeft, Clock, Star } from 'lucide-react-native';

const THEME_COLOR = '#FF7043';

// 1. التصنيفات المطلوبة
const MAIN_CATEGORIES = [
  { id: '1', name: 'أكل', icon: '🍔', color: '#FFF2F0' },
  { id: '2', name: 'مشروبات', icon: '🥤', color: '#F0F9FF' },
  { id: '3', name: 'صيدلة', icon: '💊', color: '#F0FFF4' },
  { id: '4', name: 'بقالة', icon: '🛒', color: '#FFFBF0' },
  { id: '5', name: 'مخبزة', icon: '🍞', color: '#FDF2F8' },
  { id: '6', name: 'باتسري', icon: '🍰', color: '#FFF5F0' },
  { id: '7', name: 'تجميل', icon: '💄', color: '#F5F3FF' },
];

// 2. محلات "اطلب مجددا"
const RECENT_SHOPS = [
  { id: '1', name: 'سناك مبروكة', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=200' },
  { id: '2', name: 'مخبزة تيفلت', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=200' },
  { id: '3', name: 'صيدلية الأمل', image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=200' },
];

// 3. منتوجات "وجبات الإفطار"
const BREAKFAST_ITEMS = [
  { id: '1', name: 'حرشة مغربية', price: '12 DH', image: 'https://images.unsplash.com/photo-1599908608021-b5527655bc61?q=80&w=300' },
  { id: '2', name: 'مسمن بالعسل', price: '15 DH', image: 'https://images.unsplash.com/photo-1626354313200-a63690623594?q=80&w=300' },
  { id: '3', name: 'أومليت كلاسيك', price: '20 DH', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=300' },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconCircle}><Bell size={22} color="#333" /></TouchableOpacity>
        <TouchableOpacity style={styles.locationContainer}>
          <Text style={styles.locationText}>تيفلت، حي الأندلس</Text>
          <MapPin size={18} color={THEME_COLOR} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Search size={20} color="#999" />
          <TextInput placeholder="قلب على اللي بغيتي..." style={styles.searchInput} textAlign="right" />
        </View>
      </View>

      {/* --- السيكشن 1: التصنيفات (Grid) --- */}
      <View style={styles.gridContainer}>
        {MAIN_CATEGORIES.map((cat) => (
          <TouchableOpacity key={cat.id} style={styles.gridItem}>
            <View style={[styles.catIconCircle, { backgroundColor: cat.color }]}>
              <Text style={{ fontSize: 26 }}>{cat.icon}</Text>
            </View>
            <Text style={styles.gridText}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* --- السيكشن 2: اطلب مجدداً (أفقي) --- */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>اطلب مجدداً</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
        {RECENT_SHOPS.map((shop) => (
          <TouchableOpacity key={shop.id} style={styles.reorderCard}>
            <Image source={{ uri: shop.image }} style={styles.reorderImg} />
            <View style={styles.reorderOverlay}>
              <Text style={styles.reorderName}>{shop.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* --- السيكشن 3: وجبات إفطار (أفقي مع عرض الكل) --- */}
      <View style={styles.sectionHeader}>
        <TouchableOpacity><Text style={{ color: THEME_COLOR, fontWeight: 'bold' }}>عرض الكل</Text></TouchableOpacity>
        <Text style={styles.sectionTitle}>وجبات إفطار</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
        {BREAKFAST_ITEMS.map((item) => (
          <TouchableOpacity key={item.id} style={styles.breakfastCard}>
            <Image source={{ uri: item.image }} style={styles.breakfastImg} />
            <View style={styles.breakfastInfo}>
              <Text style={styles.breakfastName}>{item.name}</Text>
              <Text style={styles.breakfastPrice}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 50, alignItems: 'center' },
  locationContainer: { flexDirection: 'row', alignItems: 'center' },
  locationText: { marginRight: 5, fontSize: 14, fontWeight: 'bold', color: '#333' },
  iconCircle: { backgroundColor: '#F5F5F5', padding: 10, borderRadius: 15 },
  searchSection: { padding: 20 },
  searchBar: { flexDirection: 'row-reverse', backgroundColor: '#F2F2F2', padding: 12, borderRadius: 18, alignItems: 'center' },
  searchInput: { flex: 1, marginRight: 10, fontSize: 16 },
  
  // Grid التصنيفات
  gridContainer: { flexDirection: 'row-reverse', flexWrap: 'wrap', paddingHorizontal: 10, justifyContent: 'center' },
  gridItem: { width: '23%', alignItems: 'center', marginBottom: 20 },
  catIconCircle: { width: 65, height: 65, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  gridText: { fontSize: 13, fontWeight: 'bold', color: '#444' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10, alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#222' },

  // سيكشن اطلب مجددا
  horizontalList: { paddingLeft: 20, marginTop: 15 },
  reorderCard: { width: 140, height: 90, marginRight: 15, borderRadius: 15, overflow: 'hidden' },
  reorderImg: { width: '100%', height: '100%' },
  reorderOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  reorderName: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

  // سيكشن وجبات الإفطار
  breakfastCard: { width: 180, marginRight: 15, backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#EEE' },
  breakfastImg: { width: '100%', height: 120 },
  breakfastInfo: { padding: 12, alignItems: 'flex-end' },
  breakfastName: { fontWeight: 'bold', fontSize: 15 },
  breakfastPrice: { color: THEME_COLOR, fontWeight: '800', marginTop: 4 },
});