import { StyleSheet, View, Pressable } from 'react-native';

import { Avatar } from '../avatar';

import { Text } from '@/components/text';
import Colors from '@/constants/Colors';
import { useTheme } from '@/hooks/use-theme';
import { PersonView } from '@/lib/transform-data';
import { firstName } from '@/utils/first-name';

type Props = {
  data: PersonView;
};

export const RecentCard = ({ data }: Props) => {
  const { theme } = useTheme();
  const person = data.data;

  const getDescription = () => {
    const timeText = data.daysPast > 1 ? `há ${data.daysPast} dias` : 'ontem';

    if (data.data.birthday.year) {
      const age = new Date().getFullYear() - data.data.birthday.year;

      return `Fez ${age} ano${age > 1 ? 's' : ''} ${timeText}.`;
    }

    return `Ficou mais velho(a) ${timeText}.`;
  };

  return (
    <View
      style={[
        {
          backgroundColor: Colors[theme].birthday_card.recent.background,
        },
        styles.container,
      ]}>
      <View style={styles.name_container}>
        <Avatar
          src={person?.photo || ''}
          size={32}
          styles={{
            borderColor: Colors[theme].birthday_card.recent.text,
          }}
        />
        <View>
          <Text
            variant="sub1"
            numberOfLines={1}
            lightColor={Colors[theme].birthday_card.recent.text}
            darkColor={Colors[theme].birthday_card.recent.text}>
            {firstName(person.fullname)} •{' '}
            <Text
              variant="cap2"
              lightColor={Colors[theme].birthday_card.recent.text}
              darkColor={Colors[theme].birthday_card.recent.text}>
              {getDescription()}
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={{ maxWidth: 185 }}>
          <Text
            variant="cap1"
            lightColor={Colors[theme].birthday_card.recent.text}
            darkColor={Colors[theme].birthday_card.recent.text}>
            Ainda há tempo para desejar um{' '}
            <Text
              variant="cap0"
              lightColor={Colors[theme].birthday_card.recent.text}
              darkColor={Colors[theme].birthday_card.recent.text}>
              feliz aniversário atrasado!
            </Text>
          </Text>
        </View>
        <Pressable>
          {({ pressed }) => (
            <View
              style={[
                {
                  borderColor: Colors[theme].birthday_card.recent.text,
                  opacity: pressed ? 0.8 : 1,
                },
                styles.send_msg_btn,
              ]}>
              <Text
                variant="cap4"
                style={{
                  color: Colors[theme].birthday_card.recent.text,
                }}>
                Mensagem 🤭
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
    marginTop: 8,
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  send_msg_btn: {
    borderRadius: 48,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
