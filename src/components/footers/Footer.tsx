import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';
import {useColorScheme} from 'react-native';
import {scaleWidth, scaleHeight, scaleFont} from '../../utils/Responsive';

const Footer: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  return (
    <View style={[styles.container]}>
      <Text style={[styles.text, {color: colors.headerText}]}>Created by</Text>
      <Image
        source={require('../../assets/images/logos/comstice-logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: scaleHeight(50),
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: scaleFont(12),
    marginRight: scaleWidth(2),
  },
  logo: {
    width: scaleWidth(100),
    height: scaleHeight(30),
    resizeMode: 'contain',
    marginLeft: scaleWidth(2),
  },
});

export default Footer;
