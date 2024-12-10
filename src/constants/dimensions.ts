import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const BASE_WIDTH = 375; // Reference width (iPhone 11)
export const BASE_HEIGHT = 812; // Reference height (iPhone 11)
