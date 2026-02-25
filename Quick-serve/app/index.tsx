import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, ArrowLeft, ArrowRight, Navigation, Globe } from 'lucide-react-native';

export default function WelcomeFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Welcome, 2: Language, 3: Location

  const handleFinish = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      {/* الخطوة 1: الترحيب */}
      {step === 1 && (
        <View style={styles.stepContent}>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1261/1261163.png' }} style={styles.logo} />
          <Text style={styles.title}>Tiflet Market</Text>
          <Text style={styles.subtitle}>مرحباً بك في تطبيقك المفضل في تيفلت</Text>
          <TouchableOpacity style={styles.mainBtn} onPress={() => setStep(2)}>
            <Text style={styles.btnText}>ابدأ الآن</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* الخطوة 2: اللغة */}
      {step === 2 && (
        <View style={styles.stepContent}>
          <Globe size={50} color="#4CAF50" />
          <Text style={styles.title}>اختر اللغة</Text>
          <View style={styles.langGrid}>
            <TouchableOpacity style={styles.langBtn} onPress={() => setStep(3)}><Text>العربية</Text></TouchableOpacity>
            <TouchableOpacity style={styles.langBtn} onPress={() => setStep(3)}><Text>Français</Text></TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setStep(1)}><Text style={styles.backLink}>رجوع</Text></TouchableOpacity>
        </View>
      )}

      {/* الخطوة 3: الموقع (بدون مكتبة خرائط) */}
      {step === 3 && (
        <View style={styles.stepContent}>
          <MapPin size={50} color="#FF5252" />
          <Text style={styles.title}>تحديد الموقع</Text>
          <Text style={styles.subtitle}>حدد مكان التوصيل في تيفلت</Text>
          
          {/* صورة خريطة ثابتة للجمالية فقط */}
          <View style={styles.fakeMapContainer}>
             <Image 
               source={{ uri: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-6.3134,33.8938,14,0/400x300?access_token=pk.eyJ1IjoiZGVtbyIsImEiOiJjaW5hbmZ0djQwMDB3d2ZsdXY3Z3N2Z3p3In0' }} 
               style={styles.fakeMap} 
             />
             <View style={styles.pinOverlay}><MapPin size={30} color="#FF5252" fill="#FF5252" /></View>
          </View>

          <TouchableOpacity style={styles.mainBtn} onPress={handleFinish}>
            <Text style={styles.btnText}>تأكيد ومتابعة</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  stepContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 25 },
  logo: { width: 100, height: 100, marginBottom: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 10, marginBottom: 40 },
  mainBtn: { backgroundColor: '#4CAF50', width: '100%', padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  langGrid: { width: '100%', gap: 10, marginTop: 20 },
  langBtn: { padding: 15, borderWidth: 1, borderColor: '#eee', borderRadius: 12, alignItems: 'center' },
  backLink: { marginTop: 20, color: '#999' },
  fakeMapContainer: { width: '100%', height: 250, borderRadius: 20, overflow: 'hidden', marginVertical: 20, position: 'relative' },
  fakeMap: { width: '100%', height: '100%' },
  pinOverlay: { position: 'absolute', top: '50%', left: '50%', marginLeft: -15, marginTop: -30 }
});