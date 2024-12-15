import React, {useState} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import SearchInput from '../inputs/SearchInput';
import CustomButton from '../buttons/CustomButton';
import {scaleFont, scaleHeight, scaleWidth} from '../../utils/responsive';
import {Colors} from '../../constants/colors';
import {useColorScheme} from 'react-native';

interface CorporateDirectoryListProps {
  data: {name: string; lastname: string; company: string}[];
}

const CorporateDirectoryList: React.FC<CorporateDirectoryListProps> = ({
  data,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  const [searchParams, setSearchParams] = useState({
    name: '',
    lastname: '',
    company: '',
  });
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = () => {
    const filtered = data.filter(
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
    setFilteredData(filtered);
  };

  const handleInputChange = (field: string, value: string) => {
    setSearchParams(prev => ({...prev, [field]: value}));
  };

  return (
    <View style={styles.container}>
      {/* Search Inputs */}
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

      {/* Search Button */}
      <CustomButton title="Search" onPress={handleSearch} fullWidth />

      {/* Results */}
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
          <Text style={[styles.noResultsText, {color: colors.secondaryText}]}>
            No contacts found.
          </Text>
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
    marginTop: scaleHeight(20),
  },
});

export default CorporateDirectoryList;
