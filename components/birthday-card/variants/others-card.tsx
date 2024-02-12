import { Image, StyleSheet, View } from 'react-native';

import { Text } from '@/components/text';
import { darkgrey, grey, grey3 } from '@/constants/Colors';
import { PersonView } from '@/lib/transform-data';
import { parseMonth } from '@/utils/month-parser';

type Props = {
  data: PersonView;
};

export const OthersCard = ({ data }: Props) => {
  const person = data.data;

  const getDescription = () => {
    const { birthday } = data.data;

    if (birthday.year) {
      const age = new Date().getFullYear() - birthday.year;

      if (data.daysLeft <= 20) {
        return `Prestes a fazer ${age} anos  👀🎉`;
      }

      if (data.daysLeft <= 90) {
        return `Aproximando-se dos ${age} anos ⏰`;
      }
    } else if (data.daysLeft <= 20) {
      return 'Aniversário chegando 🥳';
    } else if (data.daysLeft <= 90) {
      return 'Aniversário próximo ⏰';
    }

    return 'Faltam alguns meses... 😴';
  };

  const description = getDescription();

  return (
    <View style={styles.container}>
      <View style={styles.date}>
        <Text variant="sub1" lightColor={grey3} darkColor={grey3}>
          {String(person.birthday.day).padStart(2, '0')}
        </Text>
        <Text variant="body1" lightColor={grey3} darkColor={grey3}>
          {parseMonth(person.birthday.month)}
        </Text>
      </View>
      <View
        style={{
          padding: 1,
          borderRadius: 99,
          width: 44,
          height: 44,
          borderWidth: 2,
          borderColor: grey3,
        }}>
        <Image
          style={{
            width: '100%',
            height: '100%',
          }}
          source={require(`../../../assets/images/no-photo.png`)}
        />
      </View>
      <View style={styles.name}>
        <Text variant="button1" darkColor={grey}>
          {person.fullname}
        </Text>
        {description && (
          <Text variant="cap2" lightColor={darkgrey} darkColor={darkgrey}>
            {description}
          </Text>
        )}
      </View>
      <View style={styles.days}>
        <Text variant="sub1" lightColor={darkgrey} darkColor={darkgrey}>
          {String(data.daysLeft).padStart(2, '0')}
        </Text>
        <Text
          variant="body1"
          lightColor={grey3}
          darkColor={grey3}>{`dia${data.daysLeft > 1 ? 's' : ''}`}</Text>
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
