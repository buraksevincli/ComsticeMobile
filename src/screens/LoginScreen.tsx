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
import {useNavigation} from '@react-navigation/native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  return (
    <View
      style={[styles.container, {backgroundColor: colors.primaryBackground}]}>
      <LogoHeader />
      <InputField
        placeholder="User ID"
        icon={require('../assets/images/icons/user-icon.png')}
      />
      <InputField
        placeholder="Password"
        icon={require('../assets/images/icons/password-icon.png')}
        secureTextEntry={true}
      />
      <CheckboxWithLabel label="Remember Me" />
      <LoginButton onPress={handleLogin} />
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
