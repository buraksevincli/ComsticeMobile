import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import CallsScreen from '../screens/CallsScreen';

export type RootStackParamList = {
  Login: undefined;
  Calls: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Calls" component={CallsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
