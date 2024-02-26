import React, { useEffect, useRef } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Picker } from 'react-native-wheel-pick';

import { months } from './months';
import { years } from './years';

import Colors from '@/constants/Colors';
import { useTheme } from '@/hooks/use-theme';

const days = Array.from(Array(31).keys()).map((day) => day + 1);

type Props = {
  showYear: boolean;
};

export const DatePicker = ({ showYear }: Props) => {
  const { control, getValues } = useFormContext();
  const { theme } = useTheme();
  const yearRef = useRef();

  const selectedYear = getValues().year;

  useEffect(() => {
    // if (selectedYear) {
    //   if (yearRef.current && isFirstRenderRef.current) {
    //     // @ts-ignore
    //     yearRef.current?.handleChange(`${selectedYear}`);
    //     isFirstRenderRef.current = false;
    //   }
    //   return;
    // }
    // if (yearRef.current && isFirstRenderRef.current && showYear) {
    //   // @ts-ignore
    //   yearRef.current?.handleChange(`${new Date().getFullYear()}`);
    //   isFirstRenderRef.current = false;
    // }
  }, [showYear, selectedYear, yearRef]);

  // useFirstRender(() => {

  // }, [])

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
          render={({ field: { onChange, value } }) => {
            return (
              <Picker
                ref={yearRef}
                itemStyle={{
                  fontSize: 14,
                  fontFamily: 'PoppinsRegular',
                  height: 150,
                }}
                textColor={Colors[theme].text}
                style={{ width: '30%', backgroundColor: 'transparent', height: 150 }}
                pickerData={years}
                selectedValue={value}
                onValueChange={onChange}
                // Android
                textSize={18}
                isShowSelectBackground={false}
              />
            );
          }}
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
