import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useColorScheme} from 'react-native';
import {Colors} from '../../constants/colors';
import {scaleWidth, scaleHeight} from '../../utils/responsive';

interface LogoHeaderProps {
  logoUri?: string;
}

const LogoHeader: React.FC<LogoHeaderProps> = ({logoUri}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  const defaultLogo = require('../../assets/images/logos/safetime-logo.png');

  return (
    <View style={styles.container}>
      <Image
        source={logoUri ? {uri: logoUri} : defaultLogo}
        style={[
          styles.logo,
          {tintColor: logoUri ? undefined : colors.headerText},
        ]}
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
