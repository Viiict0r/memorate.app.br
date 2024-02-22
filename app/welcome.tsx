import AsyncStorage from '@react-native-async-storage/async-storage';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { initialWindowMetrics } from 'react-native-safe-area-context';

import { Text } from '@/components/text';
import Colors, { darker, lighter } from '@/constants/Colors';
import { useTheme } from '@/hooks/use-theme';
import { horizontalScale, verticalScale } from '@/utils/metrics';

export default function ModalScreen() {
  const { theme } = useTheme();

  const startNow = async () => {
    await AsyncStorage.setItem('is-first-open', 'no');

    router.navigate('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.head_image}>
        <Image
          style={{
            objectFit: 'cover',
            flex: 1,
            width: '100%',
          }}
          source={require('../assets/images/welcome.png')}
        />
      </View>
      <View style={styles.content}>
        <Text variant="h1">Boas vindas ao </Text>
        <MaskedView maskElement={<Text variant="h1">Memorate</Text>} style={{ marginTop: -6 }}>
          <LinearGradient colors={Colors.dark.background_gradient} start={[0, 1]} end={[1, 0]}>
            <Text variant="h1" style={{ color: 'transparent' }}>
              Memorate
            </Text>
          </LinearGradient>
        </MaskedView>
        <View style={styles.features}>
          <View style={styles.feature}>
            <Image
              style={[styles.icon, { opacity: theme === 'dark' ? 0.3 : 1 }]}
              source={require('../assets/images/icons/welcome-calendar-icon.png')}
            />
            <Text variant="sub2">Adicione a data de aniversário de amigos e familiares.</Text>
          </View>
          <View style={styles.feature}>
            <Image
              style={[styles.icon, { opacity: theme === 'dark' ? 0.3 : 1 }]}
              source={require('../assets/images/icons/welcome-lembrete-icon.png')}
            />
            <Text variant="sub2">Receba lembretes antecipados e planeje momentos especiais.</Text>
          </View>
          <View style={styles.feature}>
            <Image
              style={[styles.icon, { opacity: theme === 'dark' ? 0.3 : 1 }]}
              source={require('../assets/images/icons/welcome-cake-icon.png')}
            />
            <Text variant="sub2">
              Nunca mais deixe que uma data significativa passe despercebida.
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={startNow}
          style={{
            backgroundColor: theme === 'light' ? darker : lighter,
            paddingVertical: 14,
            width: '100%',
            borderRadius: 99,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text variant="button1" lightColor={lighter} darkColor={darker}>
            Comece agora.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: horizontalScale(36),
    paddingTop: verticalScale(32),
    paddingBottom: (initialWindowMetrics?.insets.bottom || 0) + verticalScale(32),
  },
  features: {
    flex: 1,
    paddingTop: verticalScale(32),
    gap: verticalScale(24),
  },
  feature: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    maxWidth: horizontalScale(270),
  },
  icon: {
    height: 32,
    width: 32,
    opacity: 0.3,
  },
  head_image: {
    width: '100%',
    height: verticalScale(340),
  },
});
