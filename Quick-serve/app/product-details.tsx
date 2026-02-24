import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, ShoppingBag } from 'lucide-react-native';
import { useCart } from './context/CartContext';

export default function ProductDetails() {
  const item = useLocalSearchParams();
    const router = useRouter();
      const { addToCart } = useCart();
        const [added, setAdded] = useState(false);

          const handleAdd = () => {
              addToCart(item);
                  setAdded(true);
                      setTimeout(() => setAdded(false), 2000);
                        };

                          return (
                              <View style={styles.container}>
                                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                                            <ArrowLeft size={24} color="#000" />
                                                  </TouchableOpacity>
                                                        <Image source={{ uri: item.img as string }} style={styles.image} />
                                                              <View style={styles.content}>
                                                                      <Text style={styles.name}>{item.name}</Text>
                                                                              <Text style={styles.price}>{item.price}</Text>
                                                                                      <Text style={styles.desc}>مذاق رائع وجودة عالية. اطلب الآن واستمتع بالوجبة!</Text>
                                                                                            </View>
                                                                                                  <View style={styles.footer}>
                                                                                                          <TouchableOpacity style={[styles.btn, added && {backgroundColor: '#4BB543'}]} onPress={handleAdd}>
                                                                                                                    <ShoppingBag size={20} color="#fff" />
                                                                                                                              <Text style={styles.btnText}>{added ? 'تمت الإضافة ✓' : 'إضافة للسلة'}</Text>
                                                                                                                                      </TouchableOpacity>
                                                                                                                                            </View>
                                                                                                                                                </View>
                                                                                                                                                  );
                                                                                                                                                  }

                                                                                                                                                  const styles = StyleSheet.create({
                                                                                                                                                    container: { flex: 1, backgroundColor: '#fff' },
                                                                                                                                                      backBtn: { position: 'absolute', top: 50, left: 20, zIndex: 10, backgroundColor: '#fff', padding: 10, borderRadius: 12 },
                                                                                                                                                        image: { width: '100%', height: 350 },
                                                                                                                                                          content: { padding: 25, borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30, backgroundColor: '#fff' },
                                                                                                                                                            name: { fontSize: 24, fontWeight: 'bold' },
                                                                                                                                                              price: { fontSize: 22, color: '#FF5733', fontWeight: 'bold', marginVertical: 10 },
                                                                                                                                                                desc: { color: '#666', lineHeight: 22, textAlign: 'right' },
                                                                                                                                                                  footer: { padding: 20, borderTopWidth: 1, borderColor: '#eee' },
                                                                                                                                                                    btn: { backgroundColor: '#FF5733', padding: 18, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', gap: 10 },
                                                                                                                                                                      btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
                                                                                                                                                                      });