// import RNCallKeep from 'react-native-callkeep';
// import {PermissionsAndroid, Platform} from 'react-native';

// const options = {
//   ios: {
//     appName: 'ComsticeMobile',
//     includesCallsInRecents: false,
//     imageName: 'callkit_icon',
//   },
//   android: {
//     alertTitle: 'Permissions required',
//     alertDescription: 'This application needs to access your phone accounts',
//     cancelButton: 'Cancel',
//     okButton: 'OK',
//     imageName: 'phone_account_icon', // Android notification icon
//     additionalPermissions: [
//       PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
//       PermissionsAndroid.PERMISSIONS.ANSWER_PHONE_CALLS,
//       PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
//       PermissionsAndroid.PERMISSIONS.WRITE_CALL_LOG,
//     ],
//     foregroundService: {
//       channelId: 'com.comsticeMobile',
//       channelName: 'Foreground service for ComsticeMobile',
//       notificationTitle: 'ComsticeMobile is running in the background',
//       notificationIcon: 'ic_launcher_foreground', // Use a valid drawable resource name
//     },
//   },
// };

// const SetupRNCallKeep = async (): Promise<void> => {
//   try {
//     // Log the start of setup
//     console.log('Starting RNCallKeep setup...');

//     // Setup RNCallKeep
//     await RNCallKeep.setup(options);

//     console.log('RNCallKeep setup complete');

//     // Request permissions on Android
//     if (Platform.OS === 'android') {
//       const grantedPermissions = await PermissionsAndroid.requestMultiple(
//         options.android.additionalPermissions,
//       );

//       const allGranted = Object.values(grantedPermissions).every(
//         status => status === PermissionsAndroid.RESULTS.GRANTED,
//       );

//       if (allGranted) {
//         console.log('All permissions granted');
//       } else {
//         console.warn(
//           'Some permissions were not granted. RNCallKeep may not function properly.',
//         );
//       }
//     }

//     // Mark RNCallKeep as available
//     RNCallKeep.setAvailable(true);
//     console.log('RNCallKeep is now available');
//   } catch (error) {
//     console.error('Error setting up RNCallKeep:', error);
//   }
// };

// export default SetupRNCallKeep;
