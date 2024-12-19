import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scaleFont, scaleHeight, scaleWidth} from '../../utils/Responsive';
import i18n from '../../locales/i18n';

interface TaskInfoProps {
  title: string;
  dueDate: string;
  contactName: string;
  company: string;
  details: string;
}

const TaskInfo: React.FC<TaskInfoProps> = ({
  dueDate,
  contactName,
  company,
  details,
}) => {
  return (
    <View>
      <Text style={styles.label}>
        {i18n.t('tasks.contact')}:{' '}
        <Text style={styles.value}>{contactName}</Text>
      </Text>
      <Text style={styles.label}>
        {i18n.t('tasks.company')}: <Text style={styles.value}>{company}</Text>
      </Text>
      <Text style={styles.label}>
        {i18n.t('tasks.details')}: <Text style={styles.value}>{details}</Text>
      </Text>
      <Text style={styles.label}>
        {i18n.t('tasks.dueDate')}: <Text style={styles.value}>{dueDate}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(10),
    fontSize: scaleFont(18),
    fontWeight: '500',
    color: 'gray',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  value: {
    fontSize: scaleFont(20),
    fontWeight: '500',
    color: 'black',
  },
});

export default TaskInfo;
