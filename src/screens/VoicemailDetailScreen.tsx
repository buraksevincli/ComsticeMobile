import React, {useState, useEffect} from 'react';
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
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [maxDuration] = useState<number>(convertToSeconds(duration));

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isPlaying) {
      interval = setInterval(() => {
        setSliderValue(prev => {
          if (prev >= maxDuration) {
            setIsPlaying(false);
            clearInterval(interval);
            return maxDuration;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, maxDuration]);

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
        {/* Play/Pause Icon */}
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

        {/* Slider Section */}
        <View style={styles.sliderWrapper}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={maxDuration}
            value={sliderValue}
            minimumTrackTintColor={colors.primaryButton}
            maximumTrackTintColor={colors.divider}
            thumbTintColor={colors.primaryButton}
            onValueChange={value => setSliderValue(Math.floor(value))}
          />

          {/* Timer Section */}
          <View style={styles.timerContainer}>
            <Text style={[styles.timerText, {color: colors.secondaryText}]}>
              {formatTime(sliderValue)}
            </Text>
            <Text style={[styles.timerText, {color: colors.secondaryText}]}>
              {formatTime(maxDuration)}
            </Text>
          </View>
        </View>
      </View>

      {/* Transcription Section */}
      <View style={styles.transcriptionContainer}>
        <Text style={[styles.transcriptionTitle, {color: colors.blackText}]}>
          Transcription{' '}
          <Text style={{fontStyle: 'italic'}}> (If AI support)</Text>
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
    backgroundColor: '#fff',
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
