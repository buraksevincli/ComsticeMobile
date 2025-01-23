import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import CustomButton from '../buttons/CustomButton';
import CheckboxWithLabel from '../inputs/CheckboxWithLabel';
import {scaleWidth} from '../../utils/Responsive';
import InputField from '../inputs/InputField';
import i18n from '../../locales/i18n';
import {ucceLoginService} from '../../services/UCCELoginService';
import {useAppDispatch, useAppSelector} from '../../hooks/ReduxHooks';
import {setAgentData} from '../../store/slices/AgentSlice';

type UCCELoginProps = {
  onLogin: () => void;
};

const UCCELogin: React.FC<UCCELoginProps> = ({onLogin}) => {
  const {token, finesse1} = useAppSelector(state => state.company);
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [extension, setExtension] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await ucceLoginService.keepAliveLoginWithToken(
        username,
        password,
        finesse1,
        token,
      );
      dispatch(setAgentData({username, password, extension}));
      Alert.alert('Login Success', response.msg);
      onLogin();
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'An error occurred');
    }
  };

  return (
    <View>
      <InputField
        placeholder={i18n.t('auth.userId')}
        icon={require('../../assets/images/icons/user-icon.png')}
        value={username}
        onChangeText={setUsername}
      />
      <InputField
        placeholder={i18n.t('auth.password')}
        icon={require('../../assets/images/icons/password-icon.png')}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <InputField
        placeholder={i18n.t('auth.extension')}
        icon={require('../../assets/images/icons/grid-icon.png')}
        value={extension}
        onChangeText={setExtension}
      />
      <CheckboxWithLabel
        label={i18n.t('auth.rememberMe')}
        value={rememberMe}
        onChange={() => setRememberMe(!rememberMe)}
      />
      <View style={styles.buttonContainer}>
        <CustomButton title={i18n.t('auth.login')} onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: scaleWidth(50),
  },
});

export default UCCELogin;
