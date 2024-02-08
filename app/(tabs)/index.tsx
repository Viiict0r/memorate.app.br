import { Octicons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, ScrollView, StyleSheet, useColorScheme, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BirthdayCard } from '@/components/birthday-card';
import { TextBold, TextMedium } from '@/components/styled-text';
import { View } from '@/components/themed';
import Colors from '@/constants/Colors';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const theme = useColorScheme() ?? 'dark';

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        style={[{ paddingTop: insets.top }, styles.container]}
        colors={Colors[theme].background_gradient}
        start={[0, 1]}
        end={[1, 0]}>
        <View style={styles.header}>
          <Image style={styles.logo} source={require(`../../assets/images/memorate-light.png`)} />
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}>
            <Pressable>
              {({ pressed }) => (
                <View style={[{ opacity: pressed ? 0.6 : 1 }, styles.premium_btn]}>
                  <MaskedView
                    maskElement={
                      <View style={styles.mask_view}>
                        <Octicons name="star-fill" size={10} />
                      </View>
                    }>
                    <LinearGradient style={{ flex: 1 }} colors={Colors.dark.background_gradient}>
                      <Octicons name="star-fill" size={10} />
                    </LinearGradient>
                  </MaskedView>
                  <MaskedView maskElement={<TextMedium size={12}>Premium</TextMedium>}>
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
                <View style={[{ opacity: pressed ? 0.6 : 1 }, styles.settings_btn]}>
                  <Octicons name="gear" size={16} color="#fff" />
                </View>
              )}
            </Pressable>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.content_wrapper}>
        <ScrollView style={styles.content}>
          <TextBold style={{ marginBottom: 8 }} size={20}>
            Hoje
          </TextBold>
          {/* Cards */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              marginHorizontal: -27,
              paddingHorizontal: 27,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                gap: 4,
              }}>
              <BirthdayCard variant="today" avatar />
              <BirthdayCard variant="today" avatar />
              <BirthdayCard variant="today" avatar />
            </View>
          </ScrollView>
          <TextBold style={{ marginBottom: 8, marginTop: 16 }} size={20}>
            Recentes
          </TextBold>
          <View
            style={{
              flex: 1,
              gap: 4,
            }}>
            <BirthdayCard variant="recent" avatar />
            <BirthdayCard variant="recent" avatar />
          </View>

          <TextBold style={{ marginBottom: 8, marginTop: 16 }} size={20}>
            Próximos
          </TextBold>
          <View
            style={{
              flex: 1,
              gap: 4,
            }}>
            <BirthdayCard variant="others" avatar />
            <BirthdayCard variant="others" avatar />
            <BirthdayCard variant="others" avatar />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const LATERAL_PADDING = 27;

type Styles = {
  theme: string;
  device_h: number;
  device_w: number;
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    zIndex: 0,
  },
  content_wrapper: {
    marginTop: -28,
    flex: 1,
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#fff',
    paddingTop: 24,
    paddingHorizontal: LATERAL_PADDING,
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
  logo: {
    height: 22,
    width: 156,
  },
  mask_view: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  premium_btn: {
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
  settings_btn: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 99,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
