/**
 * @format
 */
import './gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import RNCallKeep from 'react-native-callkeep';

AppRegistry.registerHeadlessTask(
  'RNCallKeepBackgroundMessage',
  () =>
    ({name, callUUID, handle}) => {
      // Make your call here
      console.log('RNCallKeepBackgroundMessage', name, callUUID, handle);
      return Promise.resolve();
    },
);

AppRegistry.registerComponent(appName, () => App);
