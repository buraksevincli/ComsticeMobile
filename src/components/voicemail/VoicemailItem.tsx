import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {scaleFont, scaleHeight, scaleWidth} from '../../utils/Responsive';
import {Colors} from '../../constants/Colors';
import {useColorScheme} from 'react-native';
import i18n from '../../locales/i18n';

interface VoicemailItemProps {
  voicemail: {
    id: string;
    number: string;
    duration: string;
    date: string;
  };
  onDelete: (id: string) => void;
  onPlay: (voicemail: {
    id: string;
    number: string;
    duration: string;
    date: string;
  }) => void;
}

const VoicemailItem: React.FC<VoicemailItemProps> = ({
  voicemail,
  onDelete,
  onPlay,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  const renderRightActions = () => (
    <View style={[styles.deleteContainer, {backgroundColor: colors.error}]}>
      <TouchableOpacity onPress={() => onDelete(voicemail.id)}>
        <Text style={[styles.deleteText, {color: colors.headerText}]}>
          {i18n.t('contacts.delete')}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={[styles.container]}>
        <View>
          <Text style={[styles.number, {color: colors.blackText}]}>
            {voicemail.number}
          </Text>
          <Text style={[styles.date, {color: colors.secondaryText}]}>
            {voicemail.date}
          </Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={[styles.duration, {color: colors.secondaryText}]}>
            {voicemail.duration}
          </Text>
          <TouchableOpacity onPress={() => onPlay(voicemail)}>
            <Image
              source={require('../../assets/images/icons/play-icon.png')}
              style={styles.playIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaleHeight(15),
    paddingVertical: scaleHeight(12),
    marginHorizontal: scaleWidth(10),
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  number: {fontSize: scaleFont(16), fontWeight: '500'},
  date: {fontSize: scaleFont(14), marginTop: scaleHeight(3)},
  duration: {fontSize: scaleFont(14), marginRight: scaleWidth(10)},
  deleteContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopLeftRadius: scaleWidth(5),
    borderBottomLeftRadius: scaleWidth(5),
  },
  deleteText: {
    fontSize: scaleFont(16),
    paddingHorizontal: scaleWidth(20),
    fontWeight: '500',
  },
  rightSection: {flexDirection: 'row', alignItems: 'center'},
  playIcon: {
    width: scaleWidth(32),
    height: scaleWidth(32),
    resizeMode: 'contain',
  },
});

export default VoicemailItem;
