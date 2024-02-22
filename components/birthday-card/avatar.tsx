import { Image, ImageStyle, StyleProp, StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';
import { useTheme } from '@/hooks/use-theme';
import { moderateScale } from '@/utils/metrics';

type Props = {
  src?: string;
  size?: number;
  styles?: StyleProp<ImageStyle>;
};

export const Avatar = ({ src, size = moderateScale(50), styles: propStyles }: Props) => {
  const { theme } = useTheme();

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
      height: moderateScale(50),
      width: moderateScale(50),
      borderRadius: moderateScale(50),
      borderWidth: 2,
      borderColor: Colors[theme].avatar_placeholder.border,
      backgroundColor: Colors[theme].avatar_placeholder.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
