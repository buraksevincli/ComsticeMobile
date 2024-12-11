import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {useColorScheme} from 'react-native';
import {scaleWidth, scaleHeight, scaleFont} from '../../utils/responsive';

interface LoginButtonProps {
  onPress: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({onPress}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: colors.primaryButton}]}
      onPress={onPress}>
      <Text style={[styles.text, {color: colors.headerText}]}>Login</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: scaleWidth(12),
    paddingVertical: scaleHeight(10),
    marginVertical: scaleHeight(50),
  },
  text: {
    fontWeight: '400',
    fontSize: scaleFont(19),
  },
});

export default LoginButton;
