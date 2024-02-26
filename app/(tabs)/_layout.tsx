import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Tabs } from 'expo-router';
import React from 'react';

import { AddButton } from '@/components/add-button/add-button';

export default function TabLayout() {
  return (
    <BottomSheetModalProvider>
      <Tabs tabBar={() => <AddButton />}>
        <Tabs.Screen name="index" options={{ headerShown: false }} />
      </Tabs>
    </BottomSheetModalProvider>
  );
}
