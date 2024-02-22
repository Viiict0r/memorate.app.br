import { Octicons } from '@expo/vector-icons';
import { Image, StyleSheet, View, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Text } from '@/components/text';
import { darkgrey, grey, grey3, red } from '@/constants/Colors';
import { PersonView } from '@/lib/transform-data';
import { parseMonth } from '@/utils/month-parser';

type Props = {
  data: PersonView;
  highlighted: boolean;
};

const LATERAL_PADDING = 27;

export const OthersCard = ({ data, highlighted }: Props) => {
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

  const renderActions = (progress: Animated.AnimatedInterpolation<number>) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [72 * 2, 0],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={{
          flexDirection: 'row',
          height: '100%',
          transform: [{ translateX: trans }],
        }}>
        <Animated.View
          style={{
            width: 72,
            backgroundColor: '#FFB950',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Octicons name="gear" size={20} color="#fff" />
        </Animated.View>
        <Animated.View
          style={{
            width: 72,
            backgroundColor: red,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Octicons name="trash" size={20} color="#fff" />
        </Animated.View>
      </Animated.View>
    );
  };

  return (
    <Swipeable overshootLeft={false} overshootRight={false} renderRightActions={renderActions}>
      <View style={styles.container}>
        <View style={styles.date}>
          <Text variant="sub1" lightColor={grey3} darkColor={highlighted ? grey : grey3}>
            {String(person.birthday.day).padStart(2, '0')}
          </Text>
          <Text variant="body1" lightColor={grey3} darkColor={highlighted ? grey : grey3}>
            {parseMonth(person.birthday.month)}
          </Text>
        </View>
        <View
          style={{
            padding: 1,
            borderRadius: 99,
            overflow: 'hidden',
            width: 44,
            height: 44,
            borderWidth: 2,
            borderColor: highlighted ? grey : grey3,
          }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 99,
            }}
            source={
              data.data.photo
                ? { uri: data.data.photo }
                : require(`../../../assets/images/no-photo.png`)
            }
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
            darkColor={highlighted ? darkgrey : grey3}>{`dia${data.daysLeft > 1 ? 's' : ''}`}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: LATERAL_PADDING,
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
