import React, { useState, useRef } from 'react';
import { 
  View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, 
  Dimensions, SafeAreaView, Platform, Animated 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
// استخدام ShoppingBag بوضوح أكثر مع أيقونات مساعدة
import { ChevronLeft, ShoppingCart, Plus, Minus, Star, Clock, CheckCircle2, ShoppingBag } from 'lucide-react-native';
import { useCart } from './context/CartContext'; 

const { width, height } = Dimensions.get('window');
const THEME_COLOR = '#FF7043';

export default function ProductDetails() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { addToCart, cartCount } = useCart() as any;
  const [qty, setQty] = useState(1);

  // أنيميشن الإشعار (Popup)
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  const translateY = useRef(new Animated.Value(-100)).current;

  const showPopup = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 50, duration: 400, useNativeDriver: true })
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: -100, duration: 400, useNativeDriver: true })
      ]).start();
    }, 2500);
  };

  const handleAddToCart = () => {
    addToCart({
      id: params.id,
      name: params.name,
      price: params.price,
      img: params.img,
      quantity: qty,
      unit: 'حبة'
    });
    showPopup();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      
      {/* الإشعار العلوي عند الإضافة */}
      <Animated.View style={[styles.popup, { opacity: fadeAnim, transform: [{ translateY }] }]}>
        <CheckCircle2 size={20} color="#fff" />
        <Text style={styles.popupText}>تم إضافة {qty} {params.name} للسلة</Text>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.imageHeader}>
          <Image source={{ uri: params.img as string }} style={styles.productImg} />
          
          {/* --- الأزرار العلوية (عكس الأماكن) --- */}
          <SafeAreaView style={styles.topButtonsContainer}>
            
            {/* زر السلة (الآن على اليمين) */}
            <TouchableOpacity onPress={() => router.push("/(tabs)/cart")} style={styles.circleBtn}>
              <ShoppingBag size={26} color="#333" strokeWidth={2.5} />
              {cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* زر الرجوع (الآن على اليسار) */}
            <TouchableOpacity onPress={() => router.back()} style={styles.circleBtn}>
              <ChevronLeft size={28} color="#333" />
            </TouchableOpacity>

          </SafeAreaView>
        </View>

        <View style={styles.detailsContent}>
          <View style={styles.titleRow}>
            <Text style={styles.price}>{params.price}</Text>
            <Text style={styles.name}>{params.name}</Text>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.metaText}>4.9 (تيفلت ماركت)</Text>
            </View>
            <View style={styles.metaItem}>
              <Clock size={16} color="#666" />
              <Text style={styles.metaText}>25-35 دقيقة</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>وصف المنتج</Text>
          <Text style={styles.description}>
            هذا المنتج طازج ومحضر بعناية فائقة لضمان أفضل مذاق. نلتزم بالجودة العالية والتوصيل السريع لزبنائنا في مدينة تيفلت.
          </Text>

          <View style={styles.divider} />

          <View style={styles.qtyRow}>
            <View style={styles.qtyPicker}>
              <TouchableOpacity onPress={() => setQty(qty + 1)} style={styles.qtyBtn}>
                <Plus size={20} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.qtyNumber}>{qty}</Text>
              <TouchableOpacity onPress={() => qty > 1 && setQty(qty - 1)} style={[styles.qtyBtn, { backgroundColor: '#E0E0E0' }]}>
                <Minus size={20} color="#333" />
              </TouchableOpacity>
            </View>
            <Text style={styles.sectionTitle}>الكمية</Text>
          </View>
        </View>
      </ScrollView>

      {/* زر الإضافة للسلة الثابت في الأسفل */}
      <View style={styles.stickyFooter}>
        <TouchableOpacity style={styles.mainAddBtn} onPress={handleAddToCart}>
          <Text style={styles.addBtnText}>إضافة للسلة</Text>
          <ShoppingCart size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topButtonsContainer: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 40 : 10,
    left: 20,
    right: 20,
    flexDirection: 'row', // ترتيب العناصر
    justifyContent: 'space-between', 
    alignItems: 'center',
    zIndex: 10,
  },
  circleBtn: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 10,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: THEME_COLOR,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  popup: { 
    position: 'absolute', 
    top: 0, 
    left: '10%', 
    right: '10%', 
    backgroundColor: '#2E7D32', 
    padding: 15, 
    borderRadius: 12, 
    flexDirection: 'row-reverse', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 10, 
    zIndex: 1000, 
    elevation: 10 
  },
  popupText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  imageHeader: { position: 'relative', width: width, height: height * 0.4 },
  productImg: { width: '100%', height: '100%', resizeMode: 'cover' },
  detailsContent: { 
    padding: 25, 
    backgroundColor: '#fff', 
    marginTop: -40, 
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40 
  },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  price: { fontSize: 22, fontWeight: '900', color: THEME_COLOR },
  metaRow: { flexDirection: 'row-reverse', gap: 20, marginBottom: 20 },
  metaItem: { flexDirection: 'row-reverse', alignItems: 'center', gap: 5 },
  metaText: { color: '#888', fontSize: 13 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', textAlign: 'right' },
  description: { fontSize: 15, color: '#666', textAlign: 'right', lineHeight: 22, marginTop: 8 },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 20 },
  qtyRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
  qtyPicker: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', padding: 5, borderRadius: 15, gap: 10 },
  qtyBtn: { width: 35, height: 35, backgroundColor: THEME_COLOR, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  qtyNumber: { fontSize: 18, fontWeight: 'bold' },
  stickyFooter: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: '#fff', 
    padding: 20, 
    paddingBottom: Platform.OS === 'ios' ? 35 : 20, 
    borderTopWidth: 1, 
    borderTopColor: '#eee', 
    elevation: 10 
  },
  mainAddBtn: { 
    backgroundColor: THEME_COLOR, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 16, 
    borderRadius: 18, 
    gap: 10 
  },
  addBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});