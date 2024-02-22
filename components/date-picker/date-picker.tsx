import React, { useEffect, useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { Picker } from 'react-native-wheel-pick';

import { months } from './months';

import Colors from '@/constants/Colors';

const days = Array.from(Array(31).keys()).map((day) => day + 1);

type Props = {
  showYear: boolean;
};

export const DatePicker = ({ showYear }: Props) => {
  const { control, setValue, getValues } = useFormContext();
  const theme = useColorScheme() || 'light';

  const years = useMemo(() => {
    const y = [];
    const currentYear = new Date().getFullYear();

    for (let i = currentYear - 100; i <= currentYear; i++) {
      y.push(i);
    }

    return y;
  }, []);

  const selectedYear = getValues().year;

  useEffect(() => {
    if (selectedYear) return;

    setValue('year', null);
  }, [showYear, selectedYear]);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="day"
        render={({ field: { onChange, value } }) => (
          <Picker
            itemStyle={{
              fontSize: 14,
              fontFamily: 'PoppinsRegular',
              height: 150,
            }}
            textColor={Colors[theme].text}
            style={{ width: showYear ? '30%' : '40%', backgroundColor: 'transparent', height: 150 }}
            selectedValue={value}
            pickerData={days}
            onValueChange={onChange}
            // Android
            textSize={18}
            isShowSelectBackground={false}
          />
        )}
      />

      <Controller
        control={control}
        name="month"
        render={({ field: { onChange, value } }) => (
          <Picker
            itemStyle={{
              fontSize: 14,
              fontFamily: 'PoppinsRegular',
              height: 150,
            }}
            textColor={Colors[theme].text}
            style={{ width: showYear ? '40%' : '60%', backgroundColor: 'transparent', height: 150 }}
            selectedValue={value}
            pickerData={months}
            onValueChange={onChange}
            // Android
            textSize={18}
            isShowSelectBackground={false}
          />
        )}
      />

      {showYear && (
        <Controller
          control={control}
          name="year"
          render={({ field: { onChange, value } }) => (
            <Picker
              itemStyle={{
                fontSize: 14,
                fontFamily: 'PoppinsRegular',
                height: 150,
              }}
              textColor={Colors[theme].text}
              style={{ width: '30%', backgroundColor: 'transparent', height: 150 }}
              selectedValue={value}
              pickerData={years}
              onValueChange={onChange}
              // Android
              textSize={18}
              isShowSelectBackground={false}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
