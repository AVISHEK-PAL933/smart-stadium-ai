import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// --- MOCK FIREBASE IMPLEMENTATION FOR DEMO PURPOSES --- //
// This allows the app to work fully without real Firebase credentials.

export const app = {};
export const auth = { currentUser: null };
export const db = {};

export type User = { uid: string; email: string; displayName?: string };

// Dummy Auth state listener
let authStateListeners: any[] = [];
export const onAuthStateChanged = (authObj: any, callback: (user: any) => void) => {
  authStateListeners.push(callback);
  
  // Try to load from storage
  AsyncStorage.getItem('@mock_user').then(val => {
    if (val) {
      const user = JSON.parse(val);
      authObj.currentUser = user;
      callback(user);
    } else {
      callback(null);
    }
  });

  return () => {
    authStateListeners = authStateListeners.filter(l => l !== callback);
  };
};

const notifyListeners = (user: any) => {
  authStateListeners.forEach(l => l(user));
};

export const signInWithEmailAndPassword = async (authObj: any, email: string, pass: string) => {
  // Mock login
  await new Promise(r => setTimeout(r, 800));
  const user = { uid: email, email, displayName: email.split('@')[0] };
  authObj.currentUser = user;
  await AsyncStorage.setItem('@mock_user', JSON.stringify(user));
  notifyListeners(user);
  return { user };
};

export const createUserWithEmailAndPassword = async (authObj: any, email: string, pass: string) => {
  // Mock signup
  await new Promise(r => setTimeout(r, 800));
  const user = { uid: email, email, displayName: email.split('@')[0] };
  authObj.currentUser = user;
  await AsyncStorage.setItem('@mock_user', JSON.stringify(user));
  notifyListeners(user);
  return { user };
};

export const signOut = async (authObj: any) => {
  authObj.currentUser = null;
  await AsyncStorage.removeItem('@mock_user');
  notifyListeners(null);
};

export const GoogleAuthProvider = class {
  static credential(idToken: string) { return idToken; }
};

export const signInWithCredential = async (authObj: any, credential: any) => {
  const user = { uid: 'google-user', email: 'google@example.com', displayName: 'Google User' };
  authObj.currentUser = user;
  await AsyncStorage.setItem('@mock_user', JSON.stringify(user));
  notifyListeners(user);
  return { user };
};

export const doc = (dbObj: any, collectionPath: string, documentPath: string) => {
  return `${collectionPath}/${documentPath}`;
};

export const setDoc = async (docRef: string, data: any, options?: any) => {
  const currentVal = await AsyncStorage.getItem(`@mock_db_${docRef}`);
  let mergedData = data;
  if (options?.merge && currentVal) {
    mergedData = { ...JSON.parse(currentVal), ...data };
  }
  await AsyncStorage.setItem(`@mock_db_${docRef}`, JSON.stringify(mergedData));
};

export const getDoc = async (docRef: string) => {
  const val = await AsyncStorage.getItem(`@mock_db_${docRef}`);
  return {
    exists: () => !!val,
    data: () => val ? JSON.parse(val) : null
  };
};
