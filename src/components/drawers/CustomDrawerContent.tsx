import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  useColorScheme,
  Alert,
} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Colors} from '../../constants/Colors';
import {scaleWidth, scaleHeight, scaleFont} from '../../utils/Responsive';
import i18n from '../../locales/i18n';
import {useAppSelector} from '../../hooks/ReduxHooks';
import {ucceLoginService} from '../../services/UCCELoginService';

interface CustomDrawerContentProps {
  navigation: any;
}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = props => {
  const {username, password} = useAppSelector(state => state.agent);
  const {token, model} = useAppSelector(state => state.company);
  const [isAvailable, setIsAvailable] = React.useState(true);
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

  const handleSignOut = async () => {
    if (model === 'ucce') {
      try {
        const response = await ucceLoginService.keepAliveLogoutWithToken(
          username,
          password,
          token,
        );
        Alert.alert('Keepalive Logout Success', response.msg);
        props.navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      } catch (error: any) {
        Alert.alert('Logout Failed', error.message || 'An error occurred');
      }
    } else {
      props.navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        styles.container,
        {backgroundColor: colors.primaryBackground},
      ]}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={require('../../assets/images/icons/profile-icon.png')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Burak Sevincli</Text>
        </View>

        {/* Availability */}
        <View style={styles.availability}>
          <Text style={styles.availableText}>
            {i18n.t('navigation.available')}
          </Text>
          <Switch
            value={isAvailable}
            onValueChange={setIsAvailable}
            trackColor={{
              true: colors.primaryButton,
              false: colors.placeholderText,
            }}
            thumbColor={colors.headerText}
          />
        </View>
      </View>
      {/* Drawer Items */}
      <DrawerItem
        label={i18n.t('navigation.calls')}
        onPress={() => props.navigation.navigate('Calls')}
        labelStyle={styles.drawerLabel}
        icon={() => (
          <Image
            source={require('../../assets/images/icons/calls-icon.png')}
            style={styles.icon}
          />
        )}
      />
      <DrawerItem
        label={i18n.t('navigation.tasks')}
        onPress={() => props.navigation.navigate('Tasks')}
        labelStyle={styles.drawerLabel}
        icon={() => (
          <Image
            source={require('../../assets/images/icons/tasks-icon.png')}
            style={styles.icon}
          />
        )}
      />
      <DrawerItem
        label={i18n.t('navigation.messages')}
        onPress={() => props.navigation.navigate('Messages')}
        labelStyle={styles.drawerLabel}
        icon={() => (
          <Image
            source={require('../../assets/images/icons/messages-icon.png')}
            style={styles.icon}
          />
        )}
      />
      <DrawerItem
        label={i18n.t('navigation.crm')}
        onPress={() => props.navigation.navigate('CRM')}
        labelStyle={styles.drawerLabel}
        icon={() => (
          <Image
            source={require('../../assets/images/icons/crm-icon.png')}
            style={styles.icon}
          />
        )}
      />
      <DrawerItem
        label={i18n.t('navigation.preferences')}
        onPress={() => props.navigation.navigate('Preferences')}
        labelStyle={styles.drawerLabel}
        icon={() => (
          <Image
            source={require('../../assets/images/icons/settings-icon.png')}
            style={styles.icon}
          />
        )}
      />
      <DrawerItem
        label={i18n.t('navigation.signOut')}
        style={{marginTop: scaleHeight(20)}}
        onPress={() => {
          handleSignOut();
        }}
        labelStyle={[
          styles.drawerLabel,
          {color: colors.error, fontWeight: 'bold', fontSize: scaleFont(26)},
        ]}
        icon={() => (
          <Image
            source={require('../../assets/images/icons/exit-icon.png')}
            style={styles.icon}
          />
        )}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Image
          source={require('../../assets/images/logos/comstice-logo.png')}
          style={styles.footerLogo}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    headerSection: {
      marginVertical: scaleHeight(30),
      paddingHorizontal: scaleWidth(25),
    },
    profileSection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: scaleWidth(10),
    },
    profileImage: {
      width: scaleWidth(45),
      height: scaleWidth(45),
      borderRadius: scaleWidth(40),
      marginBottom: scaleHeight(10),
    },
    profileName: {
      fontSize: scaleFont(18),
      lineHeight: scaleWidth(18),
      color: Colors(isDarkMode).headerText,
      marginBottom: scaleHeight(5),
      marginLeft: scaleWidth(15),
    },
    availability: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    availableText: {
      fontSize: scaleFont(16),
      fontWeight: 'bold',
      color: Colors(isDarkMode).headerText,
      marginRight: scaleWidth(10),
    },
    drawerLabel: {
      fontSize: scaleFont(24),
      letterSpacing: scaleFont(0.5),
      lineHeight: scaleHeight(45),
      color: Colors(isDarkMode).headerText,
    },
    icon: {
      width: scaleWidth(24),
      height: scaleHeight(24),
      marginRight: scaleWidth(20),
      marginLeft: scaleWidth(10),
      resizeMode: 'contain',
    },
    signOut: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: scaleWidth(15),
      marginTop: scaleHeight(30),
    },
    signOutText: {
      fontSize: scaleFont(24),
      letterSpacing: scaleFont(0.5),
      lineHeight: scaleHeight(45),
      marginLeft: scaleWidth(10),
      fontWeight: 'bold',
      color: Colors(isDarkMode).error,
    },
    footer: {
      position: 'absolute',
      bottom: scaleHeight(30),
      alignItems: 'center',
      width: '100%',
    },
    footerText: {
      fontSize: scaleFont(12),
      color: Colors(isDarkMode).headerText,
    },
    footerLogo: {
      width: scaleWidth(100),
      height: scaleHeight(30),
      resizeMode: 'contain',
    },
  });

export default CustomDrawerContent;
