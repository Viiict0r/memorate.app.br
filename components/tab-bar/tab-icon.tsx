import { Octicons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, useColorScheme } from 'react-native';

import Colors from '@/constants/Colors';

type Props = {
  icon: 'home' | 'gear';
  isActive: boolean;
};

export const TabBarIcon = ({ icon, isActive }: Props) => {
  const theme = useColorScheme() ?? 'light';

  if (!isActive) {
    /** Return normal icon */
    return <Octicons name={icon} size={24} color={Colors[theme].tabbar.inactive_icon} />;
  }

  return (
    <MaskedView
      maskElement={
        <View style={styles.mask_view}>
          <Octicons name={icon} size={24} />
        </View>
      }>
      <LinearGradient colors={['#FFB950', '#FF3A3A']}>
        <Octicons name={icon} size={24} style={{ opacity: 0 }} />
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  mask_view: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
