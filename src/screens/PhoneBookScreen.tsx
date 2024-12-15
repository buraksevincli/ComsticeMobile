import React, {useState, useEffect} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import Contacts from 'react-native-contacts';
import TabBar from '../components/tabs/TabBar';
import PersonalContactsList from '../components/contacts/PersonalContacts';
import CorporateDirectoryList from '../components/contacts/CorporateDirectory';

export interface Contact {
  name: string;
  lastname: string;
}

const PhoneBookScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Personal Contacts');
  const [personalContacts, setPersonalContacts] = useState<Contact[]>([]);

  const corporateDirectory = [
    {name: 'Jane', lastname: 'Doe', company: 'TechCorp'},
    {name: 'John', lastname: 'Smith', company: 'TechCorp'},
    {name: 'Adele', lastname: 'Vasquez', company: 'Alpha Inc.'},
    {name: 'Arthur', lastname: 'Hudson', company: 'Beta Ltd.'},
    {name: 'Alvin', lastname: 'Mccarthy', company: 'Gamma Co.'},
  ];

  useEffect(() => {
    if (activeTab === 'Personal Contacts') {
      fetchContacts();
    }
  }, [activeTab]);

  const fetchContacts = async () => {
    try {
      const contacts = await Contacts.getAll();
      const formattedContacts: Contact[] = contacts.map(contact => ({
        name: contact.givenName || '',
        lastname: contact.familyName || '',
      }));
      setPersonalContacts(formattedContacts);
    } catch (error) {
      Alert.alert('Error', 'Contacts access is required.');
    }
  };

  const groupedContacts = personalContacts.reduce<Record<string, Contact[]>>(
    (acc, contact) => {
      const firstLetter = contact.name[0]?.toUpperCase() || '#';
      if (!acc[firstLetter]) acc[firstLetter] = [];
      acc[firstLetter].push(contact);
      return acc;
    },
    {},
  );

  const sections = Object.keys(groupedContacts)
    .sort()
    .map(letter => ({
      title: letter,
      data: groupedContacts[letter],
    }));

  return (
    <View style={styles.container}>
      <TabBar
        tabs={['Personal Contacts', 'Corporate Directory']}
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />

      {activeTab === 'Personal Contacts' ? (
        <PersonalContactsList sections={sections} />
      ) : (
        <CorporateDirectoryList data={corporateDirectory} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PhoneBookScreen;
