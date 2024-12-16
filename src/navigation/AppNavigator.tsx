import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import DrawerNavigator from './DrawerNavigator';
import KeypadScreen from '../screens/KeypadScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {Colors} from '../constants/Colors';
import {useColorScheme} from 'react-native';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Keypad: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
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
          title: 'Keypad',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
