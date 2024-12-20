import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Alert, Platform} from 'react-native';

import {getLocation} from '../services/LocationService';
import {saveLocation} from '../services/storage/LocationStorage';

const LocationScreen: React.FC = () => {
  useEffect(() => {
    handleFetchLocation();
  }, []);

  const handleFetchLocation = async () => {
    const location = await getLocation();

    if (location) {
      saveLocation(location);
      console.log('Location:', location);
    } else {
      console.log('No location available or permission denied');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Map will be displayed here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default LocationScreen;
