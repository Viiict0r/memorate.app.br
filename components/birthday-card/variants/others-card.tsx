import { StyleSheet, View, useColorScheme, Pressable } from 'react-native';

import { Avatar } from '../avatar';

import { Text } from '@/components/text';
import Colors from '@/constants/Colors';

export const OthersCard = () => {
  const theme = useColorScheme() || 'light';

  return (
    <View style={styles.container}>
      <View style={styles.date}>
        <Text variant="sub1">25</Text>
        <Text variant="body1">JUL</Text>
      </View>
      <Avatar src size={44} />
      <View style={styles.name}>
        <Text variant="sub1">
          Leticia <Text variant="sub2">Souza</Text>
        </Text>
        <Text variant="cap2">Prestes a fazer 23 anos 👀🎉</Text>
      </View>
      <View style={styles.days}>
        <Text variant="sub1">10</Text>
        <Text variant="body1">dias</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  date: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  name: {
    flexDirection: 'column',
    flex: 1,
  },
  days: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
