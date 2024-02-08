import { StyleSheet, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TextBold } from '@/components/styled-text';
import { View } from '@/components/themed';
import Colors from '@/constants/Colors';

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();
  const theme = useColorScheme() ?? 'dark';

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 70,
          paddingBottom: insets.bottom,
          paddingRight: insets.right + 27,
          paddingLeft: insets.left + 27,
        },
      ]}>
      <TextBold size={30}>Ajustes</TextBold>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
