import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import {store} from './store/store';
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

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
