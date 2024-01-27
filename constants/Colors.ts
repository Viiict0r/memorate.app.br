const lighter = '#f5f5f5';
const orange = '#ffb950';
const green = '#0bd96e';
const grey = '#aeaeae';
const darkgrey = '#676767';
const darker = '#141414';

export default {
  light: {
    text: darker,
    text_gray: 'rgba(35, 35, 35, 0.50)',
    background: lighter,
    tabbar: {
      inactive_icon: '#19191999',
      border: 'rgba(25, 25, 25, 0.20)',
      background: 'rgba(255, 255, 255, 0.10)',
    },
    avatar_placeholder: {
      border: 'rgba(35, 35, 35, 0.30)',
      background: 'rgba(35, 35, 35, 0.15)',
    },
  },
  dark: {
    text: lighter,
    text_gray: 'rgba(255, 255, 255, 0.50)',
    background: darker,
    tabbar: {
      inactive_icon: 'rgba(255, 255, 255, 0.6)',
      border: 'rgba(255, 255, 255, 0.20)',
      background: 'rgba(25, 25, 25, 0.50)',
    },
    avatar_placeholder: {
      border: 'rgba(255, 255, 255, 0.30)',
      background: 'rgba(255, 255, 255, 0.15)',
    },
  },
};
