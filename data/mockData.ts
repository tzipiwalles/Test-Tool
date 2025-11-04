import { User, UserRole, Folder, Test, TestStatus, Priority, Cycle, CycleStatus, CycleType, CycleItem, CycleItemResult, Scope, ScopeName, Note, CycleMapInfo } from '../types';

export const initialUsers: User[] = [
  { id: 'u-1', displayName: 'Tzipi W', email: 'tzipi.w@example.com', role: UserRole.MAINTAINER },
  { id: 'u-2', displayName: 'Michelle H', email: 'michelleh@example.com', role: UserRole.VALIDATION_LEAD },
  { id: 'u-3', displayName: 'Halima A', email: 'halimaa@example.com', role: UserRole.VALIDATION_LEAD },
  { id: 'u-4', displayName: 'Racheli N', email: 'rachelin@example.com', role: UserRole.ANALYST },
  { id: 'u-5', displayName: 'Dana M', email: 'danam@example.com', role: UserRole.VIEWER },
  { id: 'u-6', displayName: 'Yael R', email: 'yaelr@example.com', role: UserRole.ANALYST },
  { id: 'u-7', displayName: 'Tal A', email: 'tal.a@example.com', role: UserRole.MAINTAINER },
  { id: 'u-8', displayName: 'Tamar B', email: 'tamarb@example.com', role: UserRole.ANALYST },
  { id: 'u-9', displayName: 'Alex N', email: 'Alexn@example.com', role: UserRole.ANALYST }
];

export const initialFolders: Omit<Folder, 'children' | 'tests'>[] = [
    { id: 'f-root', name: 'Test Library', parentId: null, path: '/' },
    { id: 'f-1', name: 'Smoke Tests', parentId: 'f-root', path: '/Smoke Tests' },
    { id: 'f-2', name: 'Regression Suite', parentId: 'f-root', path: '/Regression Suite' },
    { id: 'f-3', name: 'Lane Mark', parentId: 'f-2', path: '/Regression Suite/Lane Mark' },
    { id: 'f-4', name: 'Curb', parentId: 'f-2', path: '/Regression Suite/Curb' },
];

export const initialTests: Test[] = [
    {
        id: 't-1',
        name: 'Verify application launch',
        folderId: 'f-1',
        status: TestStatus.ACTIVE,
        description: 'Ensure the application starts without errors and the main dashboard is visible.',
        steps: [
            { step_no: 1, action: 'Launch application', expected: 'Application loads to dashboard' },
            { step_no: 2, action: 'Check for error popups', expected: 'No errors are displayed' }
        ],
        labels: ['smoke', 'critical'],
        priority: Priority.P0,
        estimated_duration_sec: 30,
        updatedAt: '2023-10-26',
        updatedBy: 'Alice',
    },
    {
        id: 't-2',
        name: 'Verify user login',
        folderId: 'f-1',
        status: TestStatus.ACTIVE,
        description: 'Test the login functionality with valid and invalid credentials.',
        steps: [
            { step_no: 1, action: 'Enter valid username and password', expected: 'User is logged in successfully' },
            { step_no: 2, action: 'Enter invalid username', expected: 'Error message is shown' }
        ],
        labels: ['smoke', 'auth'],
        priority: Priority.P1,
        estimated_duration_sec: 60,
        updatedAt: '2023-10-25',
        updatedBy: 'Bob',
    },
    {
        id: 't-3',
        name: 'Detect solid white lane mark',
        folderId: 'f-3',
        status: TestStatus.ACTIVE,
        description: 'The system should be able to detect a continuous white lane marking on the road.',
        steps: [
            { step_no: 1, action: 'Drive on a road with a solid white lane mark', expected: 'Lane mark is detected and highlighted' }
        ],
        labels: ['regression', 'lanemark'],
        priority: Priority.P2,
        affectedObjectType: 'Lane_Mark',
        testMethod: 'C2P',
        estimated_duration_sec: 120,
        updatedAt: '2023-10-24',
        updatedBy: 'Charlie',
        map: 'Sunnyvale',
        configuration: 'Daylight'
    },
    {
        id: 't-4',
        name: 'Detect high curb on right side',
        folderId: 'f-4',
        status: TestStatus.ARCHIVED,
        description: 'The system should correctly identify a high curb on the passenger side of the vehicle.',
        steps: [
            { step_no: 1, action: 'Approach a high curb on the right', expected: 'Curb is detected and classified as high' }
        ],
        labels: ['regression', 'curb', 'archived'],
        priority: Priority.P3,
        affectedObjectType: 'Curb',
        testMethod: 'E2E',
        estimated_duration_sec: 180,
        updatedAt: '2023-09-15',
        updatedBy: 'Alice',
        map: 'Metropolis',
        configuration: 'Night'
    }
];

export const initialCycles: Cycle[] = [
    {
        id: 'c-1',
        name: 'Q4 2023 Regression',
        description: 'Full regression test suite for the Q4 release.',
        status: CycleStatus.ACTIVE,
        labels: ['regression', 'q4-2023'],
        updatedAt: '2023-10-27',
        version: 'v2.4.1',
        refVersion: 'v2.4.0',
        cycleType: CycleType.REGRESSION,
        mapsInfo: [
            { id: 'mi-1', mapName: 'Sunnyvale', mainMapLink: 'http://example.com/sunnyvale' },
            { id: 'mi-2', mapName: 'Metropolis', mainMapLink: 'http://example.com/metropolis' }
        ]
    },
    {
        id: 'c-2',
        name: 'New Feature: Auto-Parking',
        description: 'Testing cycle for the new auto-parking feature.',
        status: CycleStatus.DRAFT,
        labels: ['new-feature', 'parking'],
        updatedAt: '2023-10-20',
        cycleType: CycleType.NEW_FEATURE,
    },
     {
        id: 'c-3',
        name: 'Archived Cycle Example',
        description: 'This is a closed and archived cycle.',
        status: CycleStatus.ARCHIVED,
        labels: ['legacy'],
        updatedAt: '2023-01-20',
        cycleType: CycleType.SMOKE,
    }
];

export const initialScopes: Scope[] = [
    { id: 's-1', cycleId: 'c-1', name: ScopeName.MEPY_FULL },
    { id: 's-2', cycleId: 'c-1', name: ScopeName.SASA },
    { id: 's-3', cycleId: 'c-2', name: ScopeName.NONE },
];

export const initialCycleItems: CycleItem[] = [
    {
        id: 'ci-1',
        cycleId: 'c-1',
        scopeId: 's-1',
        testId: 't-3',
        testSnapshot: {
            name: 'Detect solid white lane mark',
            steps: [{ step_no: 1, action: 'Drive on a road with a solid white lane mark', expected: 'Lane mark is detected and highlighted' }],
            labels: ['regression', 'lanemark'],
        },
        assigneeId: 'u-3',
        result: CycleItemResult.PASSED,
        updatedAt: '2023-10-27',
        map: 'Sunnyvale',
        configurations: ['Daylight']
    },
    {
        id: 'ci-2',
        cycleId: 'c-1',
        scopeId: 's-1',
        testId: 't-4',
        testSnapshot: {
            name: 'Detect high curb on right side',
            steps: [{ step_no: 1, action: 'Approach a high curb on the right', expected: 'Curb is detected and classified as high' }],
            labels: ['regression', 'curb'],
        },
        assigneeId: 'u-3',
        result: CycleItemResult.FAILED,
        updatedAt: '2023-10-27',
        map: 'Metropolis',
        configurations: ['Night']
    },
    {
        id: 'ci-3',
        cycleId: 'c-1',
        scopeId: 's-2',
        testId: 't-1',
        testSnapshot: {
            name: 'Verify application launch',
            steps: [
                { step_no: 1, action: 'Launch application', expected: 'Application loads to dashboard' },
                { step_no: 2, action: 'Check for error popups', expected: 'No errors are displayed' }
            ],
            labels: ['smoke', 'critical'],
        },
        assigneeId: 'u-2',
        result: CycleItemResult.NOT_RUN,
        updatedAt: '2023-10-26',
        map: null,
        configurations: []
    }
];

export const initialNotes: Note[] = [
    {
        id: 'n-1',
        parentId: 'ci-2',
        parentType: 'item',
        content: '<p>Failure seems to be related to poor lighting conditions. The curb was not detected at all. <strong>Need to re-evaluate night-time performance.</strong></p>',
        authorId: 'u-3',
        createdAt: '2023-10-27T10:00:00Z',
        updatedAt: '2023-10-27T10:00:00Z',
    },
    {
        id: 'n-2',
        parentId: 'c-1',
        parentType: 'cycle',
        content: '<h2>Overall Cycle Status</h2><p>The regression is proceeding as planned. One major blocker found in night-time curb detection.</p>',
        authorId: 'u-2',
        createdAt: '2023-10-28T11:00:00Z',
        updatedAt: '2023-10-28T11:00:00Z',
        isPinned: true,
    }
];

export const initialMaps: string[] = ['Sunnyvale', 'Metropolis', 'Desert', 'Forest'];
export const initialConfigurations: string[] = ['Daylight', 'Night', 'Rainy', 'Foggy'];