export interface Theme {
  background: string;
  primary: string;
  secondary: string;
  tertiary: string;
  text: string;
  boxes: {
    blue: string;
    blueHover: string;
    orange: string;
    orangeHover: string;
    green: string;
    greenHover: string;
    purple: string;
    purpleHover: string;
  };
}

export const LIGHT_THEME: Theme = {
  background: '#FFFFFF',
  primary: '#70D1FE',
  secondary: '#FED90F',
  tertiary: '#424F46',
  text: '#000',
  boxes: {
    blue: '#70D1FE',
    blueHover: '#4db8f2',
    orange: '#ED6820',
    orangeHover: '#d65a1c',
    green: '#91e010',
    greenHover: '#7ac20d',
    purple: '#995ef7',
    purpleHover: '#8a4cd9',
  },
};

export const DARK_THEME: Theme = {
  ...LIGHT_THEME,
  background: '#121212',
  primary: '#1587cf',
  secondary: '#ffce1a',
  tertiary: '#bdb0b9',
  text: '#ddd',
  boxes: {
    blue: '#1587cf',
    blueHover: '#0f6fa8',
    orange: '#b84b11',
    orangeHover: '#a43f0e',
    green: '#61940d',
    greenHover: '#4f7c0a',
    purple: '#5c15cf',
    purpleHover: '#4a12a8',
  },
};
