import { View, Text, StyleSheet } from 'react-native';
import { OrderBreakdown } from '../utils/orderCalculator';

export const OrderSummary = ({ breakdown, basketTotal }: { breakdown: OrderBreakdown, basketTotal: number }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>تفاصيل الأداء (QuickServe)</Text>
      
      <View style={styles.row}>
        <Text>المشتريات</Text>
        <Text>{basketTotal.toFixed(2)} درهم</Text>
      </View>

      <View style={styles.row}>
        <Text>التوصيل</Text>
        <Text>{breakdown.deliveryFee.toFixed(2)} درهم</Text>
      </View>

      <View style={styles.row}>
        <Text>رسوم الخدمة</Text>
        <Text>{breakdown.serviceFee.toFixed(2)} درهم</Text>
      </View>

      <View style={[styles.row, { borderTopWidth: 1, borderColor: '#eee', marginTop: 10 }]}>
        <Text style={{ color: 'gray' }}>الضريبة (TVA 20%)</Text>
        <Text style={{ color: 'gray' }}>{breakdown.tvaAmount.toFixed(2)} درهم</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.totalText}>المجموع الإجمالي</Text>
        <Text style={styles.totalPrice}>{breakdown.finalTotal.toFixed(2)} درهم</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: '#f9f9f9', borderRadius: 10, margin: 10 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'right' },
  row: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginVertical: 4 },
  totalText: { fontSize: 18, fontWeight: 'bold' },
  totalPrice: { fontSize: 18, fontWeight: 'bold', color: '#E67E22' }
});