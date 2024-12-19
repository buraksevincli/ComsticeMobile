import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';
import {useColorScheme} from 'react-native';
import {scaleWidth, scaleHeight, scaleFont} from '../../utils/Responsive';

interface LoginButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  fullWidth?: boolean;
}

const CustomButton: React.FC<LoginButtonProps> = ({
  title,
  onPress,
  color,
  fullWidth = false,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor: color || colors.primaryButton},
        fullWidth && styles.fullWidth,
      ]}
      onPress={onPress}>
      <Text style={[styles.text, {color: colors.headerText}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(20),
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontWeight: '400',
    fontSize: scaleFont(19),
  },
});

export default CustomButton;
