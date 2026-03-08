import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors } from '@/constants/theme'; // Yeni tema dosyamızdan renkleri alıyoruz

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary, // Aktif sekme rengi
        tabBarInactiveTintColor: colors.textMuted, // Pasif sekme rengi
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            // iOS için blur efekti
            position: 'absolute',
            backgroundColor: colors.backgroundDark,
            borderTopColor: 'transparent',
          },
          default: {
            backgroundColor: colors.backgroundDark,
            borderTopColor: colors.backgroundLight,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
