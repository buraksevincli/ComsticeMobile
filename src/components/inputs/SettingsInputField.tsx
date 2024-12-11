import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {scaleWidth, scaleHeight, scaleFont} from '../../utils/responsive';
import {useColorScheme} from 'react-native';
import {Colors} from '../../constants/colors';

interface SettingsInputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const SettingsInputField: React.FC<SettingsInputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  return (
    <View style={[styles.container, {borderColor: colors.primaryText}]}>
      <TextInput
        style={[styles.input, {color: colors.primaryText}]}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholderText}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: scaleWidth(8),
    marginVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleHeight(10),
  },
  input: {
    fontSize: scaleFont(16),
    fontWeight: '400',
  },
});

export default SettingsInputField;
