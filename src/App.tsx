import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import {store} from './store/Store';
import BootSplash from 'react-native-bootsplash';
import {FirebaseMessagingService} from './services/FirebaseMessagingService';
import {RNCallKeepService} from './services/RNCallKeepService';
import {generateUUID} from './utils/UUID';
import RNCallKeep from 'react-native-callkeep';

const App: React.FC = () => {
  useEffect(() => {
    const init = async () => {
      // RNCallKeep initialization
      RNCallKeepService();

      // Request permissions & setup FCM
      await FirebaseMessagingService.requestUserPermission();
      await FirebaseMessagingService.getFcmToken();

      // Setup notification listeners
      FirebaseMessagingService.setupNotificationListeners();
      // TestCall();
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, []);

  // function TestCall() {
  //   const uuid = generateUUID();
  //   RNCallKeep.displayIncomingCall(uuid, 'Burak Test', 'RNCallKeep TestCall');
  // }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
