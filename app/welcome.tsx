import { StyleSheet, View } from 'react-native';

import { TextBold } from '@/components/styled-text';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <TextBold>@gorhom/react-native-bottom-sheet</TextBold>
      <TextBold>Bem vindo(a)!</TextBold>
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
