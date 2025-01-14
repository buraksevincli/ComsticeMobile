import {Alert, PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const FirebaseMessagingService = {
  async requestUserPermission() {
    try {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        console.log('Android notification permission:', granted);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const authStatus = await messaging().requestPermission({
          provisional: true,
          providesAppNotificationSettings: true,
        });
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        console.log('iOS notification permission:', enabled);
        return enabled;
      }
    } catch (error) {
      console.error('Permission request error:', error);
      return false;
    }
  },

  async getFcmToken() {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('Firebase token:', fcmToken);
        return fcmToken;
      } else {
        console.warn('No FCM token received');
        return null;
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  },

  async getAPNSToken() {
    if (Platform.OS !== 'ios') return null;
    try {
      const apnsToken = await messaging().getAPNSToken();
      if (apnsToken) {
        console.log('APNS token:', apnsToken);
        return apnsToken;
      } else {
        console.warn('No APNS token received');
        return null;
      }
    } catch (error) {
      console.error('Error getting APNS token:', error);
      return null;
    }
  },

  async setupNotificationListeners() {
    // Foreground notification listener
    const foregroundListener = messaging().onMessage(async remoteMessage => {
      console.log('Foreground notification:', remoteMessage);
      const title = remoteMessage.notification?.title || 'Notification';
      const body = remoteMessage.notification?.body || 'No message body';
      Alert.alert(title, body);
    });

    return () => {
      foregroundListener(); // Unsubscribe foreground listener
    };
  },
};
