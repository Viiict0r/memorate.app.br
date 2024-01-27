import { StyleSheet, useColorScheme } from 'react-native';

import { TextBold } from '@/components/styled-text';
import { View } from '@/components/themed';
import Colors from '@/constants/Colors';

export default function TabTwoScreen() {
  const theme = useColorScheme() ?? 'dark';

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: Colors[theme].background,
      }}>
      <TextBold>teste</TextBold>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
