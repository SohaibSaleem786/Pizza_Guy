import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [primaryColor, setPrimaryColor] = useState('#ac1e1e');
  const [secondaryColor, setSecondaryColor] = useState('white');
  const [navbarHeight, setNavbarHeight] = useState(30);
  const [pathHeight, setPathbarHeight] = useState(30);
  const [apiLinks , setapiLinks] = useState('https://crystalsolutions.com.pk/malikspicy');
  const [fontFamily, setfontFamily] = useState('Verdana');

  // Toggle the theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Define theme-related values
  const theme = {
    isDarkMode,
    toggleTheme,
    primaryColor,
    secondaryColor,
    navbarHeight,
    pathHeight,
    apiLinks,
    fontFamily,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}
