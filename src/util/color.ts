export interface Theme {
  background: string;
  primary: string;
  secondary: string;
  tertiary: string;
  text: string;
  boxes: {
    blue: string;
    orange: string;
    green: string;
    purple: string;
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
    orange: '#ED6820',
    green: '#91e010',
    purple: '#995ef7',
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
    orange: '#b84b11',
    green: '#61940d',
    purple: '#5c15cf',
  },
};
