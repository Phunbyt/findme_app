import axios from 'axios';

const getLocationAddress = async (lat, lng) => {
  try {
    const { data } = await axios.post(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_MAPS_API_KEY}`
    );
    return data.results[0].formatted_address;
  } catch (error) {
    throw new Error(error);
  }
};
export default getLocationAddress;
