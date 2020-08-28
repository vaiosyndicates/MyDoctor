const mainColor = {
  green1: '#0BCAD4',
  green2: '#EDFCFD',
  dark1: '#112340',
  dark2: '#495A75',
  dark3: '#EDEEF0',
  grey1: '#7D8797',
  grey2: '#E9E9E9',
  grey3: '#8092AF',
  grey4: '#B1B7C2',
  blue1: '#0066CB',
  black1: '#000000',
  black2: 'rgba(0,0,0,0.5)',
  red1: '#E06379',
};

export const colors = {
  primary: mainColor.green1,
  secondary: mainColor.dark1,
  third: mainColor.blue1,
  white: 'white',
  black: 'black',
  text: {
    primary: mainColor.dark1,
    secondary: mainColor.grey1,
    third: mainColor.grey3,
    inactive: mainColor.dark2,
    active: mainColor.green1,
    input: mainColor.grey4,
  },
  button: {
    primary: {
      background: mainColor.green1,
      text: 'white',
    },
    secondary: {
      background: 'white',
      text: mainColor.dark1,
    },
    active: {
      background: mainColor.blue1,
    },
    disable: {
      background: mainColor.grey3,
      text: mainColor.grey4,
    },
  },
  border: mainColor.grey2,
  cardLight: mainColor.green2,
  disable: mainColor.dark3,
  loadingBackground: mainColor.black2,
  alert: mainColor.red1,
};
