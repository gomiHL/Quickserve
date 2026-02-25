import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, ViewStyle, TextStyle, ImageStyle 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight, ShoppingCart, Star, Clock, Search, Plus, Minus } from 'lucide-react-native';
import { useCart } from './context/CartContext'; 

const { width } = Dimensions.get('window');

const MENU_ITEMS = [
  { id: 'm1', name: 'وجبة ميكس برغر عائلي', price: 55, desc: 'برغر لحم، بطاطس، ومشروب غازي', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300' },
  { id: 'm2', name: 'بيتزا مارغريتا كلاسيك', price: 45, desc: 'صلصة طماطم، موزاريلا، وريحان', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300' },
  { id: 'm3', name: 'ساندويتش تونة ملكي', price: 25, desc: 'تونة، مايونيز، خس وطماطم طرية', img: 'https://images.unsplash.com/photo-1539252554452-da37fa1d76c0?w=300' },
];

export default function ShopDetailsScreen() {
  const { name } = useLocalSearchParams();
  const router = useRouter();
  const { cartCount, addToCart } = useCart();
  
  // States للبحث والكمية
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  // تصفية المنتجات بناءً على البحث
  const filteredMenu = MENU_ITEMS.filter(item => 
    item.name.includes(searchQuery) || item.desc.includes(searchQuery)
  );

  // وظيفة التحكم في الكمية
  const updateQty = (id: string, type: 'plus' | 'minus') => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + (type === 'plus' ? 1 : -1))
    }));
  };

  return (
    <View style={styles.container}>
      {/* الهيدر مع صورة الغلاف */}
      <View style={styles.headerContainer}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500' }} style={styles.coverImg} />
        <View style={styles.overlayButtons}>
          <TouchableOpacity style={styles.circleBtn} onPress={() => router.push("/cart" as any)}>
            <ShoppingCart size={20} color="#333" />
            {cartCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{cartCount}</Text></View>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleBtn} onPress={() => router.back()}>
            <ArrowRight size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]}>
        {/* معلومات المحل */}
        <View style={styles.infoSection}>
          <Text style={styles.shopTitle}>{name || 'اسم المحل'}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}><Star size={14} color="#FFD700" fill="#FFD700" /><Text style={styles.statText}>4.9</Text></View>
            <View style={styles.statItem}><Clock size={14} color="#666" /><Text style={styles.statText}>25 min</Text></View>
          </View>
        </View>

        {/* بار البحث (Sticky) */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <TextInput 
              placeholder="قلب فالمينيو..." 
              style={styles.searchInput} 
              textAlign="right"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Search size={18} color="#999" />
          </View>
        </View>

        {/* المنيو */}
        <View style={styles.menuList}>
          {filteredMenu.map((item) => (
            <View key={item.id} style={styles.menuItemCard}>
              <Image source={{ uri: item.img }} style={styles.itemImg} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price} DH</Text>
                
                <View style={styles.actionRow}>
                  {/* التحكم في الكمية */}
                  <View style={styles.qtyContainer}>
                    <TouchableOpacity onPress={() => updateQty(item.id, 'plus')} style={styles.qtyBtn}>
                      <Plus size={16} color="#4CAF50" />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{quantities[item.id] || 1}</Text>
                    <TouchableOpacity onPress={() => updateQty(item.id, 'minus')} style={styles.qtyBtn}>
                      <Minus size={16} color="#FF4B2B" />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => addToCart({...item, quantity: quantities[item.id] || 1} as any)}
                  >
                    <Text style={styles.addText}>إضافة</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' } as ViewStyle,
  headerContainer: { width: '100%', height: 180 } as ViewStyle,
  coverImg: { width: '100%', height: '100%' } as ImageStyle,
  overlayButtons: { position: 'absolute', top: 40, left: 15, right: 15, flexDirection: 'row', justifyContent: 'space-between' } as ViewStyle,
  circleBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', elevation: 5 } as ViewStyle,
  badge: { position: 'absolute', top: -5, right: -5, backgroundColor: '#4CAF50', width: 16, height: 16, borderRadius: 8, justifyContent: 'center', alignItems: 'center' } as ViewStyle,
  badgeText: { color: '#fff', fontSize: 9, fontWeight: 'bold' } as TextStyle,
  
  infoSection: { padding: 20, backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -20 } as ViewStyle,
  shopTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'right' } as TextStyle,
  statsRow: { flexDirection: 'row-reverse', gap: 15, marginTop: 8 } as ViewStyle,
  statItem: { flexDirection: 'row-reverse', alignItems: 'center', gap: 4 } as ViewStyle,
  statText: { fontSize: 13, color: '#666' } as TextStyle,

  searchSection: { padding: 15, backgroundColor: '#fff' } as ViewStyle,
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 10, paddingHorizontal: 15, height: 45 } as ViewStyle,
  searchInput: { flex: 1, marginRight: 10 } as TextStyle,

  menuList: { padding: 15 } as ViewStyle,
  menuItemCard: { flexDirection: 'row-reverse', backgroundColor: '#fff', borderRadius: 12, padding: 10, marginBottom: 15, borderWidth: 1, borderColor: '#F0F0F0' } as ViewStyle,
  itemImg: { width: 80, height: 80, borderRadius: 10 } as ImageStyle,
  itemDetails: { flex: 1, marginRight: 12, justifyContent: 'space-between' } as ViewStyle,
  itemName: { fontSize: 15, fontWeight: 'bold', textAlign: 'right' } as TextStyle,
  itemPrice: { fontSize: 14, color: '#4CAF50', fontWeight: 'bold', textAlign: 'right' } as TextStyle,
  
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 } as ViewStyle,
  qtyContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', borderRadius: 8, padding: 2 } as ViewStyle,
  qtyBtn: { padding: 5, backgroundColor: '#fff', borderRadius: 6, elevation: 1 } as ViewStyle,
  qtyText: { marginHorizontal: 12, fontWeight: 'bold', fontSize: 14 } as TextStyle,
  addButton: { backgroundColor: '#FF4B2B', paddingHorizontal: 15, paddingVertical: 7, borderRadius: 8 } as ViewStyle,
  addText: { color: '#fff', fontWeight: 'bold', fontSize: 12 } as TextStyle,
});