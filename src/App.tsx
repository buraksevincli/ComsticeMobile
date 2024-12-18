import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import {store} from './store/Store';
import BootSplash from 'react-native-bootsplash';

// import SetupRNCallKeep from './services/SetupRNCallKeep';
// import {Platform} from 'react-native';

const App: React.FC = () => {
  // useEffect(() => {
  //   const setupCallKeep = async () => {
  //     try {
  //       // if (Platform.OS === 'ios' || Platform.OS === 'android')
  //       if (Platform.OS === 'ios') {
  //         await SetupRNCallKeep();
  //         console.log('RNCallKeep successfully initialized');
  //       }
  //     } catch (error) {
  //       console.error('Error initializing RNCallKeep:', error);
  //     }
  //   };
  //   setupCallKeep();
  // }, []);

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
