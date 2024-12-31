/**
 * @format
 */
import './gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import RNCallKeep from 'react-native-callkeep';
import {generateUUID} from './src/utils/UUID';

// Headless Task for Firebase Messaging
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background:', remoteMessage);

  if (remoteMessage.collapseKey) {
    const uuid = generateUUID();
    const callerName = 'Test Caller';
    const handle = 'RNCallKeep';

    RNCallKeep.displayIncomingCall(uuid, callerName, handle);
  }
});

AppRegistry.registerComponent(appName, () => App);
