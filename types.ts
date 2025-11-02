export type UUID = string;

export enum TestStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

export enum Priority {
  P0 = 'P0',
  P1 = 'P1',
  P2 = 'P2',
  P3 = 'P3',
}

export enum CycleStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  CLOSED = 'closed',
}

export enum CycleItemResult {
  NOT_RUN = 'not_run',
  PASSED = 'passed',
  FAILED = 'failed',
  BLOCKED = 'blocked',
}

export enum CycleType {
  SMOKE = 'smoke',
  REGRESSION = 'regression',
  NEW_FEATURE = 'new_feature',
  PERFORMANCE = 'performance',
}

export enum ScopeName {
  NONE = 'None',
  MEPY_SMOKE = 'Mepy Smoke',
  MEPY_SANITY = 'Mepy Sanity',
  MEPY_FULL = 'Mepy Full',
  SASA = 'SASA',
  SR = 'SR',
  MIX_VERSION = 'Mix Version',
  MEST_RSD = 'MEST RSD',
  PRE_PRODUCTION = 'Pre-Production',
  SCALE_TEST = 'Scale-test',
}

export enum UserRole {
  VIEWER = 'viewer',
  ANALYST = 'analyst',
  VALIDATION_LEAD = 'validation_lead',
  MAINTAINER = 'maintainer',
}

export interface Permissions {
  canEditLibrary: boolean;
  canCreateCycles: boolean;
  canEditCycles: boolean;
  canRunTests: boolean;
  canAddNotes: boolean;
  isViewer: boolean;
}

export interface CycleMapInfo {
  id: UUID;
  mapName: string;
  mainMapLink?: string;
  refMapLink?: string;
  mainSA?: string;
  refSA?: string;
  v2vMapsLink?: string;
  v2vProbes?: string;
  gtProbes?: string;
  comment?: string;
}

export interface User {
  id: UUID;
  displayName: string;
  email: string;
  role: UserRole;
}

export interface Folder {
  id: UUID;
  name: string;
  parentId: UUID | null;
  path: string;
  children: Folder[];
  tests: Test[];
}

export interface TestStep {
  step_no: number;
  action: string;
  expected: string;
}

export interface Test {
  id: UUID;
  name: string;
  folderId: UUID;
  status: TestStatus;
  description: string;
  steps: TestStep[];
  labels: string[];
  priority: Priority;
  affectedObjectType?: string;
  testMethod?: string;
  estimated_duration_sec: number;
  updatedAt: string;
  updatedBy: string;
  map?: string;
  configuration?: string;
}

export interface Scope {
  id: UUID;
  cycleId: UUID;
  name: ScopeName;
}

export interface Cycle {
  id: UUID;
  name: string;
  description: string;
  status: CycleStatus;
  labels: string[];
  updatedAt: string;
  version?: string;
  refVersion?: string;
  cycleType?: CycleType;
  mapsInfo?: CycleMapInfo[];
}

export interface CycleItem {
  id: UUID;
  cycleId: UUID;
  scopeId: UUID;
  testId: UUID;
  testSnapshot: {
    name: string;
    steps: TestStep[];
    labels: string[];
    affectedObjectType?: string;
    testMethod?: string;
  };
  assigneeId: UUID | null;
  result: CycleItemResult;
  updatedAt: string;
  map: string | null;
  configuration: string | null;
}

export type NoteParentType = 'cycle' | 'map' | 'item';

export interface Note {
  id: UUID;
  content: string; // HTML content from the rich text editor
  authorId: UUID;
  createdAt: string; // ISO string date
  updatedAt: string; // ISO string date
  parentId: UUID; // ID of the Cycle, CycleMapInfo, or CycleItem it's attached to
  parentType: NoteParentType;
}
