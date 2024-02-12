import React from 'react';
import { StyleSheet } from 'react-native';

import { Text } from './text';
import { View } from './themed';

import { lightgrey } from '@/constants/Colors';

export const AddNewForm = () => {
  return (
    <View style={styles.container}>
      <Text variant="h2">Adicionar data</Text>

      {/* <View style={styles.photo_container}>
        <Text variant="h2">Adicionar data</Text>
        <TextInput />
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          backgroundColor: '#007AFF',
          paddingVertical: 14,
          width: '100%',
          borderRadius: 99,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text variant="button1" lightColor="#fff" darkColor="#fff">
          Salvar
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  photo_container: {
    borderRadius: 8,
    backgroundColor: lightgrey,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
