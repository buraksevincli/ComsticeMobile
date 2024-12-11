import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import LogoHeader from '../components/headers/LogoHeader';
import InputField from '../components/inputs/InputField';
import LoginButton from '../components/buttons/CustomButton';
import CheckboxWithLabel from '../components/inputs/CheckboxWithLabel';
import Footer from '../components/footers/Footer';
import {useColorScheme} from 'react-native';
import {Colors} from '../constants/colors';
import {scaleWidth} from '../utils/responsive';
import {useNavigation} from '@react-navigation/native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import SettingsButton from '../components/buttons/SettingsButton';
import {useAppSelector} from '../hooks/reduxHooks';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen: React.FC = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const logoUrl = useAppSelector(state => state.company.logourl);

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
      <LogoHeader logoUri={logoUrl || undefined} />
      <InputField
        placeholder="User ID"
        icon={require('../assets/images/icons/user-icon.png')}
      />
      <InputField
        placeholder="Password"
        icon={require('../assets/images/icons/password-icon.png')}
        secureTextEntry={true}
      />
      {/* Updated CheckboxWithLabel Usage */}
      <CheckboxWithLabel
        label="Remember Me"
        value={rememberMe}
        onChange={() => setRememberMe(!rememberMe)}
      />
      <View style={styles.buttonContainer}>
        <LoginButton title="Login" onPress={handleLogin} />
      </View>
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
  buttonContainer: {
    marginVertical: scaleWidth(50),
  },
});

export default LoginScreen;
