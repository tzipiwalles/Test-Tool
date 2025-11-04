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
} from '../types';
import { initialUsers } from '../data/mockData';

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
  bulkUpdateCycleItems: (payload: BulkCycleItemUpdatePayload) => Promise<void>;
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

// אם את מריצה את השרת על פורט אחר/דומיין אחר – עדכני כאן
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// מיפוי טוקנים “דמי” להתחזות למשתמשים שונים
const USER_ID_TO_TOKEN_MAP: Record<string, string> = {
  "u-1": "token-maintainer-tzipi",
  "u-2": "token-lead-michelle",
  "u-3": "token-lead-halima",
  "u-4": "token-analyst-racheli",
  "u-5": "token-viewer-dana",
  "u-6": "token-analyst-yael",
  "u-7": "token-maintainer-tal",
  "u-8": "token-analyst-tamar",
  "u-9": "token-analyst-alex"
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users] = useState<User[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(initialUsers[0] || null);
  const [folders, setFolders] = useState<Omit<Folder, 'children' | 'tests'>[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [cycleItems, setCycleItems] = useState<CycleItem[]>([]);
  const [scopes, setScopes] = useState<Scope[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [maps, setMaps] = useState<string[]>([]);
  const [configurations, setConfigurations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ---- נקודת מפתח: שליחה כ־Bearer ותמיכה חכמה בכותרות ----
  const authedFetch = useCallback(async (url: string, options: RequestInit = {}) => {
    const token = currentUser ? USER_ID_TO_TOKEN_MAP[currentUser.id] : null;

    // נתחיל מכותרות בסיס
    const headers = new Headers(options.headers);
    headers.set('Accept', 'application/json');

    // נגדיר Content-Type רק אם יש body מסוג מחרוזת/JSON
    const hasStringBody = typeof options.body === 'string';
    if (hasStringBody && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    // אופס… אם אין משתמש נוכחי – נכשיל מוקדם
    if (!token) {
      throw new Error('No token for current user');
    }

    // חשוב: מעבר ל־Bearer במקום Token
    headers.set('Authorization', `Bearer ${token}`);

    const response = await fetch(url, { ...options, headers });

    // טיפול בשגיאות HTTP עם הודעה שימושית
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      if (response.status === 401) {
        throw new Error(`401 Unauthorized – בדקי את השרת והטוקן. ${text}`);
      }
      if (response.status === 403) {
        throw new Error(`403 Forbidden – ייתכן שלמשתמש אין ההרשאות הנדרשות או שהטוקן לא מזוהה בצד שרת. ${text}`);
      }
      throw new Error(`API ${response.status} for ${url}: ${text}`);
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return response.json();
    }
    return null;
  }, [currentUser]);

  useEffect(() => {
    const fetchAll = async () => {
      if (!currentUser) {
        setError("No user selected for authentication.");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const [
          foldersData,
          testsData,
          cyclesData,
          cycleItemsData,
          scopesData,
          notesData,
          mapsData,
          configurationsData
        ] = await Promise.all([
          authedFetch(`${API_BASE_URL}/folders`),
          authedFetch(`${API_BASE_URL}/tests`),
          authedFetch(`${API_BASE_URL}/cycles`),
          authedFetch(`${API_BASE_URL}/cycle_items`), // שימי לב למקף – תואם בקאנד
          authedFetch(`${API_BASE_URL}/scopes`),
          authedFetch(`${API_BASE_URL}/notes`),
          authedFetch(`${API_BASE_URL}/maps`),
          authedFetch(`${API_BASE_URL}/configurations`),
        ]);

        setFolders(foldersData || []);
        setTests(testsData || []);
        setCycles(cyclesData || []);
        setCycleItems(cycleItemsData || []);
        setScopes(scopesData || []);
        setNotes(notesData || []);
        setMaps(mapsData || []);
        setConfigurations(configurationsData || []);
      } catch (err: any) {
        if (err instanceof TypeError && err.message === 'Failed to fetch') {
          setError(`Connection to the server failed. Please ensure the backend is running at ${API_BASE_URL} and check for CORS issues.`);
        } else {
          setError(err?.message || 'Unknown error');
        }
        console.error('Failed to fetch data from API:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, [currentUser, authedFetch]);

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

  // --- פעולות CRUD מונעות API ---

  const createTest = async (testData: TestCreate) => {
    const newTest = await authedFetch(`${API_BASE_URL}/tests`, {
      method: 'POST',
      body: JSON.stringify(testData)
    });
    setTests(prev => [newTest, ...prev]);
  };

  const updateTest = async (testId: UUID, testData: Partial<Test>) => {
    const updated = await authedFetch(`${API_BASE_URL}/tests/${testId}`, {
      method: 'PATCH',
      body: JSON.stringify(testData)
    });
    setTests(prev => prev.map(t => t.id === testId ? updated : t));
  };

  const bulkUpdateTests = async (payload: BulkTestUpdatePayload) => {
    const updated: Test[] = await authedFetch(`${API_BASE_URL}/tests/bulk_update`, {
      method: 'PATCH',
      body: JSON.stringify(payload)
    });
    if (updated) {
      const m = new Map(updated.map(t => [t.id, t]));
      setTests(prev => prev.map(t => m.get(t.id) || t));
    }
  };

  const createCycle = async (cycleData: CycleCreate) => {
    const newCycle = await authedFetch(`${API_BASE_URL}/cycles`, {
      method: 'POST',
      body: JSON.stringify(cycleData)
    });
    setCycles(prev => [newCycle, ...prev]);
  };

  const bulkUpdateCycleItems = async (payload: BulkCycleItemUpdatePayload) => {
    const originalCycleItems = [...cycleItems];
    
    // Optimistically update the state for immediate UI feedback
    const updatedIds = new Set(payload.itemIds);
    const newUpdatedAt = new Date().toISOString().split('T')[0];

    setCycleItems(prev =>
      prev.map(item => {
        if (updatedIds.has(item.id)) {
          return {
            ...item,
            ...payload.updates,
            updatedAt: newUpdatedAt,
          };
        }
        return item;
      })
    );

    try {
      // Make the API call. We don't need to process the response if the optimistic update is successful.
      await authedFetch(`${API_BASE_URL}/cycle_items/bulk_update`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });
      // Success: The optimistic update is now considered permanent for this session.
    } catch (error) {
      console.error("Failed to update cycle items:", error);
      // On failure, revert to the original state and show an error.
      setCycleItems(originalCycleItems);
      setError(`Failed to save changes: ${error instanceof Error ? error.message : 'Unknown error'}`);
      // Clear the error message after a few seconds.
      setTimeout(() => setError(null), 5000);
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

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen w-screen bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-300">טוען נתונים...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen w-screen bg-red-50 text-red-700 p-4">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">שגיאת תקשורת</h2>
        <p>{error}</p>
        <p className="mt-2 text-sm">אנא ודאי שהשרת פועל בכתובת: {API_BASE_URL}</p>
      </div>
    </div>;
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};