import React, { useState } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PropTypes from 'prop-types';

const shopDefaultCoords = [
  {
    shop: 'BeHealthy',
    lat: 46.467648766568225,
    lng: 30.632240228436977,
  },
  {
    shop: 'drugs24',
    lat: 46.382609681624906,
    lng: 30.682806228136734,
  },
  {
    shop: 'pharmacy',
    lat: 46.55818013092024,
    lng: 30.877567784477115,
  },
];

const mapDefaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: false,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
};

export const GoogleMapAddressSelector = ({ formik }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 46.57308553455599, lng: 30.801090654291457 });
  const [markerPosition, setMarkerPosition] = useState(null);

  const reverseGeocode = (lat, lng) => {
    return new Promise((resolve, reject) => {
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

      axios
        .get(apiUrl)
        .then((response) => {
          const data = response.data;
          if (data.status === 'OK') {
            const addressComponents = data.results[0].address_components;
            const localityComponent = addressComponents.find((component) => component.types.includes('locality'));
            const localityName = localityComponent ? localityComponent.long_name : 'Unknown';
            resolve(localityName);
          } else {
            reject(new Error('Reverse geocoding failed'));
          }
        })
        .catch((error) => {
          console.error('Error during reverse geocoding:', error);
          reject(error);
        });
    });
  };
  const handlePlaceSelect = async (place) => {
    const { lat, lng } = place.geometry.location;
    setMapCenter({
      lat: lat,
      lng: lng,
    });
    setMarkerPosition({
      lat: lat,
      lng: lng,
    });

    try {
      const localityName = await reverseGeocode(lat, lng);
      await formik.setFieldValue('address', localityName);
    } catch (error) {
      console.error('Error getting locality name:', error);
    }
  };

  return (
    // eslint-disable-next-line no-undef
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      <GoogleMap
        options={mapDefaultOptions}
        mapContainerStyle={{
          width: '100%',
          height: '300px',
        }}
        center={mapCenter}
        zoom={9}
        onClick={(e) => {
          setMarkerPosition({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          });
          handlePlaceSelect({
            formatted_address: {
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            },
            geometry: {
              location: {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
              },
            },
          });
        }}
      >
        {markerPosition && <Marker position={markerPosition} />}
        <Marker position={{ lat: shopDefaultCoords[0].lat, lng: shopDefaultCoords[0].lng }} />
      </GoogleMap>
    </LoadScript>
  );
};

GoogleMapAddressSelector.propTypes = {
  formik: PropTypes.object.isRequired,
};

GoogleMapAddressSelector.defaultProps = {
  formik: null,
};
