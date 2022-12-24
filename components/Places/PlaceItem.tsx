import { IPlace } from '../../models/Place';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import GlobalStyles from '../../constants/styles';

interface PlaceItemProps extends IPlace, TouchableOpacityProps {
  onPlacePress?: () => void;
}

const PlaceItem = (props: PlaceItemProps) => {
  const { title, address, imageUri, id, lat, lng, onPlacePress, ...rest } =
    props;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={
        onPlacePress &&
        onPlacePress.bind(this, { title, address, imageUri, id, lat, lng })
      }
      {...rest}
    >
      <Image style={styles.image} source={{ uri: imageUri }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 4,
    marginVertical: 8,
    backgroundColor: 'white',
    ...GlobalStyles.shadows.generalShadow,
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    flex: 1,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 100,
  },
  infoContainer: {
    flex: 2,
    padding: 8,
  },
  title: {
    ...GlobalStyles.typography.cardTitle,
  },
  address: {
    ...GlobalStyles.typography.info,
  },
});

export default PlaceItem;
