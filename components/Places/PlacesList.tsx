import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet } from 'react-native';
import Place, { IPlace } from '../../models/Place';
import { StackParams } from '../../navigators/NativeStack';
import Fallback from '../Fallback/Fallback';
import PlaceItem from './PlaceItem';

interface PlacesListProps {
  places: IPlace[];
}

const PlacesList = ({ places }: PlacesListProps) => {
  const navigation = useNavigation<NavigationProp<StackParams>>();

  if (places.length === 0 || !places)
    return <Fallback>No places added yet, please add some</Fallback>;

  const showDetailsHandler = (place?: Place) => {
    navigation.navigate('Details', { place });
  };

  return (
    <FlatList
      data={places}
      renderItem={({ item }) => <PlaceItem onPlacePress={showDetailsHandler} {...item}/>}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
});

export default PlacesList;
