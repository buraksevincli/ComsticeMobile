import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SwitchRow from '../components/preferences/SwitchRow';
import DropdownRow from '../components/preferences/DropdownRow';
import CustomButton from '../components/buttons/CustomButton';
import {useColorScheme} from 'react-native';
import {Colors} from '../constants/Colors';
import i18n from '../locales/i18n';
import {scaleFont, scaleHeight, scaleWidth} from '../utils/Responsive';
import {getStoredLocation} from '../services/storage/LocationStorage';

const PreferencesScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  const [isAutomaticAvailable, setIsAutomaticAvailable] =
    useState<boolean>(false);
  const [selectedNumber, setSelectedNumber] = useState<string>('+17139293714');
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string | null;
  } | null>(null);

  const numbers = [
    '+17139293714',
    '+17135235235',
    '+17235323529',
    '+17433298102',
    '+17492211045',
  ];

  const formattedNumbers = numbers.map(num => ({
    label: num,
    value: num,
  }));

  const fetchLocation = async () => {
    try {
      const storedLocation = await getStoredLocation();
      setLocation(storedLocation);
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const handlePinLocation = () => {
    navigation.navigate('Location');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchLocation);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Switch */}
      <SwitchRow
        label={i18n.t('preferences.automaticAvailable')}
        value={isAutomaticAvailable}
        onValueChange={setIsAutomaticAvailable}
      />

      {/* Dropdown */}
      <DropdownRow
        label={i18n.t('preferences.selectCallingNumber')}
        selectedValue={selectedNumber}
        onValueChange={setSelectedNumber}
        options={formattedNumbers}
      />

      {/* Your Location */}
      <View style={styles.locationContainer}>
        <Text style={[styles.locationLabel, {color: colors.blackText}]}>
          {i18n.t('preferences.yourLocation')}
        </Text>
        {location?.address ? (
          <View>
            <Text style={[styles.addressText, {color: colors.blackText}]}>
              {location.address}
            </Text>
          </View>
        ) : (
          <Text style={[styles.noLocationText, {color: colors.error}]}>
            {i18n.t('preferences.noLocationPinned')}
          </Text>
        )}
      </View>

      {/* Button */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title={i18n.t('preferences.pinYourLocation')}
          onPress={handlePinLocation}
          color={colors.primaryButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  locationContainer: {
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleHeight(15),
    marginHorizontal: scaleWidth(10),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  locationLabel: {
    fontSize: scaleFont(18),
    fontWeight: '500',
    marginBottom: scaleHeight(5),
  },
  addressText: {
    fontSize: scaleFont(16),
    marginTop: scaleHeight(5),
  },
  noLocationText: {
    fontSize: scaleFont(16),
    marginTop: scaleHeight(5),
  },
  buttonContainer: {
    paddingHorizontal: scaleWidth(15),
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: scaleHeight(50),
  },
});

export default PreferencesScreen;
