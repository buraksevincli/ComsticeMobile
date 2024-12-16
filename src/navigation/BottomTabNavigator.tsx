import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RecentScreen from '../screens/RecentScreen';
import PhoneBookScreen from '../screens/PhoneBookScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import VoicemailScreen from '../screens/VoicemailScreen';
import {Colors} from '../constants/Colors';
import {Image, StyleSheet} from 'react-native';
import {useColorScheme} from 'react-native';
import {scaleFont, scaleHeight} from '../utils/Responsive';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let icon;

          switch (route.name) {
            case 'Recent':
              icon = require('../assets/images/icons/recent-icon.png');
              break;
            case 'Phone Book':
              icon = require('../assets/images/icons/phonebook-icon.png');
              break;
            case 'Favourites':
              icon = require('../assets/images/icons/favourites-icon.png');
              break;
            case 'Voicemail':
              icon = require('../assets/images/icons/voicemail-icon.png');
              break;
          }

          return (
            <Image
              source={icon}
              style={[
                styles.icon,
                {
                  tintColor: focused
                    ? Colors(isDarkMode).primaryBackground
                    : Colors(isDarkMode).secondaryText,
                },
              ]}
            />
          );
        },
        tabBarStyle: {
          backgroundColor: Colors(isDarkMode).headerText,
        },
        tabBarActiveTintColor: Colors(isDarkMode).primaryBackground,
        tabBarInactiveTintColor: Colors(isDarkMode).secondaryText,
        headerShown: true,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontSize: scaleFont(30),
          fontWeight: '400',
        },
        headerTintColor: Colors(isDarkMode).secondaryText,
        headerStyle: {
          height: scaleHeight(45),
          backgroundColor: Colors(isDarkMode).secondaryBackground,
        },
      })}>
      <Tab.Screen name="Recent" component={RecentScreen} />
      <Tab.Screen name="Phone Book" component={PhoneBookScreen} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} />
      <Tab.Screen name="Voicemail" component={VoicemailScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default BottomTabNavigator;
