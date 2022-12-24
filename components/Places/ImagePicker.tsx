import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import * as Picker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import GlobalStyles from '../../constants/styles';
import PressableButton from '../UI/PressableButton';

interface ImagePickerProps {
  onTakeImage?: (uri: string) => void;
}

const ImagePicker = ({ onTakeImage }: ImagePickerProps) => {
  const [pickedImage, setPickedImage] = useState<string>();
  const [requestPermissionInfo, requestPermission] =
    Picker.useCameraPermissions();

  useEffect(() => {
    onTakeImage && onTakeImage(pickedImage || "");
  }, [pickedImage]); 

  const checkPermissions = async () => {
    if (
      requestPermissionInfo?.status === Picker.PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (requestPermissionInfo?.status === Picker.PermissionStatus.DENIED) {
      Alert.alert(
        'Permission denied',
        'You need to grant camera permissions to use this app',
        [{ text: 'Okay' }]
      );
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermissions = await checkPermissions();
    if (!hasPermissions) return;
    let result = await Picker.launchCameraAsync({
      mediaTypes: Picker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPickedImage(uri);
    }
  };

  const imagePreview = pickedImage ? (
    <Image style={styles.image} source={{ uri: pickedImage }} />
  ) : (
    <Text style={{ color: GlobalStyles.colors.textAccent }}>
      No image taken yet
    </Text>
  );

  const removeImageHandler = () => {
    setPickedImage(undefined);
  };

  return (
    <View>
      <View style={styles.imagePreviewContainer}>{imagePreview}</View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonWrapper}>
          <PressableButton onPress={takeImageHandler}>
            Take photo
          </PressableButton>
        </View>
        {pickedImage && (
          <View style={styles.buttonWrapperWithLeftMargin}>
            <PressableButton
              iconName="trash"
              color={GlobalStyles.colors.danger}
              onPress={removeImageHandler}
            >
              Remove
            </PressableButton>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreviewContainer: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: GlobalStyles.colors.imagePreviewContainer,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 2,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonWrapper: {
    flex: 1,
  },
  buttonWrapperWithLeftMargin: {
    flex: 1,
    marginLeft: 8,
  },
});

export default ImagePicker;
