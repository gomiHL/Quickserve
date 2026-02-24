import { Stack } from 'expo-router';
import { CartProvider } from './context/CartContext';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const GEOFENCING_TASK = 'MOBILE_ORDER_GEOFENCE';

// تصحيح: المهمة لازم تكون async وترجع Promise<void>
TaskManager.defineTask(GEOFENCING_TASK, async ({ data, error }: any) => {
  if (error) {
      console.error(error);
          return;
            }
              const { eventType, region } = data;
                if (eventType === Location.GeofencingEventType.Enter) {
                    console.log("مرحباً بك! دخلتي لمنطقة التوصيل 🔥", region.identifier);
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