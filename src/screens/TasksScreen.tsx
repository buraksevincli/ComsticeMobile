import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, RefreshControl} from 'react-native';
import TaskItem from '../components/tasks/TaskItem';
import LoadingOverlay from '../components/common/LoadingOverlay';
import {fetchTasks} from '../services/TasksService';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator';
import i18n from '../locales/i18n';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TaskDetail'
>;

const TaskScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setIsLoading(true);
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setIsLoading(true);
    try {
      const refreshedTasks = await fetchTasks();
      setTasks(refreshedTasks);
    } catch (error) {
      console.error('Error refreshing tasks:', error);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  const handleTaskPress = (task: any) => {
    navigation.navigate('TaskDetail', {
      title: task.title,
      due_date: task.due_date,
      action: task.action,
      contactid: task.contactid,
      cust_name: task.cust_name,
      company: task.company,
      details: task.details,
    });
  };

  const renderTask = ({item}: {item: any}) => (
    <TaskItem task={item} onPress={() => handleTaskPress(item)} />
  );

  return (
    <View style={styles.container}>
      {isLoading && (
        <LoadingOverlay visible={true} message={i18n.t('tasks.loadingTasks')} />
      )}
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.contactid}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TaskScreen;
