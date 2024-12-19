import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scaleFont, scaleHeight, scaleWidth} from '../../utils/Responsive';

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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedValue);
  const [items, setItems] = useState(options);

  const handleValueChange = (itemValue: any) => {
    setValue(itemValue);
    onValueChange(itemValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text>Dropdown will add</Text>
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
  },
  label: {
    fontSize: scaleFont(18),
    fontWeight: '500',
    marginBottom: scaleHeight(8),
  },
});

export default DropdownRow;
