import { Image, ImageStyle, StyleProp, StyleSheet, useColorScheme } from 'react-native';

import Colors from '@/constants/Colors';

type Props = {
  src?: string;
  size?: number;
  styles?: StyleProp<ImageStyle>;
};

export const Avatar = ({ src, size = 50, styles: propStyles }: Props) => {
  const theme = useColorScheme() ?? 'light';

  const styles = AvatarStyles(theme);

  return (
    <Image
      style={[
        {
          width: size,
          height: size,
        },
        styles.avatar,
        propStyles,
      ]}
      source={
        src
          ? {
              uri: src,
            }
          : require(`../../assets/images/no-photo.png`)
      }
    />
  );
};

const AvatarStyles = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    avatar: {
      borderRadius: 50,
      borderWidth: 2,
      borderColor: '#fff',
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
