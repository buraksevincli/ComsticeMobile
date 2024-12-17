import React, {useState} from 'react';
import {View, StyleSheet, Text, useColorScheme, Alert} from 'react-native';
import SettingsInputField from '../components/inputs/SettingsInputField';
import CheckboxWithLabel from '../components/inputs/CheckboxWithLabel';
import CustomButton from '../components/buttons/CustomButton';
import LoadingOverlay from '../components/common/LoadingOverlay';
import {scaleFont, scaleHeight, scaleWidth} from '../utils/Responsive';
import {Colors} from '../constants/Colors';
import {setCompanyData} from '../store/slices/CompanySlice';
import {useAppDispatch} from '../hooks/ReduxHooks';
import fetchCompanySettings from '../api/FetchCompanySettings';
import i18n from '../locales/i18n';

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
      Alert.alert(i18n.t('success'), i18n.t('settingsFetched'));
    } catch (error: any) {
      Alert.alert(
        i18n.t('error'),
        error.message || i18n.t('settingsFetchError'),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SettingsInputField
        placeholder={i18n.t('enterPhoneNumber')}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <View style={styles.rowContainer}>
        <View style={styles.flexItem}>
          <SettingsInputField
            placeholder={i18n.t('enterCode')}
            value={code}
            onChangeText={setCode}
          />
        </View>
        <View style={styles.flexButton}>
          <CustomButton
            title={i18n.t('get')}
            onPress={handleGetSettings}
            color={colors.primaryBackground}
          />
        </View>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckboxWithLabel
          label={i18n.t('voiceOverInternet')}
          labelColor={colors.secondaryText}
          borderColor={colors.secondaryText}
          value={voiceOverInternet}
          onChange={handleCheckboxChange}
        />
        <CheckboxWithLabel
          label={i18n.t('standardPhoneLine')}
          labelColor={colors.secondaryText}
          borderColor={colors.secondaryText}
          value={standardPhoneLine}
          onChange={handleCheckboxChange}
        />
      </View>

      <View style={styles.footer}>
        <CustomButton
          title={i18n.t('update')}
          onPress={() => console.log('UPDATE Button Pressed')}
          color={colors.primaryButton}
        />
      </View>

      <LoadingOverlay visible={isLoading} message={i18n.t('loading')} />
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
