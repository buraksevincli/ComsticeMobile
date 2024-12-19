import React, {useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import TaskInfo from '../components/tasks/TaskInfo';
import TaskAction from '../components/tasks/TaskAction';
import TaskComments from '../components/tasks/TaskComments';
import CustomButton from '../components/buttons/CustomButton';
import {Colors} from '../constants/Colors';
import {useColorScheme} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator';
import {scaleHeight, scaleWidth} from '../../src/utils/Responsive';
import i18n from '../locales/i18n';

type TaskDetailScreenProps = {
  route: RouteProp<RootStackParamList, 'TaskDetail'>;
};

const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({route}) => {
  const {title, due_date, action, cust_name, company, details} = route.params;

  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [comments, setComments] = useState<string>('...');

  const handleUpdate = () => {
    console.log('Task Updated:');
  };

  return (
    <View style={[styles.container]}>
      {/* Task Information */}
      <TaskInfo
        title={title}
        dueDate={due_date}
        contactName={cust_name}
        company={company}
        details={details}
      />

      {/* Task Action */}
      <TaskAction
        action={action}
        isCompleted={isCompleted}
        onToggle={setIsCompleted}
      />

      {/* Task Comments */}
      <TaskComments comments={comments} setComments={setComments} />

      {/* Update Button */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title={i18n.t('settings.update')}
          onPress={handleUpdate}
          color={colors.primaryButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scaleWidth(16),
  },
  buttonContainer: {
    position: 'absolute',
    left: scaleWidth(20),
    right: scaleWidth(20),
    bottom: 50,
  },
});

export default TaskDetailScreen;
