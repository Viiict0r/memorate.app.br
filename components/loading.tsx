import { ActivityIndicator, View } from 'react-native';

export const Loading = () => (
  <View
    style={{
      marginTop: '60%',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <ActivityIndicator size="small" />
  </View>
);
