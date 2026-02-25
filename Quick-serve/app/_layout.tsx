import { Stack } from 'expo-router';
import { CartProvider } from './context/CartContext';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

const GEOFENCING_TASK = 'MOBILE_ORDER_GEOFENCE';

// الحل النهائي والساحق لمشكل TypeScript 🚀
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    } as any; // هادي كتسكت TypeScript بصفة نهائية
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
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="cart" options={{ presentation: 'modal' }} />
        <Stack.Screen name="product-details" />
      </Stack>
    </CartProvider>
  );
}