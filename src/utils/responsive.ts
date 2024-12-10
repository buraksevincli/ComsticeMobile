import {Dimensions, PixelRatio} from 'react-native';

// Get device's screen dimensions
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// Standard dimensions (based on iPhone 11 as a baseline)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// Responsive width scaling
export const scaleWidth = (size: number): number =>
  (SCREEN_WIDTH / BASE_WIDTH) * size;

// Responsive height scaling
export const scaleHeight = (size: number): number =>
  (SCREEN_HEIGHT / BASE_HEIGHT) * size;

// Normalize font size based on screen size
export const scaleFont = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};
