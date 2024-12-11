import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {useColorScheme} from 'react-native';
import {scaleWidth, scaleHeight, scaleFont} from '../../utils/responsive';

interface CheckboxWithLabelProps {
  label: string;
}

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({label}) => {
  const [checked, setChecked] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setChecked(!checked)}>
      <Text style={[styles.label, {color: colors.headerText}]}>{label}</Text>
      <View
        style={[
          styles.checkbox,
          {borderColor: colors.headerText},
          checked && {backgroundColor: colors.headerText},
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: scaleHeight(8),
  },
  checkbox: {
    width: scaleWidth(16),
    height: scaleHeight(16),
    borderWidth: 1,
    borderRadius: scaleWidth(4),
    marginLeft: scaleWidth(8),
  },
  label: {
    fontSize: scaleFont(12),
  },
});

export default CheckboxWithLabel;
