import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {scaleFont, scaleHeight, scaleWidth} from '../utils/Responsive';
import {Colors} from '../constants/Colors';
import {useColorScheme} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import i18n from '../locales/i18n';

type VoicemailDetailProps = {
  route: RouteProp<
    {VoicemailDetail: {number: string; duration: string; date: string}},
    'VoicemailDetail'
  >;
};

const VoicemailDetailScreen: React.FC<VoicemailDetailProps> = ({route}) => {
  const {number, duration, date} = route.params;

  const isDarkMode = useColorScheme() === 'dark';
  const colors = Colors(isDarkMode);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const sliderValueRef = useRef<number>(0); // Ref for slider value
  const maxDuration = useRef<number>(convertToSeconds(duration)); // Ref for max duration
  const [sliderValue, setSliderValue] = useState<number>(0); // For rendering only
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        sliderValueRef.current += 1;
        if (sliderValueRef.current >= maxDuration.current) {
          sliderValueRef.current = maxDuration.current;
          setIsPlaying(false);
          clearInterval(intervalRef.current as NodeJS.Timeout);
        }
        setSliderValue(sliderValueRef.current); // Update UI only
      }, 1000);
    } else {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }

    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  function convertToSeconds(time: string): number {
    const [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds;
  }

  const formatTime = (value: number) => {
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.number, {color: colors.blackText}]}>{number}</Text>
        <Text style={[styles.date, {color: colors.secondaryText}]}>{date}</Text>
      </View>
      {/* Play/Pause and Slider Section */}
      <View style={styles.sliderContainer}>
        <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
          <Image
            source={
              isPlaying
                ? require('../assets/images/icons/big-pause-icon.png')
                : require('../assets/images/icons/big-play-icon.png')
            }
            style={styles.playIcon}
          />
        </TouchableOpacity>

        <View style={styles.sliderWrapper}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={maxDuration.current}
            value={sliderValue}
            step={1}
            minimumTrackTintColor={colors.primaryButton}
            maximumTrackTintColor={colors.divider}
            thumbTintColor={colors.primaryButton}
            // onSlidingStart={() => setIsPlaying(false)}
            onSlidingComplete={value => {
              sliderValueRef.current = value;
              setSliderValue(value);
            }}
          />
          <View style={styles.timerContainer}>
            <Text style={[styles.timerText, {color: colors.secondaryText}]}>
              {formatTime(sliderValue)}
            </Text>
            <Text style={[styles.timerText, {color: colors.secondaryText}]}>
              {formatTime(maxDuration.current)}
            </Text>
          </View>
        </View>
      </View>
      {/* Transcription Section */}
      <View style={styles.transcriptionContainer}>
        <Text style={[styles.transcriptionTitle, {color: colors.blackText}]}>
          {i18n.t('voicemail.transcription')}{' '}
          <Text style={{fontStyle: 'italic', fontWeight: '400'}}>
            {' '}
            (If AI support)
          </Text>
        </Text>
        <Text style={[styles.transcriptionText, {color: colors.secondaryText}]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et
          nunc feugiat, consequat lectus eget, pharetra neque. Fusce interdum
          quam et gravida aliquet. Proin ut lorem ut mauris pharetra gravida.
          Vestibulum euismod tristique magna, non euismod tortor egestas a.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleWidth(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(10),
  },
  number: {
    fontSize: scaleFont(20),
    fontWeight: '500',
  },
  date: {
    fontSize: scaleFont(18),
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleHeight(20),
  },
  playButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleWidth(20),
  },
  playIcon: {
    width: scaleWidth(60),
    height: scaleWidth(60),
    resizeMode: 'contain',
  },
  sliderWrapper: {
    flex: 1,
  },
  slider: {
    marginBottom: scaleHeight(5),
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timerText: {
    fontSize: scaleFont(14),
    fontWeight: '500',
    marginHorizontal: scaleWidth(5),
  },
  transcriptionContainer: {
    marginTop: scaleHeight(30),
  },
  transcriptionTitle: {
    fontSize: scaleFont(18),
    fontWeight: '500',
    marginBottom: scaleHeight(10),
  },
  transcriptionText: {
    fontSize: scaleFont(14),
    lineHeight: scaleHeight(20),
  },
});

export default VoicemailDetailScreen;
