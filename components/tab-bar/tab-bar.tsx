import { Feather } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useRef } from 'react';
import { Platform, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

import { AddNewForm } from '../add-new-form';

import Colors from '@/constants/Colors';

export const TabBar = () => {
  const theme = useColorScheme() ?? 'light';
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const navigateToHome = () => router.navigate('/');
  const navigateToSettings = () => router.navigate('settings');

  const handleAddPress = () => bottomSheetModalRef.current?.present();

  return (
    <LinearGradient
      colors={
        theme === 'light'
          ? ['rgba(255,255,255,0.1)', 'rgba(255, 255, 255, 1)']
          : ['rgba(20,20,20,0.1)', 'rgba(20, 20, 20, 1)']
      }
      style={Platform.OS === 'android' ? styles.wrapper_android : styles.wrapper_ios}>
      <Pressable onPress={handleAddPress}>
        {({ pressed }) => (
          <LinearGradient
            colors={Colors[theme].background_gradient}
            start={[0, 0]}
            end={[1, 0]}
            style={{
              ...styles.add_btn,
              opacity: pressed ? 0.8 : 1,
            }}>
            <Feather name="plus" color="#fff" size={28} />
          </LinearGradient>
        )}
      </Pressable>
      <BottomSheetModal
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={['25%', '60%']}>
        <AddNewForm />
      </BottomSheetModal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wrapper_android: {
    position: 'absolute',
    width: `${100}%`,
    bottom: 0,
    paddingBottom: (initialWindowMetrics?.insets.bottom || 0) + 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  wrapper_ios: {
    position: 'absolute',
    width: `${100}%`,
    bottom: 0,
    height: 80,
    paddingBottom: initialWindowMetrics?.insets.bottom || 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
  add_btn: {
    width: 55,
    height: 55,
    borderRadius: 999,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: -10,
    zIndex: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
