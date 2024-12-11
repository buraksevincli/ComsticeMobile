import React from 'react';
import {View, TextInput, StyleSheet, Image} from 'react-native';
import {Colors} from '../../constants/colors';
import {useColorScheme} from 'react-native';
import {scaleWidth, scaleHeight, scaleFont} from '../../utils/responsive';

interface InputFieldProps {
  placeholder: string;
  icon: any;
  secureTextEntry?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  icon,
  secureTextEntry = false,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  return (
    <View style={[styles.container, {borderColor: colors.white}]}>
      <Image source={icon} style={styles.icon} />
      <TextInput
        style={[styles.input, {color: colors.white}]}
        placeholder={placeholder}
        placeholderTextColor={colors.white}
        secureTextEntry={secureTextEntry}
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
