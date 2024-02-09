import { Octicons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TextMedium } from '@/components/styled-text';
import { View } from '@/components/themed';
import Colors from '@/constants/Colors';

const Header = () => {
  const theme = useColorScheme() || 'light';
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      style={[{ paddingTop: insets.top }, styles.gradient_wrapper]}
      colors={Colors[theme].background_gradient}
      start={[0, 1]}
      end={[1, 0]}>
      <View style={styles.header}>
        <Image
          style={styles.header__logo}
          source={require(`../assets/images/memorate-light.png`)}
        />
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}>
          <Pressable>
            {({ pressed }) => (
              <View style={[{ opacity: pressed ? 0.6 : 1 }, styles.header__premium_btn]}>
                <MaskedView
                  maskElement={
                    <View style={styles.header__mask_view}>
                      <Octicons name="star-fill" size={10} />
                    </View>
                  }>
                  <LinearGradient style={{ flex: 1 }} colors={Colors.dark.background_gradient}>
                    <Octicons name="star-fill" size={10} />
                  </LinearGradient>
                </MaskedView>
                <MaskedView
                  maskElement={<TextMedium size={12}>Premium</TextMedium>}
                  style={{ marginBottom: -1 }}>
                  <LinearGradient colors={Colors.dark.background_gradient}>
                    <TextMedium style={{ color: 'transparent' }} size={12}>
                      Premium
                    </TextMedium>
                  </LinearGradient>
                </MaskedView>
              </View>
            )}
          </Pressable>
          <Pressable>
            {({ pressed }) => (
              <View style={[{ opacity: pressed ? 0.6 : 1 }, styles.header__settings_btn]}>
                <Octicons name="gear" size={16} color="#fff" />
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

type Props = {
  children: React.ReactNode;
};

export function HomeLayout({ children }: Props) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content__bg}>{children}</View>
    </View>
  );
}

const LATERAL_PADDING = 27;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient_wrapper: {
    height: 150,
    zIndex: 0,
  },
  content__bg: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginTop: -28,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    paddingHorizontal: LATERAL_PADDING,
    flexDirection: 'row',
    gap: 10,
    flex: 1,
  },
  header__logo: {
    height: 22,
    width: 156,
  },
  header__mask_view: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header__premium_btn: {
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 99,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 12,
  },
  header__settings_btn: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 99,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
