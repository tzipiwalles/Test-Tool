import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { Folder, Test, Cycle, CycleItem, User, Scope, UserRole, Permissions, Note } from '../types';
import { 
    mockFolders as initialFolders, 
    mockTests as initialTests, 
    mockCycles as initialCycles, 
    mockCycleItems as initialCycleItems, 
    mockUsers as initialUsers,
    mockMaps as initialMaps,
    mockConfigurations as initialConfigurations,
    mockScopes as initialScopes,
    mockNotes as initialNotes
} from '../data/mockData';

// This channel will be used to sync state across different browser tabs.
const channel = new BroadcastChannel('catalyst-data-sync');

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
  const [folders, setFolders] = useState<Omit<Folder, 'children' | 'tests'>[]>(initialFolders);
  const [tests, setTests] = useState<Test[]>(initialTests);
  const [cycles, setCycles] = useState<Cycle[]>(initialCycles);
  const [scopes, setScopes] = useState<Scope[]>(initialScopes);
  const [cycleItems, setCycleItems] = useState<CycleItem[]>(initialCycleItems);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [maps, setMaps] = useState<string[]>(initialMaps);
  const [configurations, setConfigurations] = useState<string[]>(initialConfigurations);

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    // Default to Tzipi (maintainer) if no user is saved or found
    return initialUsers.find(u => u.role === UserRole.MAINTAINER) || initialUsers[0];
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
  
  // This effect listens for messages from other tabs and updates the state accordingly.
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type, payload } = event.data;
      // Received a message from another tab. Update state without broadcasting again.
      switch (type) {
        case 'SET_FOLDERS': setFolders(payload); break;
        case 'SET_TESTS': setTests(payload); break;
        case 'SET_CYCLES': setCycles(payload); break;
        case 'SET_SCOPES': setScopes(payload); break;
        case 'SET_CYCLE_ITEMS': setCycleItems(payload); break;
        case 'SET_NOTES': setNotes(payload); break;
        case 'SET_MAPS': setMaps(payload); break;
        case 'SET_CONFIGURATIONS': setConfigurations(payload); break;
        default: break;
      }
    };

    channel.addEventListener('message', handleMessage);

    // Cleanup function to remove the listener when the component unmounts.
    return () => {
      channel.removeEventListener('message', handleMessage);
    };
  }, []); // Empty dependency array ensures this runs only once.

  // Helper function to create a state setter that also broadcasts the change.
  const createBroadcastingSetter = <T,>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    messageType: string
  ): React.Dispatch<React.SetStateAction<T>> => {
    return useCallback((updater) => {
      // Always call the raw setter with a function to get access to the latest state.
      setter(prevState => {
        // Compute the new state using the updater and the guaranteed-fresh previous state.
        const newState = typeof updater === 'function'
          ? (updater as (prevState: T) => T)(prevState)
          : updater;
        
        // Broadcast the computed new state.
        channel.postMessage({ type: messageType, payload: newState });
        
        // Return the new state for React to set.
        return newState;
      });
    }, [setter, messageType]);
  };

  const broadcastSetFolders = createBroadcastingSetter(setFolders, 'SET_FOLDERS');
  const broadcastSetTests = createBroadcastingSetter(setTests, 'SET_TESTS');
  const broadcastSetCycles = createBroadcastingSetter(setCycles, 'SET_CYCLES');
  const broadcastSetScopes = createBroadcastingSetter(setScopes, 'SET_SCOPES');
  const broadcastSetCycleItems = createBroadcastingSetter(setCycleItems, 'SET_CYCLE_ITEMS');
  const broadcastSetNotes = createBroadcastingSetter(setNotes, 'SET_NOTES');
  const broadcastSetMaps = createBroadcastingSetter(setMaps, 'SET_MAPS');
  const broadcastSetConfigurations = createBroadcastingSetter(setConfigurations, 'SET_CONFIGURATIONS');


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
    setFolders: broadcastSetFolders,
    setTests: broadcastSetTests,
    setCycles: broadcastSetCycles,
    setScopes: broadcastSetScopes,
    setCycleItems: broadcastSetCycleItems,
    setNotes: broadcastSetNotes,
    setMaps: broadcastSetMaps,
    setConfigurations: broadcastSetConfigurations,
    // setUsers is for session-specific data and should not be broadcasted.
    setUsers,
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