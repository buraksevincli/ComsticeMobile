import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const RecentScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No recent call found.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default RecentScreen;
