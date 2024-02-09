import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View } from 'react-native';

import { Text } from './text';

import Colors from '@/constants/Colors';

type Props = {
  label: string;
  topMargin?: number;
};

export const MonthDivider = ({ label, topMargin = 12 }: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        marginTop: topMargin,
        marginBottom: 9,
      }}>
      <LinearGradient colors={Colors.dark.background_gradient} style={{ height: 1, flex: 1 }} />
      <MaskedView maskElement={<Text variant="sub1">{label}</Text>}>
        <LinearGradient colors={Colors.dark.background_gradient} start={[0, 1]} end={[1, 0]}>
          <Text variant="sub1" style={{ color: 'transparent' }}>
            {label}
          </Text>
        </LinearGradient>
      </MaskedView>
      <LinearGradient colors={Colors.dark.background_gradient} style={{ height: 1, flex: 1 }} />
    </View>
  );
};
