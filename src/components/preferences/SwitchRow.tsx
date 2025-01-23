import React from 'react';
import {View, Text, StyleSheet, Switch, useColorScheme} from 'react-native';
import {scaleFont, scaleHeight, scaleWidth} from '../../utils/Responsive';
import {Colors} from '../../constants/Colors';

interface SwitchRowProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const SwitchRow: React.FC<SwitchRowProps> = ({label, value, onValueChange}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);
  return (
    <View style={styles.container}>
      <Text style={[styles.label, {color: colors.blackText}]}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleHeight(15),
    paddingHorizontal: scaleWidth(15),
    marginHorizontal: scaleWidth(10),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: scaleFont(18),
    fontWeight: '500',
  },
});

export default SwitchRow;
