import {saveData, getData} from '../AsyncStorageService';

const LOCATION_KEY = 'userLocation';

export const saveLocation = async (location: {
  latitude: number;
  longitude: number;
  address: string | null;
}) => {
  await saveData(LOCATION_KEY, location);
};

export const getStoredLocation = async (): Promise<{
  latitude: number;
  longitude: number;
  address: string | null;
}> => {
  const data = await getData(LOCATION_KEY);
  return data || {lat: 0, lng: 0, address: null};
};
