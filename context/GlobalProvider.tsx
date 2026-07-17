import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { StorageService, StorageKeys } from '../services/storage';

export type AppTheme = 'light' | 'dark' | 'system';

type UserRole = 'guest' | 'user' | null;

interface GlobalContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isLoading: boolean;
  themePref: AppTheme;
  changeTheme: (theme: AppTheme) => Promise<void>;
  language: string;
  changeLanguage: (lang: string) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [themePref, setThemePref] = useState<AppTheme>('system');
  const [language, setLanguage] = useState<string>('English');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedTheme = await StorageService.getItem(StorageKeys.THEME);
        if (storedTheme) {
          setThemePref(storedTheme as AppTheme);
          if (storedTheme !== 'system') {
            Appearance.setColorScheme(storedTheme as ColorSchemeName);
          }
        }

        const storedLang = await StorageService.getItem(StorageKeys.LANGUAGE);
        if (storedLang) {
          setLanguage(storedLang);
        }
      } catch (e) {
        console.error("Failed to load settings:", e);
      } finally {
        // Simulate loading user context
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };
    loadSettings();
  }, []);

  const changeTheme = async (newTheme: AppTheme) => {
    setThemePref(newTheme);
    await StorageService.setItem(StorageKeys.THEME, newTheme);
    if (newTheme !== 'system') {
      Appearance.setColorScheme(newTheme as ColorSchemeName);
    } else {
      Appearance.setColorScheme(null); // resets to system default
    }
  };

  const changeLanguage = async (newLang: string) => {
    setLanguage(newLang);
    await StorageService.setItem(StorageKeys.LANGUAGE, newLang);
  };

  return (
    <GlobalContext.Provider value={{ role, setRole, isLoading, themePref, changeTheme, language, changeLanguage }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
