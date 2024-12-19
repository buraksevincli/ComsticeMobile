import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from '../components/drawers/CustomDrawerContent';
import CallsScreen from '../screens/CallsScreen';
import MessagesScreen from '../screens/MessagesScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import TasksScreen from '../screens/TasksScreen';
import CRMScreen from '../screens/CRMScreen';
import {Colors} from '../constants/Colors';
import {scaleFont, scaleHeight, scaleWidth} from '../utils/Responsive';
import {useColorScheme, Image, TouchableOpacity} from 'react-native';
import i18n from '../../src/locales/i18n';

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
      }}>
      <Drawer.Screen
        name="Calls"
        component={CallsScreen}
        options={{
          headerTitle: i18n.t('navigation.calls'),
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
        }}
      />
      <Drawer.Screen
        name="Tasks"
        component={TasksScreen}
        options={{headerTitle: i18n.t('navigation.tasks')}}
      />
      <Drawer.Screen
        name="Messages"
        component={MessagesScreen}
        options={{headerTitle: i18n.t('navigation.messages')}}
      />
      <Drawer.Screen
        name="CRM"
        component={CRMScreen}
        options={{headerTitle: i18n.t('navigation.crm')}}
      />
      <Drawer.Screen
        name="Preferences"
        component={PreferencesScreen}
        options={{headerTitle: i18n.t('navigation.preferences')}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
