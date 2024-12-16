import Contacts from 'react-native-contacts';

export interface PersonalContact {
  name: string;
  lastname: string;
}

export const fetchPersonalContacts = async (): Promise<PersonalContact[]> => {
  try {
    const contacts = await Contacts.getAll();
    return contacts.map(contact => ({
      name: contact.givenName || '',
      lastname: contact.familyName || '',
    }));
  } catch (error) {
    throw new Error('Failed to fetch contacts. Please check permissions.');
  }
};
