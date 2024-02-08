import { Pressable, StyleSheet, View, useColorScheme } from 'react-native';

import { Avatar } from './avatar';
import { OthersCard } from './variants/others-card';
import { RecentCard } from './variants/recent-card';
import { TodayCard } from './variants/today-card';
import { TextBold, TextMedium, TextRegular } from '../styled-text';

import Colors from '@/constants/Colors';

type Props = {
  avatar: boolean;
  variant: 'today' | 'recent' | 'others';
};

const variants = {
  today: TodayCard,
  recent: RecentCard,
  others: OthersCard,
};

export const BirthdayCard = ({ avatar, variant }: Props) => {
  const theme = useColorScheme() ?? 'dark';

  const Component = variants[variant];

  return <Component />;
  // return (
  //   <Pressable>
  //     {({ pressed }) => (
  //       <View style={[styles.container, { opacity: pressed ? 0.8 : 1 }]}>
  //         {showBirthdayDate && (
  //           <View style={styles.date}>
  //             <TextMedium size={14}>25</TextMedium>
  //             <TextBold size={12} style={{ color: Colors[theme].text_gray }}>
  //               JUL
  //             </TextBold>
  //           </View>
  //         )}
  //         <Avatar src={avatar} />
  //         <View style={styles.name}>
  //           <TextRegular size={14}>Leticia</TextRegular>
  //           <TextRegular size={12} style={{ color: Colors[theme].text_gray }}>
  //             Prestes a fazer 23 anos
  //           </TextRegular>
  //         </View>
  //         <View style={styles.days}>
  //           <TextMedium size={14}>02</TextMedium>
  //           <TextRegular size={12} style={{ color: Colors[theme].text_gray }}>
  //             dias
  //           </TextRegular>
  //         </View>
  //       </View>
  //     )}
  //   </Pressable>
  // );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  date: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  name: {
    flexDirection: 'column',
    flex: 1,
  },
  days: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
