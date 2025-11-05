

// Fix: Removed self-import of UUID which was causing a conflict.
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
  ARCHIVED = 'archived',
}

export enum CycleItemResult {
  NOT_RUN = 'not_run',
  EXECUTING = 'executing',
  PENDING_REVIEW = 'pending_review',
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
  configurations: string[];
}

// Fix: Added missing type definitions for creating/updating tests and cycles.

/**
 * Type for creating a new test case.
 * It omits backend-generated fields like id, status, and timestamps.
 */
export type TestCreate = Omit<Test, 'id' | 'status' | 'updatedAt' | 'updatedBy'>;

/**
 * Payload for bulk-updating multiple test cases at once.
 */
export interface BulkTestUpdatePayload {
  testIds: UUID[];
  updates: Partial<Test>;
}

/**
 * Type for creating a new test cycle.
 * It omits backend-generated fields.
 */
export interface CycleCreate {
  name: string;
  description: string;
  labels: string[];
  version?: string;
  refVersion?: string;
  cycleType?: CycleType;
  mapsInfo?: CycleMapInfo[];
}

/**
 * Represents the full details of a cycle, including its associated scopes and test items.
 */
export interface CycleDetails extends Cycle {
  scopes: Scope[];
  items: CycleItem[];
}

/**
 * Payload for bulk-updating multiple cycle items at once.
 * Matches the backend's BulkUpdateRequest schema.
 */
export interface BulkCycleItemUpdatePayload {
  updates: CycleItemUpdate[];
}

/**
 * Individual cycle item update within a bulk update request.
 * Matches the backend's CycleItemUpdate schema.
 */
export interface CycleItemUpdate {
  id: UUID;
  assigneeId?: UUID | null;
  result?: CycleItemResult | string | null;
  map?: string | null;
  configurations?: string[] | null;
}

/**
 * Legacy format for backwards compatibility.
 * @deprecated Use BulkCycleItemUpdatePayload instead.
 */
export interface LegacyBulkCycleItemUpdatePayload {
  itemIds: UUID[];
  updates: Partial<CycleItem>;
}


export type NoteParentType = 'cycle' | 'map' | 'item' | 'objectType';

export interface Note {
  id: UUID;
  content: string; // HTML content from the rich text editor
  authorId: UUID;
  createdAt: string; // ISO string date
  updatedAt: string; // ISO string date
  parentId: UUID; // ID of the Cycle, CycleMapInfo, CycleItem, or a composite key (e.g., cycleId_objectType) it's attached to
  parentType: NoteParentType;
  isPinned?: boolean;
}

/**
 * Type for creating a new note.
 * It omits backend-generated fields like id, authorId, createdAt, and updatedAt.
 */
export interface NoteCreate {
  content: string;
  parentId: UUID;
  parentType: NoteParentType;
  isPinned?: boolean;
}

/**
 * Type for updating an existing note.
 */
export interface NoteUpdate {
  content?: string;
  isPinned?: boolean;
}