import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'guest' | 'user' | null;

interface GlobalContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isLoading: boolean;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user context
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GlobalContext.Provider value={{ role, setRole, isLoading }}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
