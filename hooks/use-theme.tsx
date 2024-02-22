import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

type IThemeContext = {
  theme: 'dark' | 'light';
  toggle: () => void;
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const systemTheme = useColorScheme() || 'light';
  const [currentTheme, setCurrentTheme] = useState(systemTheme);

  const toggle = () => {
    setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark');

    AsyncStorage.setItem('theme', currentTheme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    /** Load from async storage */
    AsyncStorage.getItem('theme')
      .then((theme) => {
        if (theme) setCurrentTheme(theme as 'light' | 'dark');
      })
      .catch(() => null);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        toggle,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
