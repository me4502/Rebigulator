export interface Theme {
  background: string;
  primary: string;
  secondary: string;
  tertiary: string;
  text: string;
}

export const LIGHT_THEME: Theme = {
  background: '#FFFFFF',
  primary: '#70D1FE',
  secondary: '#FED90F',
  tertiary: '#424F46',
  text: '#000',
};

export const DARK_THEME: Theme = {
  ...LIGHT_THEME,
  background: '#121212',
  primary: '#1587cf',
  secondary: '#ffce1a',
  tertiary: '#bdb0b9',
  text: '#ddd',
};
