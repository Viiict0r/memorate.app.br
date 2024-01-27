import {
  Image,
  ImageProps,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TextBold, TextMedium, TextRegular } from '@/components/StyledText';
import { View } from '@/components/Themed';
import { PersonCard } from '@/components/person-card';

const logo = {
  light: (props: ImageProps) => (
    <Image
      {...props}
      source={require(`../../assets/images/memorate-logo-dark.png`)}
    />
  ),
  dark: (props: ImageProps) => (
    <Image
      {...props}
      source={require(`../../assets/images/memorate-logo-light.png`)}
    />
  ),
};

export default function TabOneScreen() {
  const insets = useSafeAreaInsets();
  const theme = useColorScheme() ?? 'dark';

  const Logo = logo[theme];

  return (
    <ScrollView
      style={{
        ...styles.container,
        paddingTop: insets.top,
      }}>
      <View style={styles.header}>
        <Logo style={styles.logo} />
      </View>
      <View style={styles.content}>
        <TextMedium size={18} style={styles.title}>
          Recentes
        </TextMedium>
        <View style={styles.grid}>
          <PersonCard />
          <PersonCard />
          <PersonCard />
        </View>
        <TextMedium size={18} style={styles.title}>
          Próximos
        </TextMedium>
        <View style={styles.grid}>
          <PersonCard />
          <PersonCard />
          <PersonCard />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingRight: 27,
    paddingLeft: 27,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
  },
  logo: {
    height: 22,
    width: 156,
  },
  title: {
    marginTop: 24,
  },
  grid: {
    paddingTop: 15,
    flexDirection: 'column',
    gap: 10,
  },
});
