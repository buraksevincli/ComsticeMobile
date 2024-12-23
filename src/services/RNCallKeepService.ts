import RNCallKeep from 'react-native-callkeep';

export function RNCallKeepService() {
  RNCallKeep.setup({
    ios: {
      appName: 'ComsticeMobile',
    },
    android: {
      alertTitle: 'Permissions required',
      alertDescription: 'This application needs to access your phone accounts',
      cancelButton: 'Cancel',
      okButton: 'ok',
      additionalPermissions: [],
    },
  });
}
