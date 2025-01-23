import React from 'react';
import {View, TextInput, StyleSheet, Image} from 'react-native';
import {Colors} from '../../constants/Colors';
import {useColorScheme} from 'react-native';
import {scaleWidth, scaleHeight, scaleFont} from '../../utils/Responsive';

interface InputFieldProps {
  placeholder: string;
  icon: any;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  icon,
  secureTextEntry = false,
  value,
  onChangeText,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  return (
    <View style={[styles.container, {borderColor: colors.headerText}]}>
      <Image source={icon} style={styles.icon} />
      <TextInput
        style={[styles.input, {color: colors.headerText}]}
        placeholder={placeholder}
        placeholderTextColor={colors.headerText}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginVertical: scaleHeight(8),
  },
  icon: {
    width: scaleWidth(30),
    height: scaleHeight(30),
    resizeMode: 'contain',
    marginHorizontal: scaleWidth(10),
    marginVertical: scaleHeight(5),
  },
  input: {
    flex: 1,
    fontSize: scaleFont(16),
  },
});

export default InputField;
