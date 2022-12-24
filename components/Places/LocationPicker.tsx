import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import GlobalStyles from '../../constants/styles';
import PressableButton from '../UI/PressableButton';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';
import { useState, useEffect } from 'react';
import { getAddress, getMapPreview } from '../../utils/location';
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import { StackParams } from '../../navigators/NativeStack';

interface LocationPickerProps {
  onPickLocation?: (location: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
}

const LocationPicker = ({ onPickLocation }: LocationPickerProps) => {
  const [requestPermissionInfo, requestPermission] = useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState<{
    lat: number;
    lng: number;
  }>();
  const navigation = useNavigation<NavigationProp<StackParams, 'Map'>>();
  const route = useRoute<RouteProp<StackParams, 'Map'>>();

  useEffect(() => {
    if (route.params?.pickedLocation)
      setPickedLocation({
        lat: route.params.pickedLocation.lat,
        lng: route.params.pickedLocation.lng,
      });
  }, [route.params]);

  useEffect(() => {
    const getReadableAddress = async () => {
      if (!pickedLocation) return;
      const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
      onPickLocation && onPickLocation({
        lat: pickedLocation.lat,
        lng: pickedLocation.lng,
        address,
      });
    };
    getReadableAddress();
  }, [pickedLocation]);

  const checkPermissions = async () => {
    if (requestPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (requestPermissionInfo?.status === PermissionStatus.DENIED) {
      let denied = false;
      Alert.alert(
        'Permission denied',
        'You need to grant location permissions to use this app',
        [
          { text: 'Okay' },
          {
            text: 'Request',
            onPress: async () => {
              const requestedPermission = await requestPermission();
              if (requestedPermission.granted) {
                denied = true;
                Alert.alert(
                  'Permission granted',
                  'You can now use the location picker'
                );
              }
            },
          },
        ]
      );
      return denied;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermissions = await checkPermissions();
    if (!hasPermissions) return;
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };
  const pickOnMapHandler = () => {
    navigation.navigate('Map', { pickedLocation });
  };

  const LocationPreview = pickedLocation ? (
    <Image
      source={{
        uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
      }}
      style={styles.image}
    />
  ) : (
    <Text style={{ color: GlobalStyles.colors.textAccent }}>
      No location picked yet
    </Text>
  );

  return (
    <View>
      <View style={styles.mapPreview}>{LocationPreview}</View>
      <View style={styles.actions}>
        <View style={styles.buttonWrapper}>
          <PressableButton iconName="location" onPress={getLocationHandler}>
            GPS
          </PressableButton>
        </View>
        <View style={styles.buttonWrapper}>
          <PressableButton iconName="map" onPress={pickOnMapHandler}>
            Pick on map
          </PressableButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 0.49,
  },
});

export default LocationPicker;
