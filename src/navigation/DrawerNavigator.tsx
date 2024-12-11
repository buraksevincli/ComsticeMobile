import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from '../components/drawers/CustomDrawerContent';
import CallsScreen from '../screens/CallsScreen';
import MessagesScreen from '../screens/MessagesScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import TasksScreen from '../screens/TasksScreen';
import {Colors} from '../constants/colors';
import {scaleFont, scaleHeight, scaleWidth} from '../utils/responsive';
import {useColorScheme, Image, TouchableOpacity} from 'react-native';

const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = ({navigation}: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontSize: scaleFont(20),
        },
        headerStyle: {
          backgroundColor: Colors(isDarkMode).primaryBackground,
        },
        headerTintColor: Colors(isDarkMode).headerText,
        headerTitleAlign: 'center',
        drawerStyle: {
          backgroundColor: Colors(isDarkMode).primaryBackground,
        },
        drawerLabelStyle: {
          color: Colors(isDarkMode).error,
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Keypad')}
            style={{marginRight: 16}}>
            <Image
              source={require('../assets/images/icons/grid-icon.png')}
              style={{
                width: scaleWidth(24),
                height: scaleHeight(24),
                tintColor: Colors(isDarkMode).headerText,
              }}
            />
          </TouchableOpacity>
        ),
      }}>
      <Drawer.Screen name="Calls" component={CallsScreen} />
      <Drawer.Screen name="Tasks" component={TasksScreen} />
      <Drawer.Screen name="Messages" component={MessagesScreen} />
      <Drawer.Screen name="Preferences" component={PreferencesScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
