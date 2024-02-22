import React, { useState } from 'react';
import { Switch, View } from 'react-native';

import { DatePicker } from '../date-picker';
import { Text } from '../text';

import { grey } from '@/constants/Colors';

type Props = {
  active: boolean;
};

const Divider = ({ opacity = 0.15 }: { opacity?: number }) => (
  <View
    style={{
      width: '100%',
      height: 1,
      backgroundColor: grey,
      opacity,
    }}
  />
);

export const BirthdayPicker = ({ active }: Props) => {
  const [showYear, setShowYear] = useState(false);
  const toggleShowYear = () => setShowYear(!showYear);

  return active ? (
    <View style={{ display: active ? 'flex' : 'flex' }}>
      <DatePicker showYear={showYear} />

      <Divider />

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          paddingVertical: 12,
        }}>
        <View style={{ flex: 1 }}>
          <Text variant="body1">Sabe o ano de nascimento? 👀</Text>
        </View>
        <Switch onChange={toggleShowYear} value={showYear} />
      </View>

      <Divider />
    </View>
  ) : null;
};
