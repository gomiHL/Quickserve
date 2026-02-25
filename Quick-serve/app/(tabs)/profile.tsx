// دير هاد الكود في app/(tabs)/market.tsx مثلاً
import { View, Text, StyleSheet } from 'react-native';

export default function MarketScreen() {
  return (
      <View style={styles.container}>
            <Text style={styles.text}>قريباً: سوق تيفلت الشامل 🍎</Text>
                </View>
                  );
                  }

                  const styles = StyleSheet.create({
                    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
                      text: { fontSize: 18, fontWeight: 'bold' }
                      });