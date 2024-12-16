import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import LogoHeader from '../components/headers/LogoHeader';
import Footer from '../components/footers/Footer';
import {useColorScheme} from 'react-native';
import {Colors} from '../constants/Colors';
import {scaleWidth} from '../utils/Responsive';
import {useNavigation} from '@react-navigation/native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import SettingsButton from '../components/buttons/SettingsButton';
import {useAppSelector} from '../hooks/ReduxHooks';
import SSOLogin from '../components/login/SSOLogin';
import DefaultLogin from '../components/login/DefaultLogin';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const {logourl, loginWithSso} = useAppSelector(state => state.company);

  const handleLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View
      style={[styles.container, {backgroundColor: colors.primaryBackground}]}>
      <LogoHeader logoUri={logourl || undefined} />
      {loginWithSso === 'true' ? (
        <SSOLogin onLogin={handleLogin} />
      ) : (
        <DefaultLogin onLogin={handleLogin} />
      )}
      <SettingsButton onPress={handleSettings} />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleWidth(24),
    justifyContent: 'center',
  },
});

export default LoginScreen;
