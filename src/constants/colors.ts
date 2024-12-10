const LightThemeColors = {
  primary: '#007AFF', // Background blue
  white: 'white',
  green: 'rgb(84, 201, 111)',
  textGray: '#B0BEC5', // Placeholder gray
  footerGray: '#8E8E93', // Footer text gray
};

const DarkThemeColors = {
  primary: '#1E1E1E', // Dark background
  white: 'white',
  green: 'rgb(84, 201, 111)',
  textGray: '#888888', // Placeholder gray
  footerGray: '#666666', // Footer text gray
};

export const Colors = (isDarkMode: boolean) =>
  isDarkMode ? DarkThemeColors : LightThemeColors;
