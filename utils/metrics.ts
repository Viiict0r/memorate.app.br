import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// iphone 14 & 15 pro
const guidelineBaseWidth = 393;
const guidelineBaseHeight = 852;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.3) =>
  size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };
