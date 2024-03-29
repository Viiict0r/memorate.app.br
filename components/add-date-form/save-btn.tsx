import { ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Text } from '../text';

import { horizontalScale } from '@/utils/metrics';

type Props = {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export const SaveButton = ({ onPress, disabled = false, loading = false }: Props) => (
  <TouchableOpacity
    activeOpacity={0.5}
    disabled={disabled}
    onPress={onPress}
    style={{
      backgroundColor: '#007AFF',
      paddingVertical: 14,
      width: '100%',
      opacity: disabled ? 0.6 : 1,
      borderRadius: 99,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: horizontalScale(10),
    }}>
    <Text variant="button1" lightColor="#fff" darkColor="#fff">
      {!loading && 'Salvar'}
      {loading && <ActivityIndicator color="#fff" size="small" />}
    </Text>
  </TouchableOpacity>
);
