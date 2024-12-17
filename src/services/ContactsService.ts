import {PermissionsAndroid, Platform} from 'react-native';
import Contacts from 'react-native-contacts';

export interface PersonalContact {
  name: string;
  lastname: string;
}

export const fetchPersonalContacts = async (): Promise<PersonalContact[]> => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Access Permission',
          message:
            'This app needs access to your contacts to display your contact list.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        },
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        throw new Error('Contacts access permission was denied.');
      }
    }

    const contacts = await Contacts.getAll();
    return contacts.map(contact => ({
      name: contact.givenName || '',
      lastname: contact.familyName || '',
    }));
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
    throw new Error('Failed to fetch contacts. Please check permissions.');
  }
};
