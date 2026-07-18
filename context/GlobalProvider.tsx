import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { StorageService, StorageKeys } from '../services/storage';
import { auth, onAuthStateChanged, User, db, doc, getDoc } from '../services/firebase';

export type AppTheme = 'light' | 'dark' | 'system';

type UserRole = 'guest' | 'fan' | 'admin' | null;

interface GlobalContextType {
  user: User | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  isLoading: boolean;
  themePref: AppTheme;
  changeTheme: (theme: AppTheme) => Promise<void>;
  language: string;
  changeLanguage: (lang: string) => Promise<void>;
  themeColors: typeof import('../constants/colors').Colors['light'];
  theme: 'light' | 'dark';
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
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
        }

        const storedLang = await StorageService.getItem(StorageKeys.LANGUAGE);
        if (storedLang) {
          setLanguage(storedLang);
        }
      } catch (e) {
        console.error("Failed to load settings:", e);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setRole(userDoc.data().role as UserRole);
          } else {
            setRole(null); // needs to select a role
          }
        } catch (error) {
          console.error("Error fetching user role", error);
        }
      } else {
        // If not logged in and not explicitly set as guest
        if (role !== 'guest') {
          setRole(null);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [role]);

  const changeTheme = async (newTheme: AppTheme) => {
    setThemePref(newTheme);
    await StorageService.setItem(StorageKeys.THEME, newTheme);
  };

  const changeLanguage = async (newLang: string) => {
    setLanguage(newLang);
    await StorageService.setItem(StorageKeys.LANGUAGE, newLang);
  };

  const theme = themePref === 'dark' || (themePref === 'system' && Appearance.getColorScheme() === 'dark') ? 'dark' : 'light';
  const themeColors = require('../constants/colors').Colors[theme];

  return (
    <GlobalContext.Provider value={{ user, role, setRole, isLoading, themePref, changeTheme, language, changeLanguage, theme, themeColors }}>
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
