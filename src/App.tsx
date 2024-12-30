import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import {store} from './store/Store';
import BootSplash from 'react-native-bootsplash';
import RNCallKeep from 'react-native-callkeep';
import {RNCallKeepService} from './services/RNCallKeepService';
import {AppState, Platform} from 'react-native';
import {generateUUID} from './utils/UUID';

const App: React.FC = () => {
  useEffect(() => {
    const init = async () => {
      if (Platform.OS === 'android') RNCallKeepService();
      TestCall();
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, []);

  function TestCall() {
    const uuid = generateUUID();
    RNCallKeep.displayIncomingCall(uuid, 'Burak Test', 'RNCallKeep TestCall');
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
