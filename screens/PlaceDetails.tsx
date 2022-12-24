import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from '../navigators/NativeStack';
import PressableButton from '../components/UI/PressableButton';
import GlobalStyles from '../constants/styles';
import Place from '../models/Place';
import { useEffect, useState } from 'react';
import Fallback from '../components/Fallback/Fallback';

type PlaceDetailsProps = NativeStackScreenProps<StackParams, 'Details'>;

const PlaceDetails = ({ route, navigation }: PlaceDetailsProps) => {
  const [place, setPlace] = useState<Place>();

  const showMapHandler = () => {
    navigation.navigate('Map', {
      defaultLocation: place?.lat && place?.lng
        ? {
            lat: place.lat || 0,
            lng: place.lng || 0,
          }
        : undefined,
    });
  };

  useEffect(() => {
    if (route.params?.place) {
      setPlace(route.params.place);
      navigation.setOptions({ title: route.params.place.title });
    }
  }, [route]);

  if (!place) {
    return <Fallback>Loading fetched data...</Fallback>;
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place?.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place?.address}</Text>
        </View>
        <PressableButton iconName="map" onPress={showMapHandler}>
          View on Map
        </PressableButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: GlobalStyles.colors.generalText,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default PlaceDetails;
