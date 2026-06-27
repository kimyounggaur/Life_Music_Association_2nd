import { Tabs } from 'expo-router';
import { Award, BookOpen, Home, Menu, Music2 } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

import { colors } from '@/lib/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.inkSoft,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.line,
          borderTopWidth: StyleSheet.hairlineWidth,
          minHeight: 62,
          paddingTop: 6,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: '홈', tabBarIcon: ({ color, size }) => <Home size={size} color={color} /> }} />
      <Tabs.Screen name="courses" options={{ title: '자격과정', tabBarIcon: ({ color, size }) => <Award size={size} color={color} /> }} />
      <Tabs.Screen name="classes" options={{ title: '클래스', tabBarIcon: ({ color, size }) => <Music2 size={size} color={color} /> }} />
      <Tabs.Screen name="books" options={{ title: '교재', tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} /> }} />
      <Tabs.Screen name="more" options={{ title: '더보기', tabBarIcon: ({ color, size }) => <Menu size={size} color={color} /> }} />
    </Tabs>
  );
}
