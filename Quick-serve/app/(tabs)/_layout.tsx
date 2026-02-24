import { Tabs } from 'expo-router';
import { Home, ClipboardList, User } from 'lucide-react-native';

export default function TabsLayout() {
  return (
      <Tabs screenOptions={{ 
            headerShown: false,
                  tabBarActiveTintColor: '#FF5733',
                        tabBarStyle: { height: 60, paddingBottom: 10 } 
                            }}>
                                  <Tabs.Screen name="index" options={{ title: 'الرئيسية', tabBarIcon: ({ color }) => <Home size={24} color={color} /> }} />
                                        <Tabs.Screen name="orders" options={{ title: 'طلباتي', tabBarIcon: ({ color }) => <ClipboardList size={24} color={color} /> }} />
                                              <Tabs.Screen name="profile" options={{ title: 'حسابي', tabBarIcon: ({ color }) => <User size={24} color={color} /> }} />
                                                  </Tabs>
                                                    );
                                                    }