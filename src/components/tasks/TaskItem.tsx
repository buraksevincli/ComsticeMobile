import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {scaleFont, scaleHeight, scaleWidth} from '../../utils/Responsive';
import i18n from '../../locales/i18n';
import {Colors} from '../../constants/Colors';

interface TaskItemProps {
  task: {
    title: string;
    due_date: string;
    action: string;
  };
  onPress: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({task, onPress}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'call':
        return require('../../assets/images/icons/call-icon.png');
      case 'email':
        return require('../../assets/images/icons/email-icon.png');
      case 'schedule':
        return require('../../assets/images/icons/calendar-icon.png');
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={[styles.dueDate, {color: colors.secondaryText}]}>
          {i18n.t('tasks.dueDate')}: {task.due_date}
        </Text>
      </View>
      <Image source={getActionIcon(task.action)} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(20),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: '500',
  },
  dueDate: {
    marginTop: scaleHeight(5),
    fontSize: scaleFont(16),
    color: '',
  },
  icon: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    resizeMode: 'contain',
  },
});

export default TaskItem;
