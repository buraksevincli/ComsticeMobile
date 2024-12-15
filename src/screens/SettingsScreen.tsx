import React, {useState} from 'react';
import {View, StyleSheet, Text, useColorScheme, Alert} from 'react-native';
import SettingsInputField from '../components/inputs/SettingsInputField';
import CheckboxWithLabel from '../components/inputs/CheckboxWithLabel';
import CustomButton from '../components/buttons/CustomButton';
import LoadingOverlay from '../components/common/LoadingOverlay';
import {scaleFont, scaleHeight, scaleWidth} from '../utils/responsive';
import {Colors} from '../constants/colors';
import {setCompanyData} from '../store/slices/companySlice';
import fetchCompanySettings from '../api/fetchCompanySettings';
import {useAppDispatch} from '../hooks/reduxHooks';

const SettingsScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  const dispatch = useAppDispatch();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [voiceOverInternet, setVoiceOverInternet] = useState(true);
  const [standardPhoneLine, setStandardPhoneLine] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = () => {
    setVoiceOverInternet(!voiceOverInternet);
    setStandardPhoneLine(!standardPhoneLine);
  };

  const handleGetSettings = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCompanySettings(code);
      dispatch(
        setCompanyData({
          companyCode: code,
          model: data.model,
          version: data.version,
          logourl: data.logourl,
          loginWithSso: data.loginWithSso,
        }),
      );
      Alert.alert('Success', 'Settings fetched and updated!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to fetch settings.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SettingsInputField
        placeholder="Enter Your Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <View style={styles.rowContainer}>
        <View style={styles.flexItem}>
          <SettingsInputField
            placeholder="Enter Code"
            value={code}
            onChangeText={setCode}
          />
        </View>
        <View style={styles.flexButton}>
          <CustomButton
            title="GET"
            onPress={handleGetSettings}
            color={colors.primaryBackground}
          />
        </View>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckboxWithLabel
          label="Voice Over Internet"
          labelColor={colors.secondaryText}
          borderColor={colors.secondaryText}
          value={voiceOverInternet}
          onChange={handleCheckboxChange}
        />
        <CheckboxWithLabel
          label="Standard Phone Line"
          labelColor={colors.secondaryText}
          borderColor={colors.secondaryText}
          value={standardPhoneLine}
          onChange={handleCheckboxChange}
        />
      </View>

      <View style={styles.footer}>
        <CustomButton
          title="UPDATE"
          onPress={() => console.log('UPDATE Button Pressed')}
          color={colors.primaryButton}
        />
      </View>

      <LoadingOverlay visible={isLoading} message="Loading..." />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scaleWidth(24),
    paddingTop: scaleHeight(20),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleHeight(20),
    justifyContent: 'space-between',
  },
  flexItem: {
    flex: 1.2,
    marginRight: scaleWidth(8),
  },
  flexButton: {
    flex: 1,
    marginLeft: scaleWidth(8),
  },
  checkboxContainer: {
    marginTop: scaleHeight(32),
  },
  footer: {
    position: 'absolute',
    left: scaleWidth(24),
    right: scaleWidth(24),
    bottom: scaleHeight(50),
  },
});

export default SettingsScreen;
