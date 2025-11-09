import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { Folder, Test, Cycle, CycleItem, User, Scope, UserRole, Permissions, Note } from '../types';
import * as api from '../lib/api';

const getPermissions = (user: User | null): Permissions => {
  const role = user?.role;

  const canEditLibrary = role === UserRole.MAINTAINER;
  const canCreateCycles = role === UserRole.MAINTAINER || role === UserRole.VALIDATION_LEAD;
  const canEditCycles = role === UserRole.MAINTAINER || role === UserRole.VALIDATION_LEAD;
  const canRunTests = role === UserRole.MAINTAINER || role === UserRole.VALIDATION_LEAD || role === UserRole.ANALYST;
  const canAddNotes = role === UserRole.MAINTAINER || role === UserRole.VALIDATION_LEAD || role === UserRole.ANALYST;
  const isViewer = role === UserRole.VIEWER;

  return { canEditLibrary, canCreateCycles, canEditCycles, canRunTests, canAddNotes, isViewer };
};

interface DataContextType {
  folders: Omit<Folder, 'children' | 'tests'>[];
  tests: Test[];
  cycles: Cycle[];
  scopes: Scope[];
  cycleItems: CycleItem[];
  users: User[];
  notes: Note[];
  maps: string[];
  configurations: string[];
  setFolders: React.Dispatch<React.SetStateAction<Omit<Folder, 'children' | 'tests'>[]>>;
  setTests: React.Dispatch<React.SetStateAction<Test[]>>;
  setCycles: React.Dispatch<React.SetStateAction<Cycle[]>>;
  setScopes: React.Dispatch<React.SetStateAction<Scope[]>>;
  setCycleItems: React.Dispatch<React.SetStateAction<CycleItem[]>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
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

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [folders, setFolders] = useState<Omit<Folder, 'children' | 'tests'>[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [scopes, setScopes] = useState<Scope[]>([]);
  const [cycleItems, setCycleItems] = useState<CycleItem[]>([]);
  const [notes, setNotes] = useState<Note[]>([]); // No API for notes, will be empty.
  const [users, setUsers] = useState<User[]>([]);
  const [maps, setMaps] = useState<string[]>([]);
  const [configurations, setConfigurations] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const permissions = useMemo(() => getPermissions(currentUser), [currentUser]);

  const [isLoading, setIsLoading] = useState(true);

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
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [usersData, foldersData, testsData, cyclesListData] = await Promise.all([
          api.getUsers(),
          api.getFolders(),
          api.getTests(),
          api.getCycles(),
        ]);

        setUsers(usersData);
        if (usersData.length > 0) {
          const maintainer = usersData.find(u => u.role === UserRole.MAINTAINER) || usersData[0];
          setCurrentUser(maintainer);
        }

        setFolders(foldersData);
        setTests(testsData);
        
        // The main /cycles endpoint returns a list, but we need details (scopes, items) for each one
        const cycleDetailsPromises = cyclesListData.map(cycle => api.getCycleDetails(cycle.id));
        const cycleDetailsData = await Promise.all(cycleDetailsPromises);

        setCycles(cycleDetailsData);

        const allScopes = cycleDetailsData.flatMap(detail => detail.scopes || []);
        const allCycleItems = cycleDetailsData.flatMap(detail => detail.items || []);

        setScopes(allScopes);
        setCycleItems(allCycleItems);
        
        // Derive maps and configurations dynamically from all tests and cycle items
        const mapSet = new Set<string>();
        const configSet = new Set<string>();
        
        testsData.forEach(test => {
          if (test.map) mapSet.add(test.map);
          if (test.configuration) configSet.add(test.configuration);
        });
        allCycleItems.forEach(item => {
          if (item.map) mapSet.add(item.map);
          item.configurations.forEach(config => configSet.add(config));
        });
        
        setMaps(Array.from(mapSet).sort((a,b) => a.localeCompare(b)));
        setConfigurations(Array.from(configSet).sort((a,b) => a.localeCompare(b)));

      } catch (error) {
        console.error("Failed to fetch initial data from backend:", error);
        // In a real app, we would set an error state here to show a message to the user.
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const value = {
    folders,
    tests,
    cycles,
    scopes,
    cycleItems,
    users,
    notes,
    maps,
    configurations,
    setFolders,
    setTests,
    setCycles,
    setScopes,
    setCycleItems,
    setUsers,
    setNotes,
    setMaps,
    setConfigurations,
    isLoading,
    theme,
    toggleTheme,
    currentUser,
    setCurrentUser,
    permissions,
  };

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-screen w-screen bg-gray-50 dark:bg-gray-950">
            <div className="flex items-center space-x-3">
                <svg className="animate-spin h-8 w-8 text-blue-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading QualityLane...</span>
            </div>
        </div>
    );
  }

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
