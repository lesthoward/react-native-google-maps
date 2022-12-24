const GOOGLE_API_KEY = 'AIzaSyCN4xHZOw6JnSqpfFp7WYh_c2oSBnBRixg';

export const getMapPreview = (lat: number, lng: number) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat}, ${lng}&zoom=13&size=400x200&maptype=roadmap
  &markers=color:blue%7Clabel:S%7C$${lat},${lng}
  &key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
};

export const getAddress = async (lat: number, lng: number) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Something went wrong!');
  }
  const resData = await response.json();
  if (resData.error_message) {
    throw new Error(resData.error_message);
  }
  const address = resData.results[0].formatted_address as string;
  return address;
}