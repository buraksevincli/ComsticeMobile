import React from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import {scaleFont, scaleHeight, scaleWidth} from '../../utils/Responsive';

interface SwitchRowProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const SwitchRow: React.FC<SwitchRowProps> = ({label, value, onValueChange}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
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
