import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from '../components/drawers/CustomDrawerContent';
import CallsScreen from '../screens/CallsScreen';
import MessagesScreen from '../screens/MessagesScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import TasksScreen from '../screens/TasksScreen';
import {Colors} from '../constants/colors';
import {scaleFont} from '../utils/responsive';
import {useColorScheme} from 'react-native';

const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontSize: scaleFont(20), // Header title text size
        },
        headerStyle: {
          backgroundColor: Colors(isDarkMode).primaryBackground, // Header background color
        },
        headerTintColor: Colors(isDarkMode).headerText, // Header text color
        headerTitleAlign: 'center', // Center the header title
        drawerStyle: {
          backgroundColor: Colors(isDarkMode).primaryBackground, // Drawer background color
        },
        drawerLabelStyle: {
          color: Colors(isDarkMode).error, // Drawer label text color
        },
      }}>
      <Drawer.Screen name="Calls" component={CallsScreen} />
      <Drawer.Screen name="Tasks" component={TasksScreen} />
      <Drawer.Screen name="Messages" component={MessagesScreen} />
      <Drawer.Screen name="Preferences" component={PreferencesScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
