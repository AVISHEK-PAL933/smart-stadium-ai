import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
  THEME: '@settings_theme',
  NOTIFICATIONS: '@settings_notifications',
  LANGUAGE: '@settings_language',
};

export const StorageService = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error(`Error saving ${key} to AsyncStorage`, e);
    }
  },

  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.error(`Error reading ${key} from AsyncStorage`, e);
      return null;
    }
  },
  
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error(`Error removing ${key} from AsyncStorage`, e);
    }
  }
};
