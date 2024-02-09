import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router, usePathname } from 'expo-router';
import { Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabBarIcon } from './tab-icon';

import Colors from '@/constants/Colors';
import { useUser } from '@/hooks/use-user';
import { addPerson, getPersons } from '@/lib/firebase';
import { makePerson } from '@/types/person';

type TabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

export const TabBar = ({ state, descriptors }: TabBarProps) => {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const { user } = useUser();
  const theme = useColorScheme() ?? 'light';

  const styles = TabBarStyles(theme);

  const navigateToHome = () => router.navigate('/');
  const navigateToSettings = () => router.navigate('settings');

  const teste = () => {
    addPerson(
      user!.uid,
      makePerson({
        fullname: 'Enzo 3',
        photo:
          'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fHww',
        birthday: {
          day: 4,
          month: 3,
          year: 2005,
        },
      }),
    );
  };

  return (
    <View
      style={{
        ...styles.wrapper,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
        style={styles.container}
      />

      <View
        style={{
          marginBottom: insets.bottom + 50,
        }}>
        <Pressable onPress={teste}>
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
      </View>
      {/* </LinearGradient> */}

      {/* <View style={styles.border}>
        <BlurView intensity={10} style={styles.container}>
          <Pressable onPress={navigateToHome}>
            <TabBarIcon isActive={pathname === '/'} icon="home" />
          </Pressable>
          <Pressable onPress={navigateToSettings}>
            <TabBarIcon isActive={pathname.includes('settings')} icon="gear" />
          </Pressable>
        </BlurView>
      </View> */}
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
      height: 80,
      position: 'absolute',
      // justifyContent: 'space-between',
      // alignItems: 'center',
      // flexDirection: 'row',
      bottom: 0,
      // paddingRight: 32,
      // paddingLeft: 32,
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
