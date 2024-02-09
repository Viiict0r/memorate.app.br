import { StyleSheet, View } from 'react-native';

import { Avatar } from '../avatar';

import { Text } from '@/components/text';
import { PersonView } from '@/lib/transform-data';
import { parseMonth } from '@/utils/month-parser';

type Props = {
  data: PersonView;
};

export const OthersCard = ({ data }: Props) => {
  const person = data.data;

  return (
    <View style={styles.container}>
      <View style={styles.date}>
        <Text variant="sub1">{String(person.birthday.day).padStart(2, '0')}</Text>
        <Text variant="body1">{parseMonth(person.birthday.month)}</Text>
      </View>
      <Avatar src={person?.photo} size={44} />
      <View style={styles.name}>
        <Text variant="button1">
          {/* Leticia <Text variant="sub2">Souza</Text> */}
          {person.fullname}
        </Text>
        <Text variant="cap2">Prestes a fazer 23 anos 👀🎉</Text>
      </View>
      <View style={styles.days}>
        <Text variant="sub1">{data.daysLeft}</Text>
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
    alignItems: 'flex-start',
    width: 28,
  },
  name: {
    flexDirection: 'column',
    flex: 1,
  },
  days: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
});
