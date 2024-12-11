import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Colors} from '../../constants/colors';
import {useColorScheme} from 'react-native';
import {scaleWidth, scaleHeight} from '../../utils/responsive';

const LogoHeader: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logos/safetime-logo.png')}
        style={[styles.logo, {tintColor: colors.headerText}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: scaleHeight(100),
  },
  logo: {
    width: scaleWidth(400),
    height: scaleHeight(75),
    resizeMode: 'contain',
  },
});

export default LogoHeader;
