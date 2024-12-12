// DefaultLogin.tsx
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import CustomButton from '../buttons/CustomButton';
import CheckboxWithLabel from '../inputs/CheckboxWithLabel';
import {scaleWidth} from '../../utils/responsive';
import InputField from '../inputs/InputField';

type DefaultLoginProps = {
  onLogin: () => void;
};

const DefaultLogin: React.FC<DefaultLoginProps> = ({onLogin}) => {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View>
      <InputField
        placeholder="User ID"
        icon={require('../../assets/images/icons/user-icon.png')}
      />
      <InputField
        placeholder="Password"
        icon={require('../../assets/images/icons/password-icon.png')}
        secureTextEntry={true}
      />
      <CheckboxWithLabel
        label="Remember Me"
        value={rememberMe}
        onChange={() => setRememberMe(!rememberMe)}
      />
      <View style={styles.buttonContainer}>
        <CustomButton title="Login" onPress={onLogin} />
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
