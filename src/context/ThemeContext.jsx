import { createContext, useContext, useEffect, useState } from 'react';
import { theme } from '../styles/theme';

// Create context with default values
const ThemeContext = createContext({
  isDarkMode: true,
  toggleTheme: () => {},
  currentTheme: theme.dark,
});

export const ThemeProvider = ({ children }) => {
  // const [isDarkMode, setIsDarkMode] = useState(true);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    // This prevent from the page keeping rendering dark mode even if the user has set light mode in their browser
    // Check localStorage for a saved theme preference
    const savedTheme = localStorage.getItem('theme'); // This would check localStorage for a saved theme preference
    return savedTheme ? savedTheme === 'dark' : true; // Default to dark mode if no preference is saved
  })

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => useContext(ThemeContext);
