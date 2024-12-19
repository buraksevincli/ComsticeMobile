import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {scaleFont, scaleHeight, scaleWidth} from '../../utils/Responsive';
import i18n from '../../locales/i18n';

interface TaskCommentsProps {
  comments: string;
  setComments: (value: string) => void;
}

const TaskComments: React.FC<TaskCommentsProps> = ({comments, setComments}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{i18n.t('tasks.comments')}:</Text>
      <TextInput
        style={styles.textInput}
        value={comments}
        onChangeText={setComments}
        multiline
        maxLength={2000}
      />
      <Text style={styles.charCount}>{comments.length}/2000</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(10),
  },
  label: {
    fontSize: scaleFont(18),
    fontWeight: '500',
    color: 'gray',
  },
  textInput: {
    height: scaleHeight(150),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    marginTop: scaleHeight(10),
  },
  charCount: {
    textAlign: 'right',
    marginTop: scaleHeight(5),
    fontSize: scaleFont(14),
    color: '#999',
  },
});

export default TaskComments;
