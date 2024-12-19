import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import TabBar from '../components/tabs/TabBar';
import PersonalContactsList from '../components/contacts/PersonalContacts';
import CorporateDirectoryList from '../components/contacts/CorporateDirectory';
import LoadingOverlay from '../components/common/LoadingOverlay';
import {useAppDispatch, useAppSelector} from '../hooks/ReduxHooks';
import {
  fetchContactsThunk,
  fetchCorporateDirectoryThunk,
} from '../store/slices/ContactsSlice';
import {PersonalContact} from 'src/services/ContactsService';
import i18n from '../locales/i18n';

const PhoneBookScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const {personalContacts, corporateDirectory, loading} = useAppSelector(
    state => state.contacts,
  );

  const [activeTab, setActiveTab] = useState<string>(
    i18n.t('contacts.personalContacts'),
  );
  const [isPersonalContactsFetched, setIsPersonalContactsFetched] =
    useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState({
    name: '',
    lastname: '',
    company: '',
  });

  useEffect(() => {
    if (
      activeTab === i18n.t('contacts.personalContacts') &&
      !isPersonalContactsFetched
    ) {
      dispatch(fetchContactsThunk());
      setIsPersonalContactsFetched(true);
    }
  }, [activeTab, dispatch, isPersonalContactsFetched]);

  useEffect(() => {
    if (
      activeTab === i18n.t('contacts.corporateDirectory') &&
      corporateDirectory.length === 0
    ) {
      dispatch(fetchCorporateDirectoryThunk(searchParams));
    }
  }, [activeTab]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await dispatch(fetchContactsThunk());
    setIsRefreshing(false);
  };

  const handleSearch = () => {
    if (activeTab === i18n.t('contacts.corporateDirectory')) {
      dispatch(fetchCorporateDirectoryThunk(searchParams));
    }
  };

  const groupedContacts = personalContacts.reduce<
    Record<string, PersonalContact[]>
  >((acc, contact) => {
    const firstLetter = contact.name[0]?.toUpperCase() || '#';
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(contact);
    return acc;
  }, {});

  const sections = Object.keys(groupedContacts)
    .sort()
    .map(letter => ({
      title: letter,
      data: groupedContacts[letter],
    }));

  return (
    <View style={styles.container}>
      <TabBar
        tabs={[
          i18n.t('contacts.personalContacts'),
          i18n.t('contacts.corporateDirectory'),
        ]}
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />

      {activeTab === i18n.t('contacts.personalContacts') ? (
        loading && !isRefreshing ? (
          <LoadingOverlay
            visible={true}
            message={i18n.t('contacts.loadingPersonalContacts')}
          />
        ) : (
          <PersonalContactsList
            sections={sections}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        )
      ) : (
        <CorporateDirectoryList
          data={corporateDirectory}
          isLoading={loading}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          handleSearch={handleSearch}
        />
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
