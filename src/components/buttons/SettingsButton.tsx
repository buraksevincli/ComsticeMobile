import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {Colors} from '../../constants/Colors';
import {useColorScheme} from 'react-native';
import {scaleWidth} from '../../utils/Responsive';
import i18n from '../../locales/i18n';

interface SettingsButtonProps {
  onPress: () => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({onPress}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  return (
    <View style={styles.button}>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.text, {color: colors.headerText}]}>
          {i18n.t('settings.settings')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    marginTop: scaleWidth(10),
  },
  text: {
    fontSize: scaleWidth(18),
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});

export default SettingsButton;
