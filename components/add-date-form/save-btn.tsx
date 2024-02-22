import { ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Text } from '../text';

type Props = {
  onPress: () => void;
  disabled?: boolean;
};

export const SaveButton = ({ onPress, disabled = false }: Props) => (
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
    }}>
    <Text variant="button1" lightColor="#fff" darkColor="#fff">
      {!disabled && 'Salvar'}
      {disabled && <ActivityIndicator color="#fff" size="small" />}
    </Text>
  </TouchableOpacity>
);
