/**
 * @format
 */
import './gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
// import messaging from '@react-native-firebase/messaging';
// import {generateUUID} from './src/utils/UUID';
// import RNCallKeep from 'react-native-callkeep';

// // Background State Message Handler
// messaging().onNotificationOpenedApp(async remoteMessage => {
//   console.log('Message handled in the background state:', remoteMessage);
//   if (remoteMessage) {
//     const uuid = generateUUID();
//     const callerName = 'Test Call';
//     const handle = 'Background State Test Caller';

//     RNCallKeep.displayIncomingCall(uuid, callerName, handle);
//   }
// });

// // Killed State Message Handler
// messaging()
//   .getInitialNotification()
//   .then(remoteMessage => {
//     console.log('Message handled in the killed state:', remoteMessage);
//     if (remoteMessage) {
//       const uuid = generateUUID();
//       const callerName = 'Test Call';
//       const handle = 'Killed State Test Caller';

//       RNCallKeep.displayIncomingCall(uuid, callerName, handle);
//     }
//   });

AppRegistry.registerComponent(appName, () => App);
