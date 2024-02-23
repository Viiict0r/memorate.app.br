import { Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/text';
import { View as ThemedView } from '@/components/themed';
import Colors, { lighter } from '@/constants/Colors';
import { useTheme } from '@/hooks/use-theme';
import { verticalScale } from '@/utils/metrics';

const Header = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const goBack = () => router.back();

  return (
    <LinearGradient
      style={[{ paddingTop: insets.top }, styles.gradient_wrapper]}
      colors={Colors[theme].background_gradient}
      start={[0, 1]}
      end={[1, 0]}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}>
          <Pressable onPress={goBack}>
            {({ pressed }) => (
              <View style={[styles.back_btn, { opacity: pressed ? 0.5 : 1 }]}>
                <Octicons name="chevron-left" size={20} color={lighter} />
                <Text variant="cap1" lightColor={lighter} darkColor={lighter}>
                  VOLTAR
                </Text>
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

export function SettingsLayout({ children }: Props) {
  return (
    <View style={styles.container}>
      <Header />
      <ThemedView style={styles.content__bg}>{children}</ThemedView>
    </View>
  );
}

const LATERAL_PADDING = 27;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient_wrapper: {
    height: verticalScale(160),
    zIndex: 0,
  },
  content__bg: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
    marginTop: -28,
  },
  back_btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
});
