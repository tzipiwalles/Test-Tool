import { Folder, Test, Cycle, CycleItem, User, TestStatus, Priority, CycleStatus, CycleItemResult, UUID, TestStep, CycleType, CycleMapInfo, Scope, ScopeName, UserRole, Note } from '../types';

// USERS
export const mockUsers: User[] = [
  { id: 'u-1', displayName: 'Tzipi W', email: 'tzipi.w@example.com', role: UserRole.MAINTAINER },
  { id: 'u-2', displayName: 'Michelle H', email: 'michelleh@example.com', role: UserRole.VALIDATION_LEAD },
  { id: 'u-3', displayName: 'Halima A', email: 'halimaa@example.com', role: UserRole.VALIDATION_LEAD },
  { id: 'u-4', displayName: 'Racheli N', email: 'rachelin@example.com', role: UserRole.ANALYST },
  { id: 'u-5', displayName: 'Dana M', email: 'danam@example.com', role: UserRole.VIEWER },
  { id: 'u-6', displayName: 'Yael R', email: 'yaelr@example.com', role: UserRole.ANALYST },
  { id: 'u-7', displayName: 'Tal A', email: 'tal.a@example.com', role: UserRole.MAINTAINER },
  { id: 'u-8', displayName: 'Tamar B', email: 'tamarb@example.com', role: UserRole.ANALYST },
  { id: 'u-9', displayName: 'Alex N', email: 'Alexn@example.com', role: UserRole.ANALYST },

];


// FOLDERS (flat list)
export const mockFolders: Omit<Folder, 'children' | 'tests'>[] = [
    { id: 'f-1', name: 'REM Tests', parentId: null, path: '/REM Tests' },
    { id: 'f-2', name: 'High-Level-Tests', parentId: 'f-1', path: '/REM Tests/High-Level-Tests' },
    { id: 'f-3', name: 'Auto Full', parentId: 'f-2', path: '/REM Tests/High-Level-Tests/Auto Full' },
    { id: 'f-4', name: 'Lane Type', parentId: 'f-3', path: '/REM Tests/High-Level-Tests/Auto Full/Lane Type' },
    { id: 'f-5', name: 'TFLR', parentId: 'f-3', path: '/REM Tests/High-Level-Tests/Auto Full/TFLR' },
    { id: 'f-6', name: 'CW Priority', parentId: 'f-3', path: '/REM Tests/High-Level-Tests/Auto Full/CW Priority' },
    { id: 'f-11', name: 'Crowd Speed', parentId: 'f-3', path: '/REM Tests/High-Level-Tests/Auto Full/Crowd Speed' },
    { id: 'f-7', name: 'SASA', parentId: 'f-2', path: '/REM Tests/High-Level-Tests/SASA' },
    { id: 'f-8', name: 'Sanity', parentId: 'f-7', path: '/REM Tests/High-Level-Tests/SASA/Sanity' },
    { id: 'f-9', name: 'Full', parentId: 'f-7', path: '/REM Tests/High-Level-Tests/SASA/Full' },
    { id: 'f-10', name: 'SR', parentId: 'f-2', path: '/REM Tests/High-Level-Tests/SR' },
];

// TESTS
export const mockTests: Test[] = [
    {
        id: 't-1',
        name: 'Auto Full - LaneType (C2P)',
        folderId: 'f-4',
        status: TestStatus.ACTIVE,
        description: `Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.`,
        steps: [{ step_no: 1, action: 'V2V: DP-LANE_TYPE_MISMATCH', expected: '' }],
        labels: ['auto', 'full', 'lanetype', 'c2p'],
        priority: Priority.P1,
        affectedObjectType: 'Lane_Type',
        testMethod: 'C2P',
        estimated_duration_sec: 120,
        updatedAt: '7/25/2024',
        updatedBy: 'Tzipi W',
        map: 'Detroit',
        configuration: 'Vanilla',
    },
    {
        id: 't-2',
        name: 'Auto Full - LaneType (V2V)',
        folderId: 'f-4',
        status: TestStatus.ACTIVE,
        description: `Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.`,
        steps: [{ step_no: 1, action: 'V2V: DP-LANE_TYPE_MISMATCH', expected: '' }],
        labels: ['auto', 'full', 'lanetype', 'v2v'],
        priority: Priority.P1,
        affectedObjectType: 'Lane_Type',
        testMethod: 'V2V',
        estimated_duration_sec: 120,
        updatedAt: '7/25/2024',
        updatedBy: 'Tzipi W',
        map: 'Detroit',
        configuration: 'Vanilla',
    },
    {
        id: 't-3',
        name: 'Auto Full - TFLR (C2P)',
        folderId: 'f-5',
        status: TestStatus.ACTIVE,
        description: 'Review TFLR probes in C2P context.',
        steps: [
            { step_no: 1, action: 'V2V: TFLR_FALSE (major)', expected: 'No false TFLR' },
            { step_no: 2, action: 'V2V: TFLR_MISS (major)', expected: 'No missed TFLR' },
        ],
        labels: ['auto', 'full', 'tflr', 'c2p'],
        priority: Priority.P0,
        affectedObjectType: 'TFLR',
        testMethod: 'C2P',
        estimated_duration_sec: 300,
        updatedAt: '7/23/2024',
        updatedBy: 'Michelle H',
        map: 'Munich',
        configuration: 'Const-Data',
    },
    {
      id: 't-4',
      name: 'SASA V2V - Sanity test',
      folderId: 'f-8',
      status: TestStatus.ACTIVE,
      description: 'Statistic review on SASA V2V results',
      steps: [
          { step_no: 1, action: 'Run statistical review on SASA V2V results.', expected: 'No Significant issues' },
      ],
      labels: ['sasa', 'sanity', 'v2v'],
      priority: Priority.P0,
      affectedObjectType: 'Multiple',
      testMethod: 'Sanity',
      estimated_duration_sec: 1800,
      updatedAt: '7/21/2024',
      updatedBy: 'Halima A',
      map: 'IL_HW',
      configuration: 'Vanilla',
    },
    {
      id: 't-5',
      name: '[SASA V2V] VERTICAL_DP_SPLIT',
      folderId: 'f-9',
      status: TestStatus.ARCHIVED,
      description: 'Test for vertical DP splits in SASA V2V.',
      steps: [],
      labels: ['sasa', 'full', 'v2v', 'topology'],
      priority: Priority.P2,
      affectedObjectType: 'Topology',
      testMethod: 'V2V',
      estimated_duration_sec: 60,
      updatedAt: '6/15/2024',
      updatedBy: 'Halima A',
    },
    {
      id: 't-6',
      name: 'SR Full Review',
      folderId: 'f-10',
      status: TestStatus.ACTIVE,
      description: 'Full review of SR features.',
      steps: [],
      labels: ['sr', 'full-review'],
      priority: Priority.P1,
      affectedObjectType: 'Multiple',
      testMethod: 'Manual',
      estimated_duration_sec: 3600,
      updatedAt: '7/20/2024',
      updatedBy: 'Yogev M',
    },
];

// CYCLES
export const mockCycles: Cycle[] = [
  {
    id: 'c-1',
    name: '24.11 Full Regression',
    description: 'Full regression cycle for version 24.11, covering all major features and maps.',
    status: CycleStatus.ACTIVE,
    labels: ['regression', '24.11', 'full'],
    updatedAt: '7/24/2024',
    version: '24.11.0.1',
    refVersion: '24.10.3.2',
    cycleType: CycleType.REGRESSION,
    mapsInfo: [
      { id: 'mi-1', mapName: 'Detroit', mainMapLink: 'http://example.com/detroit' }, 
      { id: 'mi-2', mapName: 'Munich', mainMapLink: 'http://example.com/munich' }
    ]
  },
  {
    id: 'c-2',
    name: 'SASA Sanity for 24.12 Sprint 1',
    description: 'Quick sanity check for SASA features in the upcoming sprint.',
    status: CycleStatus.DRAFT,
    labels: ['sasa', 'sanity', '24.12'],
    updatedAt: '7/25/2024',
    version: '24.12.0.0-dev',
    cycleType: CycleType.SMOKE,
  },
   {
    id: 'c-3',
    name: '24.10 Hotfix Patch',
    description: 'Verification of hotfix for critical production issue.',
    status: CycleStatus.CLOSED,
    labels: ['hotfix', '24.10'],
    updatedAt: '7/15/2024',
    version: '24.10.4.0',
    refVersion: '24.10.3.2',
    cycleType: CycleType.NEW_FEATURE,
  },
];

// SCOPES
export const mockScopes: Scope[] = [
    { id: 's-1', cycleId: 'c-1', name: ScopeName.MEPY_FULL },
    { id: 's-2', cycleId: 'c-1', name: ScopeName.SASA },
    { id: 's-3', cycleId: 'c-2', name: ScopeName.MEPY_SANITY },
    { id: 's-4', cycleId: 'c-3', name: ScopeName.NONE },
];

// CYCLE ITEMS
export const mockCycleItems: CycleItem[] = [
    {
        id: 'ci-1',
        cycleId: 'c-1',
        scopeId: 's-1',
        testId: 't-1',
        testSnapshot: {
            name: mockTests[0].name,
            steps: mockTests[0].steps,
            labels: mockTests[0].labels,
            affectedObjectType: mockTests[0].affectedObjectType,
            testMethod: mockTests[0].testMethod,
        },
        assigneeId: 'u-3', // Halima A
        result: CycleItemResult.NOT_RUN,
        updatedAt: '7/24/2024',
        map: 'Detroit',
        configurations: ['Vanilla', 'With Slicing']
    },
    {
        id: 'ci-2',
        cycleId: 'c-1',
        scopeId: 's-1',
        testId: 't-2',
        testSnapshot: {
            name: mockTests[1].name,
            steps: mockTests[1].steps,
            labels: mockTests[1].labels,
            affectedObjectType: mockTests[1].affectedObjectType,
            testMethod: mockTests[1].testMethod,
        },
        assigneeId: 'u-3', // Halima A
        result: CycleItemResult.PASSED,
        updatedAt: '7/25/2024',
        map: 'Detroit',
        configurations: ['Vanilla']
    },
    {
        id: 'ci-3',
        cycleId: 'c-1',
        scopeId: 's-1',
        testId: 't-3',
        testSnapshot: {
            name: mockTests[2].name,
            steps: mockTests[2].steps,
            labels: mockTests[2].labels,
            affectedObjectType: mockTests[2].affectedObjectType,
            testMethod: mockTests[2].testMethod,
        },
        assigneeId: 'u-4', // Yogev M
        result: CycleItemResult.FAILED,
        updatedAt: '7/25/2024',
        map: 'Munich',
        configurations: ['Const-Data']
    },
    {
        id: 'ci-4',
        cycleId: 'c-1',
        scopeId: 's-2',
        testId: 't-4',
        testSnapshot: {
            name: mockTests[3].name,
            steps: mockTests[3].steps,
            labels: mockTests[3].labels,
            affectedObjectType: mockTests[3].affectedObjectType,
            testMethod: mockTests[3].testMethod,
        },
        assigneeId: 'u-2', // Michelle H
        result: CycleItemResult.BLOCKED,
        updatedAt: '7/24/2024',
        map: 'IL_HW',
        configurations: ['Vanilla']
    },
     {
        id: 'ci-5',
        cycleId: 'c-2',
        scopeId: 's-3',
        testId: 't-4',
        testSnapshot: {
            name: mockTests[3].name,
            steps: mockTests[3].steps,
            labels: mockTests[3].labels,
            affectedObjectType: mockTests[3].affectedObjectType,
            testMethod: mockTests[3].testMethod,
        },
        assigneeId: null,
        result: CycleItemResult.NOT_RUN,
        updatedAt: '7/25/2024',
        map: 'IL_HW',
        configurations: ['Vanilla']
    },
    {
        id: 'ci-6',
        cycleId: 'c-1',
        scopeId: 's-1',
        testId: 't-6',
        testSnapshot: {
            name: mockTests[5].name,
            steps: mockTests[5].steps,
            labels: mockTests[5].labels,
            affectedObjectType: mockTests[5].affectedObjectType,
            testMethod: mockTests[5].testMethod,
        },
        assigneeId: 'u-4', // Yogev M
        result: CycleItemResult.EXECUTING,
        updatedAt: '7/26/2024',
        map: 'Detroit',
        configurations: ['Vanilla']
    },
    {
        id: 'ci-7',
        cycleId: 'c-1',
        scopeId: 's-2',
        testId: 't-5', // This test is archived, but that's fine for a cycle item.
        testSnapshot: {
            name: mockTests[4].name,
            steps: mockTests[4].steps,
            labels: mockTests[4].labels,
            affectedObjectType: mockTests[4].affectedObjectType,
            testMethod: mockTests[4].testMethod,
        },
        assigneeId: 'u-3', // Halima A
        result: CycleItemResult.PENDING_REVIEW,
        updatedAt: '7/26/2024',
        map: 'Munich',
        configurations: ['Const-Data']
    },
];

// NOTES
export const mockNotes: Note[] = [
    {
        id: 'n-1',
        parentId: 'c-1',
        parentType: 'cycle',
        authorId: 'u-2',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        content: '<h3>Overall Cycle Status</h3><p>We are seeing some regressions in the <b>Munich</b> map. Please see the full report at <a href="https://example.com/munich-report" target="_blank" rel="noopener noreferrer">this link</a> for more details.</p>'
    },
    {
        id: 'n-2',
        parentId: 'ci-3',
        parentType: 'item',
        authorId: 'u-4',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        content: '<p>Test failed due to a new probe signature. See attached snapshot for details. Not a true failure, but requires baseline update.</p>'
    },
    {
        id: 'n-3',
        parentId: 'mi-1', // Corresponds to the Detroit map in cycle c-1
        parentType: 'map',
        authorId: 'u-3',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        content: '<p>Detroit V2V runs are complete. SA review is pending.</p>'
    },
    {
        id: 'n-4',
        parentId: 'c-1_Lane_Type', // cycleId_affectedObjectType
        parentType: 'objectType',
        authorId: 'u-2', // Michelle H
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        content: '<p>General observation on <b>Lane Type</b> tests for this cycle: we are seeing a higher than usual number of mismatches in urban environments. This needs further investigation across all maps.</p>'
    },
    {
        id: 'n-5',
        parentId: 'c-1',
        parentType: 'cycle',
        authorId: 'u-1', // Tzipi W
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        content: '<p><b>Important:</b> The automated V2V probe analysis tool is currently down. Please use manual review methods for all V2V tests until further notice.</p>',
        isPinned: true,
    }
];


// MAPS & CONFIGURATIONS
export const mockMaps: string[] = ['Detroit', 'IL_HW', 'JLM', 'Manhattan', 'Munich', 'Paris', 'TLV', 'Tokyo', 'Metropolis', 'Gotham'];

export const mockConfigurations: string[] = ['None', 'Const-Data', 'Vanilla', 'Prod-CD-Event', 'W/O Slicing', 'With Slicing', 'CM'];


// UTILITY to build folder tree structure
export const buildFolderTree = (
  folders: Omit<Folder, 'children' | 'tests'>[],
  tests: Test[]
): Folder[] => {
  const folderMap = new Map<UUID, Folder>();
  const rootFolders: Folder[] = [];

  // Initialize map with folder structures
  folders.forEach(f => {
    folderMap.set(f.id, { ...f, children: [], tests: [] });
  });

  // Populate tests into their respective folders
  tests.forEach(test => {
    const folder = folderMap.get(test.folderId);
    if (folder) {
      folder.tests.push(test);
    }
  });

  // Link children to their parents
  folders.forEach(f => {
    const folder = folderMap.get(f.id)!;
    if (f.parentId && folderMap.has(f.parentId)) {
      const parent = folderMap.get(f.parentId)!;
      // Avoid duplicates if already processed
      if (!parent.children.some(child => child.id === folder.id)) {
        parent.children.push(folder);
      }
    } else {
      rootFolders.push(folder);
    }
  });

  return rootFolders;
};
