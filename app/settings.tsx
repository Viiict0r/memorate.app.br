import { useActionSheet } from '@expo/react-native-action-sheet';
import { Octicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { initialWindowMetrics } from 'react-native-safe-area-context';

import { TextSemiBold } from '@/components/styled-text';
import { Text } from '@/components/text';
import { View } from '@/components/themed';
import { darker, darkgrey, grey, grey4, lighter, lightgrey, orange } from '@/constants/Colors';
import { useTheme } from '@/hooks/use-theme';
import { SettingsLayout } from '@/layouts/settings-layout';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics';

export default function SettingsScreen() {
  const { theme, toggle } = useTheme();
  const { showActionSheetWithOptions } = useActionSheet();

  const changeTheme = () => {
    showActionSheetWithOptions(
      {
        options: ['Claro', 'Escuro', 'Cancelar'],
        message: 'Alterar tema',
        cancelButtonIndex: 2,
      },
      (index) => {
        switch (index) {
          case 0:
            theme === 'dark' && toggle();
            break;
          case 1:
            theme === 'light' && toggle();
            break;
          default:
            break;
        }
      },
    );
  };

  return (
    <SettingsLayout>
      <ScrollView
        style={[
          styles.container,
          {
            paddingBottom: initialWindowMetrics?.insets.bottom || 0,
          },
        ]}>
        <Text variant="h1">Ajustes</Text>

        <View style={styles.options}>
          {/* Options */}
          <TouchableOpacity disabled activeOpacity={0.6} style={[styles.option, { opacity: 0.5 }]}>
            <View style={[styles.option__icon, { backgroundColor: orange }]}>
              <Octicons name="star" size={moderateScale(15)} color={lighter} />
            </View>
            <View style={{ flex: 1 }}>
              <TextSemiBold size={moderateScale(14)} lineHeight={moderateScale(25)}>
                Fazer upgrade
              </TextSemiBold>
            </View>
            <Octicons name="chevron-right" size={moderateScale(15)} color={darkgrey} />
          </TouchableOpacity>

          <View
            style={[styles.separator, { backgroundColor: theme === 'dark' ? grey4 : lightgrey }]}
          />

          <TouchableOpacity activeOpacity={0.6} style={styles.option} onPress={changeTheme}>
            <View
              style={[
                styles.option__icon,
                { backgroundColor: theme === 'dark' ? lighter : darker },
              ]}>
              <Octicons
                name="sun"
                size={moderateScale(15)}
                color={theme === 'dark' ? darker : lighter}
              />
            </View>
            <View style={{ flex: 1 }}>
              <TextSemiBold size={moderateScale(14)} lineHeight={moderateScale(25)}>
                Alterar tema
              </TextSemiBold>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
              }}>
              <Text variant="sub2" darkColor={grey} lightColor={grey}>
                {theme === 'dark' ? 'Escuro' : 'Claro'}
              </Text>
              <Octicons name="chevron-right" size={15} color={darkgrey} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SettingsLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(28),
    paddingHorizontal: 27,
  },
  options: {
    flex: 1,
    justifyContent: 'center',
    marginTop: verticalScale(30),
  },
  option: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  option__icon: {
    height: moderateScale(25),
    width: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(5),
  },
  separator: {
    height: 1,
    marginHorizontal: horizontalScale(27) * -1,
    marginVertical: verticalScale(12),
  },
});
