import { ImagePickerAsset } from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ActivityIndicator, Alert, Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Text } from '../text';

import useImagePicker from '@/hooks/use-image-picker';
import { api } from '@/lib/axios';

type Props = {
  onUploadStart: () => void;
  onUploadFinish: () => void;
};

type UploadResponse = {
  imageUrl: string;
};

enum UploadStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const AvatarUpload = ({ onUploadFinish, onUploadStart }: Props) => {
  const [uri, setURI] = useState<string | null>(null);
  const [status, setStatus] = useState<UploadStatus>(UploadStatus.IDLE);
  const { setValue } = useFormContext();
  const { pickImage } = useImagePicker();

  const onImageSelect = async (image: ImagePickerAsset) => {
    setStatus(UploadStatus.LOADING);
    setURI(image.uri);

    const url = image.uri.replace('file://', '');
    const filename = image.uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename as string);
    const ext = match?.[1];
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    formData.append('photo', {
      uri: url,
      name: `avatar.${ext}`,
      type,
    } as any);

    try {
      const { data } = await api.post<UploadResponse>('/photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setValue('photo', data.imageUrl);
      setStatus(UploadStatus.SUCCESS);
    } catch (error) {
      console.error(error);
      Alert.alert('Ops...', 'Ocorreu um erro ao realizar upload da foto, tente novamente.');
    }
  };

  const isLoading = status === UploadStatus.LOADING;

  useEffect(() => {
    if (status === UploadStatus.LOADING) {
      onUploadStart();
      return;
    }

    onUploadFinish();
  }, [status]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading}
      onPress={() => pickImage(onImageSelect)}
      style={styles.container}>
      <Image
        style={styles.avatar}
        source={
          uri
            ? {
                uri,
              }
            : require(`../../assets/images/no-photo.png`)
        }
      />
      {status === UploadStatus.LOADING && (
        <View style={styles.loading}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      )}
      <Text variant="cap1">Editar</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 99,
  },
  loading: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 99,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
