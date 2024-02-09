import { StyleSheet, View, useColorScheme, Text as NativeText, Pressable } from 'react-native';

import { Avatar } from '../avatar';

import { Text } from '@/components/text';
import Colors from '@/constants/Colors';
import { PersonView } from '@/lib/transform-data';

type Props = {
  data: PersonView;
};

export const TodayCard = ({ data }: Props) => {
  const theme = useColorScheme() || 'light';
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
        <Avatar src={person?.photo} />
        <View>
          <Text variant="sub1">{person.fullname}</Text>
          {age ? (
            <Text variant="body2">
              Fazendo <Text variant="body1">{age}</Text> hoje! 🎈
            </Text>
          ) : (
            <Text variant="body2">
              Fazendo <Text variant="body1">aniversário</Text> hoje! 🎈
            </Text>
          )}
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <NativeText style={{ fontSize: 22 }}>🎉</NativeText>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={{ maxWidth: 180 }}>
          <Text variant="cap1">
            Aproveite este dia para desejar um <Text variant="cap0">feliz aniversário!</Text>
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

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
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
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
