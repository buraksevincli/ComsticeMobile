import {PermissionsAndroid, Platform, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

/**
 * Request location permission and get the current location if permission is granted.
 * @returns {Promise<{latitude: number, longitude: number, address: string | null} | null>}
 */
export const getLocation = async (): Promise<{
  latitude: number;
  longitude: number;
  address: string | null;
} | null> => {
  try {
    const hasPermission = await requestLocationPermission();
    console.log('Has permission:', hasPermission);

    if (!hasPermission) {
      return null;
    }

    return new Promise((resolve, reject) => {
      console.log('Getting location...');
      Geolocation.getCurrentPosition(
        async position => {
          console.log('Got location:', position);
          const {latitude, longitude} = position.coords;

          try {
            const address = await fetchAddress(latitude, longitude);
            resolve({latitude, longitude, address});
          } catch (addressError) {
            console.error('Failed to fetch address:', addressError);
            resolve({latitude, longitude, address: null});
          }
        },
        error => {
          console.error('Failed to fetch location:', error);
          Alert.alert('Error', 'Unable to fetch location. Please try again.');
          reject(null);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });
  } catch (error) {
    console.error('Error in getLocation:', error);
    return null;
  }
};

/**
 * Fetch address from latitude and longitude using an external API.
 * @param latitude
 * @param longitude
 * @returns {Promise<string | null>}
 */
export const fetchAddress = async (
  latitude: number,
  longitude: number,
): Promise<string | null> => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
    );
    return response.data?.display_name || null;
  } catch (error) {
    console.error('Error fetching address:', error);
    return null;
  }
};

/**
 * Request location permission based on the platform.
 * @returns {Promise<boolean>}
 */
const requestLocationPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (hasPermission) {
        console.log('Location permission already granted');
        return true;
      }

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        return true;
      } else {
        Alert.alert(
          'Permission Denied',
          'Location access is required to use this feature.',
        );
        return false;
      }
    } else {
      const status = await Geolocation.requestAuthorization('whenInUse');
      if (status === 'granted') {
        console.log('Location permission granted');
        return true;
      } else {
        Alert.alert(
          'Permission Denied',
          'Location access is required to use this feature.',
        );
        return false;
      }
    }
  } catch (error) {
    console.error('Failed to request location permission:', error);
    Alert.alert(
      'Error',
      'An unexpected error occurred while requesting location permission.',
    );
    return false;
  }
};
