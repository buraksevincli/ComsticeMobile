import React, {useState} from 'react';
import {View, FlatList, Text, StyleSheet, Image} from 'react-native';
import SearchInput from '../inputs/SearchInput';
import CustomButton from '../buttons/CustomButton';
import {scaleFont, scaleHeight, scaleWidth} from '../../utils/Responsive';
import {Colors} from '../../constants/Colors';
import {useColorScheme} from 'react-native';
import {Contact} from '../../screens/PhoneBookScreen';
import LoadingOverlay from '../../components/common/LoadingOverlay';

interface CorporateContact extends Contact {
  company: string;
}

interface CorporateDirectoryListProps {
  data: CorporateContact[];
  isLoading: boolean;
  searchParams: {
    name: string;
    lastname: string;
    company: string;
  };
  setSearchParams: React.Dispatch<
    React.SetStateAction<{
      name: string;
      lastname: string;
      company: string;
    }>
  >;
  handleSearch: () => void;
}

const CorporateDirectoryList: React.FC<CorporateDirectoryListProps> = ({
  data,
  isLoading,
  searchParams,
  setSearchParams,
  handleSearch,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  const [filteredData, setFilteredData] = useState<CorporateContact[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setSearchParams(prev => ({...prev, [field]: value}));
  };

  const onSearchClick = () => {
    const results = data.filter(
      item =>
        (searchParams.name === '' ||
          item.name.toLowerCase().includes(searchParams.name.toLowerCase())) &&
        (searchParams.lastname === '' ||
          item.lastname
            .toLowerCase()
            .includes(searchParams.lastname.toLowerCase())) &&
        (searchParams.company === '' ||
          item.company
            .toLowerCase()
            .includes(searchParams.company.toLowerCase())),
    );
    setFilteredData(results);
    handleSearch();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingOverlay visible={isLoading} message="Searching Contacts..." />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchInput
        placeholder="Name"
        value={searchParams.name}
        onChangeText={value => handleInputChange('name', value)}
      />
      <SearchInput
        placeholder="Lastname"
        value={searchParams.lastname}
        onChangeText={value => handleInputChange('lastname', value)}
      />
      <SearchInput
        placeholder="Company"
        value={searchParams.company}
        onChangeText={value => handleInputChange('company', value)}
      />
      <CustomButton title="Search" onPress={onSearchClick} fullWidth />

      <FlatList
        style={{marginTop: scaleHeight(20)}}
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View
            style={[styles.resultItem, {borderBottomColor: colors.lightGray}]}>
            <Text style={[styles.resultText, {color: colors.blackText}]}>
              {item.name} {item.lastname}
            </Text>
            <Text style={[styles.resultText, {color: colors.secondaryText}]}>
              {item.company}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={{alignItems: 'center', marginTop: scaleHeight(50)}}>
            <Image
              source={require('../../assets/images/icons/user-icon.png')}
              style={{
                width: scaleWidth(100),
                height: scaleHeight(100),
                resizeMode: 'contain',
              }}
            />
            <Text style={[styles.noResultsText, {color: colors.secondaryText}]}>
              No contacts found.
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleWidth(16),
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scaleHeight(8),
    borderBottomWidth: 1,
  },
  resultText: {
    fontSize: scaleFont(16),
  },
  noResultsText: {
    fontSize: scaleFont(14),
    textAlign: 'center',
    fontWeight: '500',
    marginTop: scaleHeight(20),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CorporateDirectoryList;
