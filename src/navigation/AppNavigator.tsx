import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import DrawerNavigator from './DrawerNavigator';
import KeypadScreen from '../screens/KeypadScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {Colors} from '../constants/Colors';
import {useColorScheme} from 'react-native';
import VoicemailDetailScreen from '../screens/VoicemailDetailScreen';
import i18n from '../locales/i18n';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Keypad: undefined;
  Settings: undefined;
  Voicemail: undefined;
  VoicemailDetail: {
    number: string;
    duration: string;
    date: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerBackTitle: i18n.t('navigation.back'),
        headerStyle: {
          backgroundColor: Colors(isDarkMode).primaryBackground,
        },
        headerTintColor: Colors(isDarkMode).headerText,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Keypad"
        component={KeypadScreen}
        options={{
          title: i18n.t('navigation.keypad'),
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: i18n.t('settings.settings'),
        }}
      />
      <Stack.Screen
        name="VoicemailDetail"
        component={VoicemailDetailScreen}
        options={{title: i18n.t('navigation.voicemailDetail')}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
