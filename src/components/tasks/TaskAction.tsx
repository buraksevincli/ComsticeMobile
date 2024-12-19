import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {scaleFont, scaleHeight, scaleWidth} from '../../utils/Responsive';
import i18n from '../../locales/i18n';
import {Colors} from '../../constants/Colors';

interface TaskActionProps {
  action: string;
  isCompleted: boolean;
  onToggle: (value: boolean) => void;
}

const TaskAction: React.FC<TaskActionProps> = ({
  action,
  isCompleted,
  onToggle,
}) => {
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

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'call':
        return i18n.t('tasks.call');
      case 'email':
        return i18n.t('tasks.email');
      case 'schedule':
        return i18n.t('tasks.schedule');
      default:
        return i18n.t('tasks.unknown');
    }
  };

  return (
    <View>
      <View style={styles.actionContainer}>
        <Text style={styles.label}>{i18n.t('tasks.action')}:</Text>
        <TouchableOpacity
          style={[
            styles.actionButton,
            {backgroundColor: colors.primaryBackground},
          ]}
          onPress={() => {}}>
          <Image source={getActionIcon(action)} style={styles.icon} />
          <Text style={[styles.actionText, {color: colors.headerText}]}>
            {getActionLabel(action)}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>{i18n.t('tasks.completed')}:</Text>
        <Switch value={isCompleted} onValueChange={onToggle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: scaleFont(18),
    fontWeight: '500',
    color: 'gray',
    marginRight: scaleWidth(20),
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'gray',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(12),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaleHeight(6),
    paddingHorizontal: scaleWidth(60),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    width: scaleWidth(26),
    height: scaleWidth(26),
    resizeMode: 'contain',
    marginRight: scaleWidth(8),
  },
  actionText: {
    fontSize: scaleFont(26),
    fontWeight: '500',
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(10),
  },
});

export default TaskAction;
