import React, {useState} from 'react';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {scaleFont, scaleHeight, scaleWidth} from '../../utils/Responsive';
import {Colors} from '../../constants/Colors';

interface DropdownRowProps {
  label: string;
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
  options: {label: string; value: string}[];
}

const DropdownRow: React.FC<DropdownRowProps> = ({
  label,
  selectedValue,
  onValueChange,
  options,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && {borderColor: colors.primaryBackground},
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={options}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Number' : '...'}
        value={selectedValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          onValueChange(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: scaleHeight(15),
    paddingHorizontal: scaleWidth(15),
    marginHorizontal: scaleWidth(10),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    flex: 1.2,
    fontSize: scaleFont(18),
    fontWeight: '500',
    marginBottom: scaleHeight(8),
  },
  dropdown: {
    flex: 1,
    height: scaleHeight(50),
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: scaleWidth(8),
  },
  placeholderStyle: {
    fontSize: scaleFont(16),
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: scaleFont(16),
    fontWeight: '500',
  },
});

export default DropdownRow;
