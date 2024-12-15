import React from 'react';
import {SectionList, View, Text, StyleSheet} from 'react-native';
import {Contact} from '../../screens/PhoneBookScreen';
import {scaleFont, scaleHeight, scaleWidth} from '../../utils/responsive';
import {Colors} from '../../constants/colors';
import {useColorScheme} from 'react-native';

interface PersonalContactsListProps {
  sections: {title: string; data: Contact[]}[];
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
        <Text style={[styles.noContactsText, {color: colors.blackText}]}>
          No contacts found.
        </Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: scaleFont(20),
    fontWeight: 'bold',
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
  noContactsText: {
    textAlign: 'center',
    marginTop: scaleHeight(20),
    fontSize: scaleFont(16),
  },
});

export default PersonalContactsList;
