import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  ActivityIndicator,
  Platform
} from 'react-native';
import { ShoppingCart, Search, MapPin, Star, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useCart } from '../context/CartContext';
import * as Location from 'expo-location';

// ملاحظة: إذا استمر مشكل expo-notifications، تأكد من تشغيل: npx expo install expo-notifications
// أو قم بالتعليق (Comment) على السطرين التاليين إذا لم تكن بحاجة للإشعارات حالياً
import * as Notifications from 'expo-notifications';

const PRODUCTS_DATA = [
  { 
    id: '1', 
    name: 'كلاسيك تشيز برغر', 
    price: '45 DH', 
    rating: '4.8', 
    time: '20-30 min', 
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500' 
  },
  { 
    id: '2', 
    name: 'بيتزا مارغريتا', 
    price: '55 DH', 
    rating: '4.5', 
    time: '25-35 min', 
    img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500' 
  },
  { 
    id: '3', 
    name: 'تاكوس ميكس عائلي', 
    price: '35 DH', 
    rating: '4.2', 
    time: '15-20 min', 
    img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=500' 
  },
  { 
    id: '4', 
    name: 'سلطة سيزر طرية', 
    price: '30 DH', 
    rating: '4.7', 
    time: '10-15 min', 
    img: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=500' 
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { cartCount } = useCart();
  const [locationName, setLocationName] = useState('تيفلت، المغرب');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      try {
        let location = await Location.getCurrentPositionAsync({});
        let reverse = await Location.reverseGeocodeAsync(location.coords);
        if (reverse[0]) {
          setLocationName(`${reverse[0].city || 'تيفلت'}, ${reverse[0].district || ''}`);
        }
      } catch (e) {
        console.log("Location error", e);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* الهيدر */}
      <View style={styles.header}>
        <View style={styles.headerRight}>
          <Text style={styles.subTitle}>توصيل إلى</Text>
          <View style={styles.locationRow}>
            <MapPin size={16} color="#4CAF50" />
            <Text style={styles.locationText}>{locationName}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.cartBtn} onPress={() => router.push("/cart")}>
          <ShoppingCart size={22} color="#333" />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* شريط البحث */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Search size={20} color="#999" />
            <TextInput 
              placeholder="شنو بغيتي تاكل اليوم؟" 
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* قسم العروض */}
        <View style={styles.banner}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500' }} 
            style={styles.bannerImg}
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>توصيل فابور في تيفلت! 🚚</Text>
            <Text style={styles.bannerSub}>على أول 3 طلبات ديالك</Text>
          </View>
        </View>

        {/* قائمة المنتجات */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>قائمة المأكولات 🍽️</Text>
          <View style={styles.grid}>
            {PRODUCTS_DATA.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.card} 
                onPress={() => router.push({
                  pathname: "/product-details",
                  params: {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    img: item.img,
                    rating: item.rating
                  }
                })}
              >
                <Image source={{ uri: item.img }} style={styles.cardImg} />
                <View style={styles.cardInfo}>
                  <Text style={styles.foodName} numberOfLines={1}>{item.name}</Text>
                  <View style={styles.cardMeta}>
                    <View style={styles.metaItem}>
                      <Star size={12} color="#FFD700" fill="#FFD700" />
                      <Text style={styles.metaText}>{item.rating}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Clock size={12} color="#888" />
                      <Text style={styles.metaText}>{item.time}</Text>
                    </View>
                  </View>
                  <Text style={styles.priceText}>{item.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fcfcfc', paddingTop: 50 },
  header: { 
    flexDirection: 'row-reverse', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    alignItems: 'center',
    marginBottom: 10
  },
  headerRight: { alignItems: 'flex-end' },
  subTitle: { color: '#888', fontSize: 12 },
  locationRow: { flexDirection: 'row-reverse', alignItems: 'center', marginTop: 2 },
  locationText: { fontSize: 14, fontWeight: 'bold', marginRight: 4, color: '#333' },
  cartBtn: { backgroundColor: '#fff', padding: 12, borderRadius: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  
  // هنا تم تصحيح الخطأ من borderWeight إلى borderWidth
  badge: { 
    position: 'absolute', 
    top: -5, 
    right: -5, 
    backgroundColor: '#4CAF50', 
    width: 20, 
    height: 20, 
    borderRadius: 10, 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 2, 
    borderColor: '#fff' 
  },
  
  badgeText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  scrollContent: { paddingBottom: 100 },
  searchSection: { paddingHorizontal: 20, marginTop: 15 },
  searchBar: { backgroundColor: '#f2f2f2', flexDirection: 'row-reverse', alignItems: 'center', padding: 14, borderRadius: 18 },
  searchInput: { flex: 1, marginRight: 10, textAlign: 'right', fontSize: 16 },
  banner: { marginHorizontal: 20, marginTop: 25, height: 140, borderRadius: 25, overflow: 'hidden' },
  bannerImg: { width: '100%', height: '100%' },
  bannerOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.4)', padding: 12 },
  bannerTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'right' },
  bannerSub: { color: '#eee', fontSize: 12, textAlign: 'right' },
  section: { paddingHorizontal: 20, marginTop: 25 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'right' },
  grid: { flexDirection: 'row-reverse', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { backgroundColor: '#fff', width: '48%', borderRadius: 25, marginBottom: 20, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, overflow: 'hidden' },
  cardImg: { width: '100%', height: 120 },
  cardInfo: { padding: 12, alignItems: 'flex-end' },
  foodName: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  cardMeta: { flexDirection: 'row-reverse', gap: 8, marginVertical: 6 },
  metaItem: { flexDirection: 'row-reverse', alignItems: 'center', gap: 3 },
  metaText: { fontSize: 10, color: '#888' },
  priceText: { color: '#4CAF50', fontWeight: 'bold', fontSize: 16, marginTop: 4 },
});