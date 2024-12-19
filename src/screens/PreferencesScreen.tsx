import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import SwitchRow from '../components/preferences/SwitchRow';
import DropdownRow from '../components/preferences/DropdownRow';
import CustomButton from '../components/buttons/CustomButton';
import {useColorScheme} from 'react-native';
import {Colors} from '../constants/Colors';
import i18n from '../locales/i18n';
import {scaleHeight, scaleWidth} from '../utils/Responsive';

const PreferencesScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  const [isAutomaticAvailable, setIsAutomaticAvailable] =
    useState<boolean>(false);
  const [selectedNumber, setSelectedNumber] = useState<string>('+17139293714');

  const numbers: any = [
    '+17139293714',
    '+17135235235',
    '+17235323529',
    '+17433298102',
    '+17492211045',
  ];

  const handlePinLocation = () => {
    navigation.navigate('Location');
  };

  return (
    <View style={styles.container}>
      <SwitchRow
        label={i18n.t('preferences.automaticAvailable')}
        value={isAutomaticAvailable}
        onValueChange={setIsAutomaticAvailable}
      />
      <DropdownRow
        label={i18n.t('preferences.selectCallingNumber')}
        selectedValue={selectedNumber}
        onValueChange={setSelectedNumber}
        options={numbers}
      />
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
  buttonContainer: {
    paddingHorizontal: scaleWidth(15),
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: scaleHeight(50),
  },
});

export default PreferencesScreen;
