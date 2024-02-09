import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import { useUser } from '@/hooks/use-user';
import { addPerson } from '@/lib/firebase';
import { makePerson } from '@/types/person';

export const TabBar = () => {
  const { user } = useUser();
  const theme = useColorScheme() ?? 'light';

  const navigateToHome = () => router.navigate('/');
  const navigateToSettings = () => router.navigate('settings');

  const teste = () => {
    addPerson(
      user!.uid,
      makePerson({
        fullname: 'Victor',
        photo:
          'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fHww',
        birthday: {
          day: 7,
          month: 1,
          year: 2000,
        },
      }),
    );
  };

  return (
    <LinearGradient
      colors={['rgba(255,255,255,0.1)', 'rgba(255, 255, 255, 1)']}
      style={styles.wrapper}>
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: `${100}%`,
    bottom: 0,
    paddingBottom: (initialWindowMetrics?.insets.bottom || 0) + 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
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
