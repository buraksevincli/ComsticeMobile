import React from 'react';
import {View, StyleSheet} from 'react-native';
import LogoHeader from '../components/headers/LogoHeader';
import InputField from '../components/inputs/InputField';
import LoginButton from '../components/buttons/LoginButton';
import CheckboxWithLabel from '../components/inputs/CheckboxWithLabel';
import Footer from '../components/footers/Footer';
import {useColorScheme} from 'react-native';
import {Colors} from '../constants/colors';
import {scaleWidth} from '../utils/responsive';

const LoginScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  return (
    <View style={[styles.container, {backgroundColor: colors.primary}]}>
      <LogoHeader />
      <InputField
        placeholder="User ID"
        icon={require('../assets/images/icons/user-icon.png')}
      />
      <InputField
        placeholder="Password"
        icon={require('../assets/images/icons/password-icon.png')}
      />
      <CheckboxWithLabel label="Remember Me" />
      <LoginButton onPress={() => console.log('Login Pressed')} />
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
