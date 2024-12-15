const LightThemeColors = {
  // Primary and secondary branding colors
  primaryBackground: '#007AFF', // Main background blue
  secondaryBackground: '#F5F5F5', // Light gray for secondary areas
  primaryText: '#1E1E1E', // Dark text for light theme
  secondaryText: '#6E6E6E', // Less emphasized text
  placeholderText: '#B0BEC5', // Text used in inputs
  headerText: 'white', // Text specifically for headers
  footerText: '#8E8E93', // Footer text gray

  // Interactive colors (buttons, links, etc.)
  primaryButton: 'rgb(84, 201, 111)', // Green for buttons
  buttonText: '#FFFFFF', // Text inside buttons
  link: '#007AFF', // Hyperlinks

  // Status colors
  error: 'rgb(253, 36, 101)', // Red for errors
  success: 'rgb(84, 201, 111)', // Green for success states
  warning: '#FFCC00', // Yellow for warnings
  info: '#5AC8FA', // Light blue for info messages

  // Border and divider colors
  border: '#E0E0E0', // Default border color
  divider: '#D1D1D6', // Divider between sections

  // Icon and interactive element colors
  icon: '#6E6E6E', // Default icon color
};

const DarkThemeColors = {
  // Primary and secondary branding colors
  primaryBackground: '#121212', // Main dark background
  secondaryBackground: '#1E1E1E', // Slightly lighter for secondary areas
  primaryText: '#E0E0E0', // Light text for dark theme
  secondaryText: '#888888', // Less emphasized text
  placeholderText: '#CCCCCC', // Text used in inputs
  headerText: '#FFFFFF', // Text specifically for headers
  footerText: '#AAAAAA', // Footer text gray

  // Interactive colors (buttons, links, etc.)
  primaryButton: 'rgb(48, 209, 88)', // Bright green for buttons
  buttonText: '#121212', // Dark text inside buttons
  link: '#5AC8FA', // Hyperlinks

  // Status colors
  error: 'rgb(253, 36, 101)', // Brighter red for errors
  success: 'rgb(48, 209, 88)', // Bright green for success states
  warning: '#FFCC00', // Yellow for warnings
  info: '#5AC8FA', // Light blue for info messages

  // Border and divider colors
  border: '#333333', // Default border color
  divider: '#444444', // Divider between sections

  // Icon and interactive element colors
  icon: '#A0A0A0', // Default icon color
};

export const Colors = (isDarkMode: boolean) =>
  isDarkMode ? DarkThemeColors : LightThemeColors;
