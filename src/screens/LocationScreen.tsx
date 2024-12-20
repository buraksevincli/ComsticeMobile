import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, Text} from 'react-native';
import MapView, {MapMarker} from 'react-native-maps';
import CustomButton from '../components/buttons/CustomButton';
import {fetchAddress, getLocation} from '../services/LocationService';
import {
  getStoredLocation,
  saveLocation,
} from '../services/storage/LocationStorage';
import {scaleFont, scaleHeight, scaleWidth} from '../utils/Responsive';
import LoadingOverlay from '../components/common/LoadingOverlay';
import i18n from '../locales/i18n';

const LocationScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [initialRegion, setInitialRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [marker, setMarker] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleInitializeMap();
  }, []);

  const handleInitializeMap = async () => {
    try {
      const storedLocation = await getStoredLocation();

      if (
        storedLocation &&
        storedLocation.latitude &&
        storedLocation.longitude
      ) {
        setInitialRegion({
          latitude: storedLocation.latitude,
          longitude: storedLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setMarker({
          latitude: storedLocation.latitude,
          longitude: storedLocation.longitude,
        });
        setAddress(storedLocation.address);
      } else {
        const location = await getLocation();
        if (location) {
          setInitialRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          setMarker({
            latitude: location.latitude,
            longitude: location.longitude,
          });
          setAddress(location.address);
        } else {
          Alert.alert(
            i18n.t('preferences.error'),
            i18n.t('preferences.errorLocation'),
          );
        }
      }
    } catch (error) {
      Alert.alert(
        i18n.t('preferences.error'),
        i18n.t('preferences.errorFetch'),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLongPress = async (event: any) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setMarker({latitude, longitude});

    try {
      const newAddress = await fetchAddress(latitude, longitude);
      setAddress(newAddress || i18n.t('preferences.noAddress'));
    } catch (error) {
      setAddress(i18n.t('preferences.noAddress'));
    }
  };

  const handleSaveLocation = async () => {
    try {
      await saveLocation({
        latitude: marker.latitude,
        longitude: marker.longitude,
        address: address,
      });
      Alert.alert(
        i18n.t('preferences.success'),
        i18n.t('preferences.locationPinned'),
        [{text: 'OK', onPress: () => navigation.goBack()}],
      );
    } catch (error) {
      Alert.alert(i18n.t('preferences.error'), i18n.t('preferences.errorSave'));
    }
  };

  if (loading) {
    return (
      <LoadingOverlay
        visible={loading}
        message={i18n.t('preferences.loadingLocation')}
      />
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        onLongPress={handleLongPress}>
        <MapMarker coordinate={marker} />
      </MapView>
      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>
          {address || i18n.t('preferences.noAddress')}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title={i18n.t('preferences.saveLocation')}
          onPress={handleSaveLocation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: scaleHeight(60),
    left: scaleWidth(20),
    right: scaleWidth(20),
  },
  addressContainer: {
    position: 'absolute',
    top: scaleHeight(20),
    left: scaleWidth(20),
    right: scaleWidth(20),
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 10,
    borderRadius: 8,
  },
  addressText: {
    fontSize: scaleFont(16),
    textAlign: 'center',
  },
});

export default LocationScreen;
