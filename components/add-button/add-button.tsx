import { Feather } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

import { AddDateForm } from '../add-date-form';

import Colors, { grey } from '@/constants/Colors';
import { useTheme } from '@/hooks/use-theme';
import { moderateScale, verticalScale } from '@/utils/metrics';

export const AddButton = () => {
  const { theme } = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [snapPoint, setSnapPoint] = useState('65%');

  const handleAddPress = () => bottomSheetModalRef.current?.present();
  const handleSheetClose = () => bottomSheetModalRef.current?.close();

  const handleExpand = () => setSnapPoint('85%');
  const handleDecrease = () => setSnapPoint('65%');

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
            <Feather name="plus" color="#fff" size={moderateScale(28, 0.3)} />
          </LinearGradient>
        )}
      </Pressable>
      <BottomSheetModal
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        handleIndicatorStyle={{
          backgroundColor: grey,
        }}
        ref={bottomSheetModalRef}
        index={1}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={1}
            style={[props.style, { backgroundColor: 'transparent' }]}
          />
        )}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: Colors[theme].sheet_background,
        }}
        snapPoints={[snapPoint, snapPoint]}>
        <AddDateForm
          onSuccess={handleSheetClose}
          onContentExpand={handleExpand}
          onContentDecrease={handleDecrease}
          onClose={handleSheetClose}
        />
      </BottomSheetModal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wrapper_android: {
    position: 'absolute',
    width: `${100}%`,
    bottom: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  wrapper_ios: {
    position: 'absolute',
    width: `${100}%`,
    bottom: 0,
    height: verticalScale(80),
    paddingBottom: initialWindowMetrics?.insets.bottom || 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
  add_btn: {
    width: moderateScale(55),
    height: moderateScale(55),
    borderRadius: 999,
    alignSelf: 'center',
    marginBottom: verticalScale(20),
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
