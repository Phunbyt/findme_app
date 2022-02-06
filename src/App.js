import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import LoadingButton from './components/LoadingButton';
import MarkerInfo from './components/MarkerInfo';
import getLocationAddress from './utils/getLocationAddress';

const App = () => {
  const defaultProps = {
    center: {
      lat: 59.955413,
      lng: 30.337844,
    },
  };

  const [isLoading, setIsLoading] = useState(false);
  const [locationLat, setLocationLat] = useState(59.955413);
  const [locationLng, setLocationLng] = useState(30.337844);
  const [location, setLocation] = useState({
    center: {
      lat: locationLat,
      lng: locationLng,
    },
  });
  const [message, setMessage] = useState('');
  const [formattedAddress, setFormattedAddress] = useState('');

  const handleClick = (e) => {
    setLocationLat(e.lat);
    setLocationLng(e.lng);
  };

  const getLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setMessage('Geolocation is not supported by this browser.');
    }
  };

  const showPosition = async (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    setLocation({
      center: {
        lat,
        lng,
      },
    });
    try {
      const data = await getLocationAddress(lat, lng);
      setFormattedAddress(data);
    } catch (error) {
      setMessage('Error fetching location');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log('useEffect', process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    setLocation({
      center: {
        lat: locationLat,
        lng: locationLng,
      },
    });
    const fetchLocation = async () => {
      try {
        const data = await getLocationAddress(locationLat, locationLng);
        setFormattedAddress(data);
      } catch (error) {
        setMessage('Error fetching location');
      }
    };
    fetchLocation();
  }, [locationLat, locationLng]);

  return (
    <div className="vh-100 vw-100">
      <div className="h-75 border-success">
        <div className="d-flex justify-content-center my-2">FIND ME APP</div>

        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={15}
          center={location.center}
          yesIWantToUseGoogleMapApiInternals
          onClick={handleClick}
        >
          <MarkerInfo
            lat={location.center.lat}
            lng={location.center.lng}
            address={formattedAddress}
          />
        </GoogleMapReact>
        {message && (
          <div className="d-flex justify-content-center">{message}</div>
        )}
        <div className="d-flex justify-content-center my-3">
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button onClick={getLocation} variant="primary">
              Find Me
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
