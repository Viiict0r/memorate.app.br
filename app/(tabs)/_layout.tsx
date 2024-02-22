import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Tabs } from 'expo-router';
import React from 'react';

import { TabBar } from '@/components/tab-bar/tab-bar';

export default function TabLayout() {
  return (
    <BottomSheetModalProvider>
      <Tabs tabBar={(props) => <TabBar />}>
        <Tabs.Screen name="index" options={{ headerShown: false }} />
      </Tabs>
    </BottomSheetModalProvider>
  );
}
