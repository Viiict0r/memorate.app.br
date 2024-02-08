import { StyleSheet, View, useColorScheme, Pressable } from 'react-native';

import { Avatar } from '../avatar';

import { Text } from '@/components/text';
import Colors from '@/constants/Colors';

export const RecentCard = () => {
  const theme = useColorScheme() || 'light';

  return (
    <View
      style={[
        {
          backgroundColor: Colors[theme].birthday_card.recent.background,
        },
        styles.container,
      ]}>
      <View style={styles.name_container}>
        <Avatar src size={32} />
        <View>
          <Text variant="sub1">
            Joseph • <Text variant="cap2">Fez 45 anos há 2 dias.</Text>
          </Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={{ maxWidth: 185 }}>
          <Text variant="cap1">
            Ainda há tempo para desejar um <Text variant="cap0">feliz aniversário atrasado!</Text>
          </Text>
        </View>
        <Pressable>
          {({ pressed }) => (
            <View
              style={[
                {
                  borderColor: Colors[theme].birthday_card.today.btn_background,
                  opacity: pressed ? 0.8 : 1,
                },
                styles.send_msg_btn,
              ]}>
              <Text
                variant="cap4"
                style={{ color: Colors[theme].birthday_card.today.btn_background }}>
                Mensagem 🫢
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
