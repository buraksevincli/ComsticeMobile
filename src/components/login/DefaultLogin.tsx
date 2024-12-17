// DefaultLogin.tsx
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import CustomButton from '../buttons/CustomButton';
import CheckboxWithLabel from '../inputs/CheckboxWithLabel';
import {scaleWidth} from '../../utils/Responsive';
import InputField from '../inputs/InputField';
import i18n from '../../locales/i18n';

type DefaultLoginProps = {
  onLogin: () => void;
};

const DefaultLogin: React.FC<DefaultLoginProps> = ({onLogin}) => {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View>
      <InputField
        placeholder={i18n.t('userId')}
        icon={require('../../assets/images/icons/user-icon.png')}
      />
      <InputField
        placeholder={i18n.t('password')}
        icon={require('../../assets/images/icons/password-icon.png')}
        secureTextEntry={true}
      />
      <CheckboxWithLabel
        label={i18n.t('rememberMe')}
        value={rememberMe}
        onChange={() => setRememberMe(!rememberMe)}
      />
      <View style={styles.buttonContainer}>
        <CustomButton title={i18n.t('login')} onPress={onLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: scaleWidth(50),
  },
});

export default DefaultLogin;
