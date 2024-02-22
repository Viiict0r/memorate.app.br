export const lighter = '#f5f5f5';
export const lightgrey = '#EDEDED';
export const orange = '#ffb950';
export const green = '#0bd96e';
export const grey = '#aeaeae';
export const darkgrey = '#676767';
export const darker = '#141414';
export const grey3 = '#303030';
export const grey4 = '#1F1F1F';
export const gradient = ['#BD00FF', '#2F00B6'];
export const red = '#ff3b30';

export default {
  light: {
    text: darker,
    text_gray: 'rgba(35, 35, 35, 0.50)',
    background_gradient: gradient,
    background: lighter,
    input_border: 'rgba(174, 174, 174, 0.4)',
    sheet_background: lighter,
    tabbar: {
      inactive_icon: '#19191999',
      border: 'rgba(25, 25, 25, 0.20)',
      background: 'rgba(255, 255, 255, 0.10)',
    },
    avatar_placeholder: {
      border: 'rgba(35, 35, 35, 0.30)',
      background: 'rgba(35, 35, 35, 0.15)',
    },
    birthday_card: {
      today: {
        background: green,
        btn_background: darker,
      },
      recent: {
        background: lightgrey,
        text: grey3,
      },
    },
  },
  dark: {
    text: lighter,
    text_gray: 'rgba(255, 255, 255, 0.50)',
    background_gradient: gradient,
    background: darker,
    input_border: grey3,
    sheet_background: 'rgba(37, 37, 37, 1)',
    tabbar: {
      inactive_icon: 'rgba(255, 255, 255, 0.6)',
      border: 'rgba(255, 255, 255, 0.20)',
      background: 'rgba(25, 25, 25, 0.50)',
    },
    avatar_placeholder: {
      border: 'rgba(255, 255, 255, 0.30)',
      background: 'rgba(255, 255, 255, 0.15)',
    },
    birthday_card: {
      today: {
        background: green,
        btn_background: darker,
      },
      recent: {
        background: grey4,
        text: darkgrey,
      },
    },
  },
};
