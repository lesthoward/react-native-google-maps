import { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Alert } from 'react-native';
import GlobalStyles from '../../constants/styles';
import Place from '../../models/Place';
import FilledPressable from '../UI/FilledPressable';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';

interface PlaceFormProps {
  onCreatePlace?: (place: Place) => void;
}

const PlaceForm = ({ onCreatePlace }: PlaceFormProps) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>();
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  }>();
  
  const changeTitleHandler = (text: string) => {
    setEnteredTitle(text);
  };

  const savePlaceHandler = () => {
    if(!enteredTitle || !selectedImage || !selectedLocation) return Alert.alert('Missing data', 'Please fill in all fields');
    const placeData = new Place(enteredTitle, selectedImage, selectedLocation?.address, selectedLocation?.lat, selectedLocation?.lng)
    onCreatePlace && onCreatePlace(placeData);
  };

  const takeImageHandler = (uri: string) => {
    setSelectedImage(uri);
  };

  const pickLocationHandler = (location: {
    lat: number;
    lng: number;
    address: string;
  }) => {
    setSelectedLocation(location);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={changeTitleHandler} />
      </View>
      <View style={styles.separator}>
        <ImagePicker onTakeImage={takeImageHandler} />
      </View>
      <View style={styles.separator}>
        <LocationPicker onPickLocation={pickLocationHandler} />
      </View>
      <View style={[styles.separator, styles.last]}>
        <FilledPressable onPress={savePlaceHandler}>Submit</FilledPressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    marginBottom: 8,
    color: GlobalStyles.colors.formLabel,
    ...GlobalStyles.typography.formLabel,
  },
  input: {
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomColor: GlobalStyles.colors.formInput,
    borderBottomWidth: 2,
    backgroundColor: GlobalStyles.colors.formInputBackground,
    borderRadius: 2,
    ...GlobalStyles.typography.formLabel,
  },
  separator: {
    marginVertical: 16,
  },
  last: {
    marginBottom: 16,
  },
});

export default PlaceForm;
