export interface Theme {
  background: string;
  primary: string;
  secondary: string;
  tertiary: string;
  text: string;
}

export const LIGHT_THEME: Theme = {
  background: '#D1DEE5',
  primary: '#1587cf',
  secondary: '#ffce1a',
  tertiary: '#e8eef2',
  text: '#000',
};

export const DARK_THEME: Theme = {
  ...LIGHT_THEME,
//   primary: '#1587cf',
//   secondary: '#ffce1a',
//   tertiary: '#17110d',
//   background: '#121212',
//   text: '#ddd'
};
