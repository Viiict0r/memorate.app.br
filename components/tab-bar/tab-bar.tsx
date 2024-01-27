import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router, usePathname } from 'expo-router';
import { Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabBarIcon } from './tab-icon';

import Colors from '@/constants/Colors';

type TabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

export const TabBar = ({ state, descriptors }: TabBarProps) => {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const theme = useColorScheme() ?? 'light';

  const styles = TabBarStyles(theme);

  const navigateToHome = () => router.navigate('/');
  const navigateToSettings = () => router.navigate('settings');

  return (
    <View
      style={{
        ...styles.wrapper,
        marginBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      <Pressable style={{ zIndex: 2 }} onPress={() => router.navigate('modal')}>
        {({ pressed }) => (
          <LinearGradient
            colors={['#FFB950', '#FF3A3A']}
            style={{
              ...styles.plus_button,
              opacity: pressed ? 0.8 : 1,
            }}>
            <Feather name="plus" color="#fff" size={24} />
          </LinearGradient>
        )}
      </Pressable>

      <View style={styles.border}>
        <BlurView intensity={10} style={styles.container}>
          <Pressable onPress={navigateToHome}>
            <TabBarIcon isActive={pathname === '/'} icon="home" />
          </Pressable>
          <Pressable onPress={navigateToSettings}>
            <TabBarIcon isActive={pathname.includes('settings')} icon="gear" />
          </Pressable>
        </BlurView>
      </View>
    </View>
  );
};

const TabBarStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    wrapper: {
      position: 'absolute',
      flex: 1,
      bottom: 0,
      width: `${100}%`,
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    border: {
      borderRadius: 999,
      overflow: 'hidden',
      width: '100%',
      maxWidth: 216,
      backgroundColor: 'null',
      borderWidth: 1,
      borderColor: Colors[theme].tabbar.border,
      zIndex: 1,
      flex: 1,
    },
    container: {
      width: `${100}%`,
      height: 54,
      maxWidth: 216,
      backgroundColor: Colors[theme].tabbar.background,
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingRight: 32,
      paddingLeft: 32,
    },
    plus_button: {
      width: 48,
      height: 48,
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
