import { StyleSheet, View, Text as NativeText, Pressable, Dimensions } from 'react-native';

import { Avatar } from '../avatar';

import { Text } from '@/components/text';
import Colors, { darker } from '@/constants/Colors';
import { useTheme } from '@/hooks/use-theme';
import { PersonView } from '@/lib/transform-data';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics';

type Props = {
  data: PersonView;
};

export const TodayCard = ({ data }: Props) => {
  const { theme } = useTheme();
  const person = data.data;

  const getAge = () => {
    if (data.data.birthday.year) {
      const age = new Date().getFullYear() - data.data.birthday.year;

      return `${age} ano${age > 1 ? 's' : ''}`;
    }

    return null;
  };

  const age = getAge();

  return (
    <View
      style={[
        {
          backgroundColor: Colors[theme].birthday_card.today.background,
        },
        styles.container,
      ]}>
      <View style={styles.name_container}>
        <Avatar src={person?.photo || ''} />
        <View>
          <Text variant="sub1" numberOfLines={1} style={{ color: darker }}>
            {person.fullname}
          </Text>
          {age ? (
            <Text variant="body2" style={{ color: darker }}>
              Fazendo{' '}
              <Text variant="body1" style={{ color: darker }}>
                {age}
              </Text>{' '}
              hoje! 🎈
            </Text>
          ) : (
            <Text variant="body2" style={{ color: darker }}>
              Fazendo{' '}
              <Text variant="body1" style={{ color: darker }}>
                aniversário
              </Text>{' '}
              hoje! 🎈
            </Text>
          )}
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <NativeText style={{ fontSize: moderateScale(22) }}>🎉</NativeText>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={{ maxWidth: horizontalScale(180) }}>
          <Text variant="cap1" style={{ color: darker }}>
            Aproveite este dia para desejar um{' '}
            <Text variant="cap0" style={{ color: darker }}>
              feliz aniversário!
            </Text>
          </Text>
        </View>
        <Pressable>
          {({ pressed }) => (
            <View
              style={[
                {
                  backgroundColor: Colors[theme].birthday_card.today.btn_background,
                  opacity: pressed ? 0.8 : 1,
                },
                styles.send_msg_btn,
              ]}>
              <Text variant="cap4" style={{ color: '#fff' }}>
                Enviar mensagem
              </Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const LATERAL_PADDING = 27;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
    width: Dimensions.get('screen').width - LATERAL_PADDING * 2,
  },
  name_container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  bottom: {
    marginTop: 15,
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  send_msg_btn: {
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(8),
  },
});
