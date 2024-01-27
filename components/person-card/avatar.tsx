import { Image, StyleSheet, View, useColorScheme } from 'react-native';

import { TextMedium } from '../styled-text';

import Colors from '@/constants/Colors';

const test_url =
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fHww';

type Props = {
  src?: boolean; // TODO: Change to string and receive profile url
};

export const Avatar = ({ src }: Props) => {
  const theme = useColorScheme() ?? 'light';

  const styles = AvatarStyles(theme);

  return src ? (
    <Image
      style={styles.avatar}
      source={{
        uri: test_url,
      }}
    />
  ) : (
    <View style={styles.placeholder}>
      <TextMedium
        size={22}
        style={{
          color: Colors[theme].avatar_placeholder.border,
        }}>
        L
      </TextMedium>
    </View>
  );
};

const AvatarStyles = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    avatar: {
      height: 50,
      width: 50,
      borderRadius: 50,
    },
    placeholder: {
      height: 50,
      width: 50,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: Colors[theme].avatar_placeholder.border,
      backgroundColor: Colors[theme].avatar_placeholder.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
