import React, { createContext, useContext, useState, useMemo, ReactNode, useCallback, useEffect } from 'react';
import { 
    UUID,
    User,
    UserRole,
    Folder,
    Test,
    TestCreate,
    Cycle,
    CycleCreate,
    CycleItem,
    Scope,
    Note,
    Permissions,
    BulkTestUpdatePayload,
    BulkCycleItemUpdatePayload,
    LegacyBulkCycleItemUpdatePayload,
    CycleItemUpdate,
    TestStatus,
    CycleStatus,
    CycleItemResult,
} from '../types';
import { 
    initialUsers,
    initialFolders,
    initialTests,
    initialCycles,
    initialCycleItems,
    initialScopes,
    initialNotes,
    initialMaps,
    initialConfigurations
} from '../data/mockData';

interface DataContextType {
  users: User[];
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  folders: Omit<Folder, 'children' | 'tests'>[];
  setFolders: React.Dispatch<React.SetStateAction<Omit<Folder, 'children' | 'tests'>[]>>;
  tests: Test[];
  setTests: React.Dispatch<React.SetStateAction<Test[]>>;
  createTest: (testData: TestCreate) => Promise<void>;
  updateTest: (testId: UUID, testData: Partial<Test>) => Promise<void>;
  bulkUpdateTests: (payload: BulkTestUpdatePayload) => Promise<void>;
  cycles: Cycle[];
  setCycles: React.Dispatch<React.SetStateAction<Cycle[]>>;
  createCycle: (cycleData: CycleCreate) => Promise<void>;
  cycleItems: CycleItem[];
  setCycleItems: React.Dispatch<React.SetStateAction<CycleItem[]>>;
  bulkUpdateCycleItems: (payload: BulkCycleItemUpdatePayload | LegacyBulkCycleItemUpdatePayload) => Promise<void>;
  scopes: Scope[];
  setScopes: React.Dispatch<React.SetStateAction<Scope[]>>;
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  maps: string[];
  setMaps: React.Dispatch<React.SetStateAction<string[]>>;
  configurations: string[];
  setConfigurations: React.Dispatch<React.SetStateAction<string[]>>;
  permissions: Permissions;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isLoading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users] = useState<User[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(initialUsers[0] || null);
  const [folders, setFolders] = useState<Omit<Folder, 'children' | 'tests'>[]>(initialFolders);
  const [tests, setTests] = useState<Test[]>(initialTests);
  const [cycles, setCycles] = useState<Cycle[]>(initialCycles);
  const [cycleItems, setCycleItems] = useState<CycleItem[]>(initialCycleItems);
  const [scopes, setScopes] = useState<Scope[]>(initialScopes);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [maps, setMaps] = useState<string[]>(initialMaps);
  const [configurations, setConfigurations] = useState<string[]>(initialConfigurations);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const permissions = useMemo(() => {
    const role = currentUser?.role;
    const isViewer = role === UserRole.VIEWER;
    const canAddNotes = !!role;
    const canRunTests = role === UserRole.ANALYST || role === UserRole.VALIDATION_LEAD || role === UserRole.MAINTAINER;
    const canEditCycles = role === UserRole.VALIDATION_LEAD || role === UserRole.MAINTAINER;
    const canCreateCycles = role === UserRole.VALIDATION_LEAD || role === UserRole.MAINTAINER;
    const canEditLibrary = role === UserRole.MAINTAINER;
    return { isViewer, canAddNotes, canRunTests, canEditCycles, canCreateCycles, canEditLibrary };
  }, [currentUser]);

  // --- Mocked CRUD operations ---

  const createTest = async (testData: TestCreate) => {
    const newTest: Test = {
      ...testData,
      id: `t-${Date.now()}`,
      status: TestStatus.ACTIVE,
      updatedAt: new Date().toISOString().split('T')[0],
      updatedBy: currentUser?.displayName || 'User',
    };
    setTests(prev => [newTest, ...prev]);
  };

  const updateTest = async (testId: UUID, testData: Partial<Test>) => {
    setTests(prev => prev.map(t => t.id === testId ? { 
        ...t, 
        ...testData,
        updatedAt: new Date().toISOString().split('T')[0],
        updatedBy: currentUser?.displayName || 'User',
    } as Test : t));
  };

  const bulkUpdateTests = async (payload: BulkTestUpdatePayload) => {
    const newUpdatedAt = new Date().toISOString().split('T')[0];
    const updatedBy = currentUser?.displayName || 'User';
    const testIds = new Set(payload.testIds);

    setTests(prev => prev.map(t => {
        if (testIds.has(t.id)) {
            return {
                ...t,
                ...payload.updates,
                updatedAt: newUpdatedAt,
                updatedBy: updatedBy,
            };
        }
        return t;
    }));
  };

  const createCycle = async (cycleData: CycleCreate) => {
    const newCycle: Cycle = {
      ...cycleData,
      id: `c-${Date.now()}`,
      status: CycleStatus.DRAFT,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setCycles(prev => [newCycle, ...prev]);
  };

  const bulkUpdateCycleItems = async (payload: BulkCycleItemUpdatePayload | LegacyBulkCycleItemUpdatePayload) => {
    const isLegacyFormat = (p: any): p is LegacyBulkCycleItemUpdatePayload => {
        return 'itemIds' in p && 'updates' in p && Array.isArray(p.itemIds);
    };

    if (isLegacyFormat(payload)) {
        const updatedIds = new Set(payload.itemIds);
        const sharedUpdates = payload.updates;
        const newUpdatedAt = new Date().toISOString().split('T')[0];
        setCycleItems(prev =>
            prev.map(item => {
                if (updatedIds.has(item.id)) {
                    return {
                        ...item,
                        ...sharedUpdates,
                        updatedAt: newUpdatedAt,
                    };
                }
                return item;
            })
        );
    } else {
        const updatesMap = new Map(payload.updates.map(u => [u.id, u]));
        setCycleItems(prev =>
            prev.map(item => {
                const update = updatesMap.get(item.id);
                if (update) {
                    const changes: Partial<CycleItem> = {};
                    if (update.assigneeId !== undefined) changes.assigneeId = update.assigneeId;
                    if (update.result !== undefined) changes.result = update.result as CycleItemResult;
                    if (update.map !== undefined) changes.map = update.map;
                    if (update.configurations !== undefined) changes.configurations = update.configurations;
                    return {
                        ...item,
                        ...changes,
                        updatedAt: new Date().toISOString().split('T')[0],
                    };
                }
                return item;
            })
        );
    }
  };

  const value = {
    users,
    currentUser,
    setCurrentUser,
    folders,
    setFolders,
    tests,
    setTests,
    createTest,
    updateTest,
    bulkUpdateTests,
    cycles,
    setCycles,
    createCycle,
    cycleItems,
    setCycleItems,
    bulkUpdateCycleItems,
    scopes,
    setScopes,
    notes,
    setNotes,
    maps,
    setMaps,
    configurations,
    setConfigurations,
    permissions,
    theme,
    toggleTheme,
    isLoading,
    error
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
