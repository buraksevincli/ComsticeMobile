import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';
import {useColorScheme} from 'react-native';
import {scaleWidth, scaleHeight, scaleFont} from '../../utils/Responsive';

interface CheckboxWithLabelProps {
  label: string;
  value: boolean;
  onChange: () => void;
  labelColor?: string;
  borderColor?: string;
}

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
  label,
  value,
  onChange,
  labelColor,
  borderColor,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  const resolvedLabelColor = labelColor || colors.headerText;
  const resolvedBorderColor = borderColor || colors.headerText;

  return (
    <TouchableOpacity style={styles.container} onPress={onChange}>
      <Text style={[styles.label, {color: resolvedLabelColor}]}>{label}</Text>
      <View
        style={[
          styles.checkbox,
          {borderColor: resolvedBorderColor},
          value && {backgroundColor: colors.primaryButton},
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
    height: scaleWidth(16),
    borderWidth: 1,
    borderRadius: scaleWidth(4),
    marginLeft: scaleWidth(8),
  },
  label: {
    fontSize: scaleFont(14),
    fontWeight: '400',
  },
});

export default CheckboxWithLabel;
