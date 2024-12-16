import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';
import {useColorScheme} from 'react-native';
import {scaleHeight, scaleWidth, scaleFont} from '../../utils/Responsive';

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  onChangeText,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  return (
    <TextInput
      style={[
        styles.input,
        {
          backgroundColor: colors.lightGray,
          color: colors.blackText,
        },
      ]}
      placeholder={placeholder}
      placeholderTextColor={colors.secondaryText}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: scaleWidth(10),
    padding: scaleWidth(12),
    marginBottom: scaleHeight(10),
    fontSize: scaleFont(14),
  },
});

export default SearchInput;
