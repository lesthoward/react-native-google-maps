import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from '../navigators/NativeStack';
import PlaceForm from '../components/Places/PlaceForm';
import Place from '../models/Place';
import { insertPlace } from '../utils/db';

type AllPlacesProps = NativeStackScreenProps<StackParams, 'AddPlace'>;

const AddPlace = ({ navigation }: AllPlacesProps) => {
  const createPlaceHandler = (place: Place) => {
    insertPlace(place).then(() => {
      navigation.navigate('AllPlaces');
    });
  }
  
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
