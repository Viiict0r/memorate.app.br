import * as ImagePicker from 'expo-image-picker';

export default function useImagePicker() {
  const pickImage = async (onImageSelect: (asset: ImagePicker.ImagePickerAsset) => void) => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      onImageSelect(result.assets[0]);
    }
  };

  return { pickImage };
}
