import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker, Region, MapPressEvent } from 'react-native-maps';
import { useState, useCallback, useEffect } from 'react';
import { StackParams } from '../navigators/NativeStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import PressableIcon from '../components/UI/PressableIcon';
import { HeaderButtonProps } from '@react-navigation/native-stack/src/types';

interface MapProps extends NativeStackScreenProps<StackParams, 'Map'> {}

const Map = ({ navigation, route }: MapProps) => {
  const region: Region = {
    latitude: route.params?.defaultLocation
      ? route.params?.defaultLocation.lat
      : 37.78825,
    longitude: route.params?.defaultLocation
      ? route.params?.defaultLocation.lng
      : -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: region.latitude,
    lng: region.longitude,
  });

  const selectLocationHandler = (event: MapPressEvent) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat, lng });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) return Alert.alert('No location selected');
    navigation.navigate('AddPlace', { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useLayoutEffect(() => {
    if (route.params?.defaultLocation) return;
    navigation.setOptions({
      headerRight: ({ tintColor }: HeaderButtonProps) => {
        return (
          <PressableIcon
            name="save"
            size={20}
            color={tintColor || 'black'}
            onPress={savePickedLocationHandler}
          />
        );
      },
    });
  }, [navigation, selectedLocation]);

  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {selectedLocation?.lat && selectedLocation?.lng && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
