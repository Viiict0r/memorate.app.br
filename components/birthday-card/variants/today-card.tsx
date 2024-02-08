import { StyleSheet, View, useColorScheme, Text as NativeText, Pressable } from 'react-native';

import { Avatar } from '../avatar';

import { Text } from '@/components/text';
import Colors from '@/constants/Colors';

export const TodayCard = () => {
  const theme = useColorScheme() || 'light';

  return (
    <View
      style={[
        {
          backgroundColor: Colors[theme].birthday_card.today.background,
        },
        styles.container,
      ]}>
      <View style={styles.name_container}>
        <Avatar src />
        <View>
          <Text variant="sub1">Joseph Camolle</Text>
          <Text variant="body2">
            Fazendo <Text variant="body1">43 anos</Text> hoje! 🎈
          </Text>
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
