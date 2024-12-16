import React from 'react';
import {SectionList, View, Text, StyleSheet, Image} from 'react-native';
import {scaleFont, scaleHeight, scaleWidth} from '../../utils/Responsive';
import {Colors} from '../../constants/Colors';
import {useColorScheme} from 'react-native';
import {PersonalContact} from 'src/services/ContactsService';

interface PersonalContactsListProps {
  sections: {title: string; data: PersonalContact[]}[];
}

const PersonalContactsList: React.FC<PersonalContactsListProps> = ({
  sections,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => index.toString()}
      renderSectionHeader={({section: {title}}) => (
        <Text
          style={[
            styles.sectionHeader,
            {
              color: colors.blackText,
              backgroundColor: colors.lightGray,
            },
          ]}>
          {title}
        </Text>
      )}
      renderItem={({item}) => (
        <View style={styles.contactItem}>
          <Text style={[styles.contactText, {color: colors.blackText}]}>
            {item.name} {item.lastname}
          </Text>
        </View>
      )}
      ListEmptyComponent={
        <View
          style={{
            alignItems: 'center',
            marginTop: scaleHeight(50),
          }}>
          <Image
            source={require('../../assets/images/icons/user-icon.png')}
            style={{
              width: scaleWidth(100),
              height: scaleHeight(100),
              resizeMode: 'contain',
            }}
          />
          <View style={styles.textContainer}>
            <Text style={[styles.noResultsText, {color: colors.secondaryText}]}>
              No contacts found.
            </Text>
            <Text style={[styles.noResultsText, {color: colors.secondaryText}]}>
              Contacts access is required. Please allow access from settings.
            </Text>
          </View>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: scaleFont(20),
    fontWeight: '500',
    paddingVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(16),
  },
  contactItem: {
    paddingVertical: scaleHeight(10),
    marginHorizontal: scaleWidth(16),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactText: {
    fontSize: scaleFont(16),
  },
  textContainer: {
    marginTop: scaleHeight(20),
    marginHorizontal: scaleWidth(40),
  },
  noContactsText: {
    textAlign: 'center',
    marginTop: scaleHeight(20),
    fontSize: scaleFont(16),
  },
  noResultsText: {
    fontSize: scaleFont(14),
    textAlign: 'center',
    fontWeight: '500',
    marginTop: scaleHeight(5),
  },
});

export default PersonalContactsList;
