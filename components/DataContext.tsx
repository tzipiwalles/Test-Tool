
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { Folder, Test, Cycle, CycleItem, User, Scope, UserRole, Permissions } from '../types';
import { 
    mockFolders as initialFolders, 
    mockTests as initialTests, 
    mockCycles as initialCycles, 
    mockCycleItems as initialCycleItems, 
    mockUsers as initialUsers,
    mockMaps as initialMaps,
    mockConfigurations as initialConfigurations,
    mockScopes as initialScopes
} from '../data/mockData';

const getPermissions = (user: User | null): Permissions => {
  const role = user?.role;

  const canEditLibrary = role === UserRole.MAINTAINER;
  const canCreateCycles = role === UserRole.MAINTAINER || role === UserRole.VALIDATION_LEAD;
  const canEditCycles = role === UserRole.MAINTAINER || role === UserRole.VALIDATION_LEAD;
  const canRunTests = role === UserRole.MAINTAINER || role === UserRole.VALIDATION_LEAD || role === UserRole.ANALYST;
  const isViewer = role === UserRole.VIEWER;

  return { canEditLibrary, canCreateCycles, canEditCycles, canRunTests, isViewer };
};

interface DataContextType {
  folders: Omit<Folder, 'children' | 'tests'>[];
  tests: Test[];
  cycles: Cycle[];
  scopes: Scope[];
  cycleItems: CycleItem[];
  users: User[];
  maps: string[];
  configurations: string[];
  setFolders: React.Dispatch<React.SetStateAction<Omit<Folder, 'children' | 'tests'>[]>>;
  setTests: React.Dispatch<React.SetStateAction<Test[]>>;
  setCycles: React.Dispatch<React.SetStateAction<Cycle[]>>;
  setScopes: React.Dispatch<React.SetStateAction<Scope[]>>;
  setCycleItems: React.Dispatch<React.SetStateAction<CycleItem[]>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setMaps: React.Dispatch<React.SetStateAction<string[]>>;
  setConfigurations: React.Dispatch<React.SetStateAction<string[]>>;
  isLoading: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  permissions: Permissions;
}

const DataContext = createContext<DataContextType | null>(null);

const getItem = <T,>(key: string, initialValue: T): T => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    } catch (error) {
        console.error(`Error reading localStorage key “${key}”:`, error);
        return initialValue;
    }
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [folders, setFolders] = useState<Omit<Folder, 'children' | 'tests'>[]>(() => getItem('folders', initialFolders));
  const [tests, setTests] = useState<Test[]>(() => getItem('tests', initialTests));
  const [cycles, setCycles] = useState<Cycle[]>(() => getItem('cycles', initialCycles));
  const [scopes, setScopes] = useState<Scope[]>(() => getItem('scopes', initialScopes));
  const [cycleItems, setCycleItems] = useState<CycleItem[]>(() => getItem('cycleItems', initialCycleItems));
  
  const [users, setUsers] = useState<User[]>(() => getItem('users', initialUsers));
  const [maps, setMaps] = useState<string[]>(() => getItem('maps', initialMaps));
  const [configurations, setConfigurations] = useState<string[]>(() => getItem('configurations', initialConfigurations));

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = getItem<User | null>('currentUser', null);
    // Default to Tzipi (maintainer) if no user is saved or found
    return savedUser || initialUsers.find(u => u.role === UserRole.MAINTAINER) || initialUsers[0];
  });

  const permissions = useMemo(() => getPermissions(currentUser), [currentUser]);

  const [isLoading, setIsLoading] = useState(false);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
      localStorage.setItem('folders', JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
      localStorage.setItem('tests', JSON.stringify(tests));
  }, [tests]);
  
  useEffect(() => {
      localStorage.setItem('cycles', JSON.stringify(cycles));
  }, [cycles]);

  useEffect(() => {
      localStorage.setItem('scopes', JSON.stringify(scopes));
  }, [scopes]);

  useEffect(() => {
      localStorage.setItem('cycleItems', JSON.stringify(cycleItems));
  }, [cycleItems]);

  useEffect(() => {
      localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

   useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);
  
  useEffect(() => {
      localStorage.setItem('maps', JSON.stringify(maps));
  }, [maps]);
  
  useEffect(() => {
      localStorage.setItem('configurations', JSON.stringify(configurations));
  }, [configurations]);

  const value = {
    folders,
    tests,
    cycles,
    scopes,
    cycleItems,
    users,
    maps,
    configurations,
    setFolders,
    setTests,
    setCycles,
    setScopes,
    setCycleItems,
    setUsers,
    setMaps,
    setConfigurations,
    isLoading,
    theme,
    toggleTheme,
    currentUser,
    setCurrentUser,
    permissions,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
