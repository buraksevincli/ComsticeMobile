import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';
import {useColorScheme} from 'react-native';
import {scaleHeight, scaleFont} from '../../utils/Responsive';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({visible, message}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.overlay, {backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}>
      <ActivityIndicator size="large" color={colors.primaryButton} />
      {message && (
        <Text style={[styles.text, {color: colors.headerText}]}>{message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: scaleHeight(10),
    fontSize: scaleFont(16),
  },
});

export default LoadingOverlay;
