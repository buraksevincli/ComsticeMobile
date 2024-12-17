import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import VoicemailItem from '../components/voicemail/VoicemailItem';
import LoadingOverlay from '../components/common/LoadingOverlay';
import {fetchVoicemails, Voicemail} from '../services/VoicemailService';

const VoicemailScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [voicemails, setVoicemails] = useState<Voicemail[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadVoicemails = async () => {
    try {
      setIsLoading(true);
      const data = await fetchVoicemails();
      setVoicemails(data);
    } catch (error) {
      console.error('Error fetching voicemails:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVoicemails();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadVoicemails();
    setIsRefreshing(false);
  };

  const handleDelete = (id: string) => {
    setVoicemails(prev => prev.filter(item => item.id !== id));
  };

  const handlePlay = () => {
    navigation.navigate('VoicemailDetail');
  };

  if (isLoading) {
    return (
      <LoadingOverlay visible={isLoading} message="Loading Voicemails..." />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={voicemails}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <VoicemailItem
            voicemail={item}
            onDelete={handleDelete}
            onPlay={handlePlay}
          />
        )}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default VoicemailScreen;
