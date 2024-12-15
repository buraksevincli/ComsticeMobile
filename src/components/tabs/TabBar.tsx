import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {scaleWidth, scaleHeight, scaleFont} from '../../utils/responsive';
import {Colors} from '../../constants/colors';
import {useColorScheme} from 'react-native';

interface TabBarProps {
  tabs: string[];
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({tabs, activeTab, onTabPress}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  return (
    <View style={[styles.tabContainer, {backgroundColor: colors.lightGray}]}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            activeTab === tab && {backgroundColor: colors.headerText},
          ]}
          onPress={() => onTabPress(tab)}>
          <Text
            style={[
              styles.tabText,
              {
                color: activeTab === tab ? colors.blackText : colors.blackText,
              },
            ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    borderRadius: scaleWidth(10),
    marginHorizontal: scaleWidth(16),
    marginVertical: scaleHeight(10),
    padding: scaleWidth(2),
  },
  tab: {
    flex: 1,
    paddingVertical: scaleWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleWidth(8),
  },
  tabText: {
    fontSize: scaleFont(16),
    fontWeight: '500',
  },
});

export default TabBar;
