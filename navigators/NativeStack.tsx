import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PressableIcon from '../components/UI/PressableIcon';
import GlobalStyles from '../constants/styles';
import Place from '../models/Place';
import AddPlace from '../screens/AddPlace';
import AllPlaces from '../screens/AllPlaces';
import Map from '../screens/Map';
import PlaceDetails from '../screens/PlaceDetails';

export type StackParams = {
  AllPlaces:
    | {
        place?: Place;
      }
    | undefined;
  AddPlace: {} | undefined;
  Map:
    | {
        defaultLocation?: {
          lat: number;
          lng: number;
        };
        pickedLocation?: {
          lat: number;
          lng: number;
        };
      }
    | undefined;
  Details:
    | {
        place?: Place;
      }
    | undefined;
};

const Stack = createNativeStackNavigator<StackParams>();

const NativeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AllPlaces"
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.navigatorTab },
        headerTintColor: GlobalStyles.colors.navigatorContent,
        contentStyle: {
          backgroundColor: GlobalStyles.colors.navigatorContent,
        },
      }}
    >
      <Stack.Screen
        name="AllPlaces"
        component={AllPlaces}
        options={({ navigation }) => ({
          title: 'Your favorite places',
          headerRight: ({ tintColor }) => (
            <PressableIcon
              size={24}
              color={tintColor || 'black'}
              name="add"
              onPress={() => navigation.navigate('AddPlace')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddPlace"
        component={AddPlace}
        options={{ title: 'Add a place' }}
      />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen
        name="Details"
        component={PlaceDetails}
        options={{ title: 'Loading...' }}
      />
    </Stack.Navigator>
  );
};

export default NativeStack;
