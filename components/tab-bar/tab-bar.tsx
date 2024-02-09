import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import { useUser } from '@/hooks/use-user';
import { addPerson } from '@/lib/firebase';
import { makePerson } from '@/types/person';

type TabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

export const TabBar = ({ state, descriptors }: TabBarProps) => {
  const insets = useSafeAreaInsets();
  const { user } = useUser();
  const theme = useColorScheme() ?? 'light';

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
      style={[
        styles.wrapper,
        {
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    flex: 1,
    bottom: 0,
    width: `${100}%`,
    alignItems: 'center',
  },
  container: {
    width: `${100}%`,
    height: 80,
    position: 'absolute',
    bottom: 0,
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
