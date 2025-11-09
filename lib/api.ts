import { Test, Cycle, User, Folder, CycleItemResult, Priority } from '../types';

const BASE_URL = '';

// A generic fetch wrapper for API calls
async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const url = `${BASE_URL}${endpoint}`;
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                // In a real app, a bearer token would be managed and included here
                // 'Authorization': `Bearer ${process.env.API_TOKEN}`,
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
            console.error(`API Error on ${endpoint}:`, errorData);
            // The detail object from FastAPI validation errors is an array
            const errorMessage = Array.isArray(errorData.detail)
              ? errorData.detail.map((err: any) => `${err.loc.join(' > ')}: ${err.msg}`).join(', ')
              : errorData.detail || errorData.message || response.statusText;
            throw new Error(`API request failed: ${errorMessage}`);
        }

        // Handle responses that might not have a JSON body (e.g., 204 No Content)
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        }
        return null; // Return null for non-JSON responses
    } catch (error) {
        console.error(`Network or API fetch error on ${url}:`, error);
        // Re-throw the error to be handled by the calling function
        throw error;
    }
}


// --- GET Endpoints ---
export const getUsers = (): Promise<User[]> => apiFetch('/users');
export const getFolders = (): Promise<Omit<Folder, 'children' | 'tests'>[]> => apiFetch('/folders');

// `getTests` can take optional query parameters
export const getTests = (params?: { folderId?: string, status?: string, q?: string }): Promise<Test[]> => {
    const query = params ? new URLSearchParams(params as Record<string, string>).toString() : '';
    return apiFetch(`/tests${query ? '?' + query : ''}`);
};

export const getTestById = (testId: string): Promise<Test> => apiFetch(`/tests/${testId}`);
export const getCycles = (): Promise<Cycle[]> => apiFetch('/cycles');
export const getCycleDetails = (cycleId: string): Promise<any> => apiFetch(`/cycles/${cycleId}`);

// --- POST Endpoints ---
// The TestCreate schema doesn't include id, status, etc.
type TestCreatePayload = Omit<Test, 'id' | 'status' | 'updatedAt' | 'updatedBy'>;
export const createTest = (testData: Partial<TestCreatePayload>): Promise<Test> => apiFetch('/tests', {
    method: 'POST',
    body: JSON.stringify(testData),
});

// The CycleCreate schema is also different from the Cycle schema
type CycleCreatePayload = Omit<Cycle, 'id' | 'status' | 'updatedAt'>;
export const createCycle = (cycleData: Partial<CycleCreatePayload>): Promise<Cycle> => apiFetch('/cycles', {
    method: 'POST',
    body: JSON.stringify(cycleData),
});

// --- PUT Endpoints ---
export const updateTest = (testId: string, testData: Partial<TestCreatePayload>): Promise<Test> => apiFetch(`/tests/${testId}`, {
    method: 'PUT',
    body: JSON.stringify(testData),
});

// --- PATCH Endpoints ---
interface BulkTestUpdates {
  folderId?: string;
  status?: string;
  priority?: Priority;
  labels?: string[];
  map?: string;
  configuration?: string;
  affectedObjectType?: string;
  testMethod?: string;
}
export const bulkUpdateTests = (testIds: string[], updates: BulkTestUpdates): Promise<{ updatedCount: number }> => apiFetch('/tests', {
    method: 'PATCH',
    body: JSON.stringify({ testIds, updates }),
});

interface BulkCycleItemUpdates {
    result?: CycleItemResult, 
    assigneeId?: string | null, 
    map?: string, 
    configurations?: string[]
}
export const bulkUpdateCycleItems = (itemIds: string[], updates: BulkCycleItemUpdates): Promise<{ updatedCount: number }> => apiFetch('/cycle-items', {
    method: 'PATCH',
    body: JSON.stringify({ itemIds, updates }),
});