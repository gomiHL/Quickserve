import { Stack } from 'expo-router';
import { CartProvider } from './context/CartContext';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

const GEOFENCING_TASK = 'MOBILE_ORDER_GEOFENCE';

// إعدادات التنبيهات
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    } as any;
  },
});

// تعريف مهمة الـ Geofencing
TaskManager.defineTask(GEOFENCING_TASK, async ({ data, error }: any) => {
  if (error) {
    console.error(error);
    return;
  }
  const { eventType } = data;
  if (eventType === Location.GeofencingEventType.Enter) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "مرحباً بك في تيفلت! 🔥",
        body: "وجد راسك، راك قربتي لأحلى مطعم في المدينة!",
      },
      trigger: null,
    });
  }
});

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* صفحة الترحيب (البداية) */}
        <Stack.Screen name="index" /> 
        
        {/* مجلد التابات (اللي فيه 4 ديال الأزرار) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* هاد الروابط غايبقاو للملفات اللي برا باش ما يطلعش ليك Error */}
        <Stack.Screen name="product-details" />
        
        {/* السلة كمودال (اختياري) */}
        <Stack.Screen name="cart" options={{ presentation: 'modal' }} />
      </Stack>
    </CartProvider>
  );
} 