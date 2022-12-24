import { useEffect, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { StackParams } from '../navigators/NativeStack';
import PlacesList from '../components/Places/PlacesList';
import Place from '../models/Place';
import { fetchPlaces } from '../utils/db';

type AllPlacesProps = NativeStackScreenProps<StackParams, 'AllPlaces'>;

const AllPlaces = ({ route }: AllPlacesProps) => {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const getPlaces = async () => {
      const places: any = await fetchPlaces();
      const fetchedData = places.rows._array as Place[];
      let placesArr: Place[] = []
      for (const place of fetchedData) {
        placesArr.push(new Place(place.title, place.imageUri, place.address, place.lat, place.lng, place.id))
      }
      setPlaces(fetchedData);
    };

    getPlaces();
  }, [route]);

  return <PlacesList places={places} />;
};

export default AllPlaces;
