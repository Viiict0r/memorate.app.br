import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Switch, View } from 'react-native';

import { DatePicker } from '../date-picker';
import { Text } from '../text';

import { grey } from '@/constants/Colors';

type Props = {
  active: boolean;
  initialShowYear: boolean;
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

export const BirthdayPicker = ({ active, initialShowYear }: Props) => {
  const { setValue, getValues } = useFormContext();
  const [showYear, setShowYear] = useState(initialShowYear);
  const toggleShowYear = () => setShowYear(!showYear);

  const values = getValues();

  useEffect(() => {
    if (!active) {
      return;
    }

    if (!values.day && !values.month) {
      setValue('day', '1');
      setValue('month', 'Janeiro');
    }
    if (showYear && !values.year) {
      setValue('year', String(new Date().getFullYear()));
    }
    if (!showYear && values.year) {
      setValue('year', null);
    }
  }, [values, active, showYear]);

  const canRender = values.month && values.day;

  return active && canRender ? (
    <View>
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
