import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomButton from '../buttons/CustomButton';
import {scaleWidth} from '../../utils/Responsive';
import i18n from '../../locales/i18n';

type SSOLoginProps = {
  onLogin: () => void;
};

const SSOLogin: React.FC<SSOLoginProps> = ({onLogin}) => {
  return (
    <View style={styles.container}>
      <CustomButton
        title={i18n.t('loginWithSSO')}
        onPress={onLogin}
        fullWidth
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: scaleWidth(50),
  },
});

export default SSOLogin;
