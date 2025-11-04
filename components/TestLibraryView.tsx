
import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Folder, Test, Priority, TestStatus, TestStep, UUID, TestCreate } from '../types';
import FolderTree from './FolderTree';
import TestList from './TestList';
import { PlusIcon } from './icons/PlusIcon';
import { useData } from './DataContext';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ExpandAllIcon } from './icons/ExpandAllIcon';
import { CollapseAllIcon } from './icons/CollapseAllIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { UploadIcon } from './icons/UploadIcon';
import { ReviewIcon } from './icons/ReviewIcon';
import { buildFolderTree } from '../utils';

// A generic Modal component for reuse within this view
const Modal: React.FC<{ children: React.ReactNode; onClose: () => void; title: string }> = ({ children, onClose, title }) => (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onMouseDown={onClose}>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl text-gray-900 dark:text-white" onMouseDown={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">&times;</button>
      </div>
      {children}
    </div>
  </div>
);

const TestEditorModal: React.FC<{ 
    test: Partial<Test> | null; 
    onClose: () => void; 
    onSave: (test: Partial<Test>) => void;
}> = ({ test, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<Test>>(() => {
        if (test && test.id) { // Editing an existing test
            return test;
        }
        // Creating a new test or duplicating, provide a default structure or passed in data
        return { 
            name: '', 
            description: '', 
            priority: Priority.P2, 
            labels: [], 
            steps: [{ step_no: 1, action: '', expected: '' }],
            map: '',
            configuration: '',
            affectedObjectType: '',
            testMethod: '',
            estimated_duration_sec: 60,
            ...test, // This will override defaults if duplicating
        };
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLabelsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({...prev, labels: e.target.value.split(',').map(l => l.trim())}));
    }

    const handleStepChange = (index: number, field: 'action' | 'expected', value: string) => {
        const newSteps = [...(formData.steps || [])];
        newSteps[index] = { ...newSteps[index], [field]: value, step_no: index + 1 };
        setFormData(prev => ({ ...prev, steps: newSteps }));
    };

    const addStep = () => {
        const newSteps = [...(formData.steps || [])];
        newSteps.push({ step_no: newSteps.length + 1, action: '', expected: '' });
        setFormData(prev => ({ ...prev, steps: newSteps }));
    };
    
    const removeStep = (index: number) => {
        const newSteps = [...(formData.steps || [])].filter((_, i) => i !== index).map((s, i) => ({ ...s, step_no: i + 1 }));
        setFormData(prev => ({ ...prev, steps: newSteps }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal onClose={onClose} title={test?.id ? 'Edit Test' : 'Create New Test'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Test Name</label>
                    <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required className="mt-1 w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-blue-accent focus:border-blue-accent" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Description</label>
                    <textarea name="description" value={formData.description || ''} onChange={handleChange} rows={3} className="mt-1 w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-blue-accent focus:border-blue-accent"></textarea>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Priority</label>
                        <select name="priority" value={formData.priority || Priority.P2} onChange={handleChange} className="mt-1 w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-blue-accent focus:border-blue-accent">
                            {Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Affected Object Type</label>
                        <input type="text" name="affectedObjectType" value={formData.affectedObjectType || ''} onChange={handleChange} placeholder="e.g. Lane_Mark" className="mt-1 w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-blue-accent focus:border-blue-accent" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Test Method</label>
                        <input type="text" name="testMethod" value={formData.testMethod || ''} onChange={handleChange} placeholder="e.g. C2P" className="mt-1 w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-blue-accent focus:border-blue-accent" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Map</label>
                        <input type="text" name="map" value={formData.map || ''} onChange={handleChange} placeholder="e.g. Metropolis" className="mt-1 w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-blue-accent focus:border-blue-accent" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Configuration</label>
                        <input type="text" name="configuration" value={formData.configuration || ''} onChange={handleChange} placeholder="e.g. Standard" className="mt-1 w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-blue-accent focus:border-blue-accent" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Labels (comma-separated)</label>
                    <input type="text" name="labels" value={formData.labels?.join(', ') || ''} onChange={handleLabelsChange} className="mt-1 w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-blue-accent focus:border-blue-accent" />
                </div>
                <div>
                     <h3 className="text-md font-medium text-gray-600 dark:text-gray-300 mb-2">Steps</h3>
                     <div className="space-y-2">
                        {formData.steps?.map((step, index) => (
                            <div key={index} className="flex items-start gap-2 p-2 bg-gray-100/50 dark:bg-gray-900/50 rounded-md">
                                <span className="text-sm font-bold text-gray-500 dark:text-gray-400 pt-2">{index + 1}.</span>
                                <div className="flex-1 space-y-1">
                                    <textarea placeholder="Action" value={step.action} onChange={e => handleStepChange(index, 'action', e.target.value)} rows={2} className="w-full text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 focus:ring-blue-accent focus:border-blue-accent"></textarea>
                                    <textarea placeholder="Expected Result" value={step.expected} onChange={e => handleStepChange(index, 'expected', e.target.value)} rows={2} className="w-full text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 focus:ring-blue-accent focus:border-blue-accent"></textarea>
                                </div>
                                <button type="button" onClick={() => removeStep(index)} className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 p-1 mt-1">&times;</button>
                            </div>
                        ))}
                     </div>
                     <button type="button" onClick={addStep} className="mt-2 text-sm text-blue-500 dark:text-blue-400 hover:underline">Add Step</button>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 transition-colors">Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded-md bg-blue-accent hover:bg-blue-600 transition-colors text-white">Save Test</button>
                </div>
            </form>
        </Modal>
    );
};

interface BulkChanges {
  priority?: Priority;
  labels?: string[];
  map?: string;
  configuration?: string;
  affectedObjectType?: string;
  testMethod?: string;
}

const BulkTestEditModal: React.FC<{
  onClose: () => void;
  onSave: (changes: BulkChanges) => void;
  count: number;
}> = ({ onClose, onSave, count }) => {
  const [updates, setUpdates] = useState<BulkChanges>({
    priority: Priority.P2,
    labels: [],
    map: '',
    configuration: '',
    affectedObjectType: '',
    testMethod: ''
  });
  const [enabledFields, setEnabledFields] = useState<Set<keyof BulkChanges>>(new Set());

  const handleToggleField = (field: keyof BulkChanges) => {
    setEnabledFields(prev => {
      const newSet = new Set(prev);
      if (newSet.has(field)) newSet.delete(field);
      else newSet.add(field);
      return newSet;
    });
  };

  const handleSubmit = () => {
    const finalChanges: BulkChanges = {};
    
    if (enabledFields.has('priority')) {
        finalChanges.priority = updates.priority;
    }
    if (enabledFields.has('labels')) {
        finalChanges.labels = updates.labels?.map(l => l.trim()).filter(l => l.length > 0);
    }
    if (enabledFields.has('affectedObjectType')) {
        finalChanges.affectedObjectType = updates.affectedObjectType;
    }
    if (enabledFields.has('testMethod')) {
        finalChanges.testMethod = updates.testMethod;
    }
    if (enabledFields.has('map')) {
        finalChanges.map = updates.map;
    }
    if (enabledFields.has('configuration')) {
        finalChanges.configuration = updates.configuration;
    }

    onSave(finalChanges);
    onClose();
  };
  
  const renderField = (field: keyof BulkChanges, label: string, children: React.ReactElement<any>) => (
     <div className="flex items-center space-x-3 p-3 bg-gray-100/50 dark:bg-gray-900/50 rounded-md">
        <input 
            type="checkbox" 
            checked={enabledFields.has(field)} 
            onChange={() => handleToggleField(field)}
            className="h-4 w-4 bg-gray-200 dark:bg-gray-700 border-gray-400 dark:border-gray-600 rounded text-blue-accent focus:ring-blue-accent"
        />
        <div className={`flex-1 ${!enabledFields.has(field) ? 'opacity-50' : ''}`}>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{label}</label>
            {React.cloneElement(children, { disabled: !enabledFields.has(field) })}
        </div>
    </div>
  );

  return (
    <Modal onClose={onClose} title={`Bulk Edit ${count} Tests`}>
        <div className="space-y-4">
           {renderField('priority', 'Priority', 
                <select value={updates.priority || Priority.P2} onChange={e => setUpdates(p => ({...p, priority: e.target.value as Priority}))} className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2">
                    {Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
            )}
            {renderField('labels', 'Labels (comma-separated)', 
                <input type="text" value={updates.labels?.join(', ') || ''} onChange={e => setUpdates(p => ({...p, labels: e.target.value.split(',')}))} className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2" />
            )}
            {renderField('affectedObjectType', 'Affected Object Type', 
                <input type="text" value={updates.affectedObjectType || ''} onChange={e => setUpdates(p => ({...p, affectedObjectType: e.target.value}))} className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2" />
            )}
            {renderField('testMethod', 'Test Method', 
                <input type="text" value={updates.testMethod || ''} onChange={e => setUpdates(p => ({...p, testMethod: e.target.value}))} className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2" />
            )}
             {renderField('map', 'Map', 
                <input type="text" value={updates.map || ''} onChange={e => setUpdates(p => ({...p, map: e.target.value}))} className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2" />
            )}
            {renderField('configuration', 'Configuration', 
                <input type="text" value={updates.configuration || ''} onChange={e => setUpdates(p => ({...p, configuration: e.target.value}))} className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2" />
            )}
        </div>
        <div className="flex justify-end space-x-3 pt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100">Cancel</button>
            <button type="button" onClick={handleSubmit} className="px-4 py-2 rounded-md bg-blue-accent hover:bg-blue-600 text-white">Apply Changes</button>
        </div>
    </Modal>
  );
};

const ImportStatusModal: React.FC<{ status: { message: string, error?: boolean }; onClose: () => void; }> = ({ status, onClose }) => (
  <Modal onClose={onClose} title="Import Status">
    <div className={`p-4 rounded-md ${status.error ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200' : 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200'}`}>
        <p className="whitespace-pre-wrap">{status.message}</p>
    </div>
    <div className="flex justify-end mt-4">
        <button onClick={onClose} className="px-4 py-2 rounded-md bg-blue-accent hover:bg-blue-600 text-white">Close</button>
    </div>
  </Modal>
);

// Maximum number of error details to display in import results
const MAX_DISPLAYED_ERRORS = 3;

// Helper function to safely extract error message from various error types
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message);
  }
  return String(error);
};

const TestLibraryView: React.FC<{ onStartReview: (testIds: string[]) => void }> = ({ onStartReview }) => {
  const { folders, setFolders, tests, createTest, updateTest, bulkUpdateTests, permissions } = useData();
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(folders[0]?.id || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<Partial<Test> | null>(null);
  const [archivingTest, setArchivingTest] = useState<Test | null>(null);
  const [deletingFolder, setDeletingFolder] = useState<Omit<Folder, 'children' | 'tests'> | null>(null);
  
  const [selectedTestIds, setSelectedTestIds] = useState<Set<string>>(new Set());
  const [isBulkEditModalOpen, setIsBulkEditModalOpen] = useState(false);
  
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isResizing = useRef(false);
  
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importStatus, setImportStatus] = useState<{message: string, error?: boolean} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const toggleFolder = useCallback((folderId: string) => {
    setExpandedFolders(prev => {
        const newSet = new Set(prev);
        if (newSet.has(folderId)) {
            newSet.delete(folderId);
        } else {
            newSet.add(folderId);
        }
        return newSet;
    });
  }, []);

  const expandAllFolders = useCallback(() => {
    setExpandedFolders(new Set(folders.map(f => f.id)));
  }, [folders]);

  const collapseAllFolders = () => {
      setExpandedFolders(new Set());
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isSidebarCollapsed) return;
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [isSidebarCollapsed]);

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing.current) {
      const newWidth = e.clientX;
      if (newWidth >= 250 && newWidth <= window.innerWidth * 0.5) {
        setSidebarWidth(newWidth);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);
  
  const folderTree = useMemo(() => buildFolderTree(folders, tests), [folders, tests]);
  
  const folderPathMap = useMemo(() => {
    const map = new Map<string, string>();
    const allFolders = [...folders];

    function getPath(folderId: string): string {
      if (map.has(folderId)) return map.get(folderId)!;
      
      const folder = allFolders.find(f => f.id === folderId);
      if (!folder) return '';
      
      const path = folder.parentId ? `${getPath(folder.parentId)}/${folder.name}` : `/${folder.name}`;
      map.set(folderId, path);
      return path;
    }
    
    allFolders.forEach(f => getPath(f.id));
    return map;
  }, [folders]);

  const getAllChildFolderIds = useCallback((folderId: string, allFolders: Omit<Folder, 'children' | 'tests'>[]): string[] => {
    let ids: string[] = [];
    const children = allFolders.filter(f => f.parentId === folderId);
    if (children.length === 0) return [];
    for (const child of children) {
        ids.push(child.id);
        ids = [...ids, ...getAllChildFolderIds(child.id, allFolders)];
    }
    return ids;
  }, []);

  const filteredTests = useMemo(() => {
    let testsToShow = tests;
    if (selectedFolderId) {
      const folderIdsToShow = [selectedFolderId, ...getAllChildFolderIds(selectedFolderId, folders)];
      testsToShow = tests.filter(test => folderIdsToShow.includes(test.folderId));
    }

    if (!showArchived) {
        testsToShow = testsToShow.filter(test => test.status !== TestStatus.ARCHIVED);
    }
    
    if (searchTerm) {
        const lowercasedFilter = searchTerm.toLowerCase();
        testsToShow = testsToShow.filter(test => 
            test.name.toLowerCase().includes(lowercasedFilter) ||
            test.labels.some(label => label.toLowerCase().includes(lowercasedFilter)) ||
            (test.affectedObjectType && test.affectedObjectType.toLowerCase().includes(lowercasedFilter)) ||
            (test.testMethod && test.testMethod.toLowerCase().includes(lowercasedFilter))
        );
    }
    return testsToShow;
  }, [tests, selectedFolderId, showArchived, searchTerm, folders, getAllChildFolderIds]);
  
  const handleSaveTest = async (testData: Partial<Test>) => {
    const { id, status, updatedAt, updatedBy, ...createData } = testData;
    const payload: TestCreate = {
      name: createData.name!,
      folderId: createData.folderId || selectedFolderId!,
      description: createData.description,
      steps: createData.steps,
      labels: createData.labels,
      priority: createData.priority,
      affectedObjectType: createData.affectedObjectType,
      testMethod: createData.testMethod,
      estimated_duration_sec: createData.estimated_duration_sec,
      map: createData.map,
      configuration: createData.configuration,
    };

    try {
      if (id) { // Edit
          await updateTest(id, payload);
      } else { // Create
          await createTest(payload);
      }
      setEditingTest(null);
    } catch (error) {
      console.error('Failed to save test:', error);
      // Keep the modal open so user can see their data and try again
      alert(`Failed to save test: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };
  
   const handleArchiveTest = async (test: Test) => {
      try {
        await bulkUpdateTests({ testIds: [test.id], updates: { status: TestStatus.ARCHIVED } });
        setArchivingTest(null);
      } catch (error) {
        console.error('Failed to archive test:', error);
        alert(`Failed to archive test: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
  };

  const handleDuplicateTest = (testToDuplicate: Test) => {
    const { id, ...testData } = testToDuplicate;
    const newTestForModal: Partial<Test> = {
      ...testData,
      name: `Copy of ${testData.name}`, 
    };
    setEditingTest(newTestForModal);
  };

  const handleSelectTest = (testId: string) => {
    setSelectedTestIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(testId)) newSet.delete(testId);
        else newSet.add(testId);
        return newSet;
    });
  };

  const handleSelectAllTests = () => {
    const allVisibleIds = filteredTests.map(t => t.id);
    const allVisibleSelected = allVisibleIds.length > 0 && allVisibleIds.every(id => selectedTestIds.has(id));

    if (allVisibleSelected) {
        setSelectedTestIds(new Set());
    } else {
        setSelectedTestIds(new Set(allVisibleIds));
    }
  };

  const handleBulkEditSave = async (changes: BulkChanges) => {
    try {
      await bulkUpdateTests({
          testIds: Array.from(selectedTestIds),
          updates: changes
      });
      setIsBulkEditModalOpen(false);
      setSelectedTestIds(new Set());
    } catch (error) {
      console.error('Failed to bulk update tests:', error);
      alert(`Failed to update tests: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleDropTest = async (testId: string, targetFolderId: string) => {
      try {
        await bulkUpdateTests({ testIds: [testId], updates: { folderId: targetFolderId } });
      } catch (error) {
        console.error('Failed to move test:', error);
        alert(`Failed to move test: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
  };
  
  const handleDropFolder = (folderId: string, targetFolderId: string | null) => {
      // NOTE: API endpoint for updating a folder is not specified.
      // This will only update local state.
      setFolders(prev => prev.map(f => f.id === folderId ? { ...f, parentId: targetFolderId } : f));
  };

  const handleDeleteFolder = (folderId: string) => {
    // NOTE: API endpoint for deleting a folder is not specified.
    // This will only update local state.
    const folderIdsToDelete = [folderId, ...getAllChildFolderIds(folderId, folders)];
    setFolders(prev => prev.filter(f => !folderIdsToDelete.includes(f.id)));
    // Also remove tests in those folders locally.
    // setTests(prev => prev.filter(t => !folderIdsToDelete.includes(t.folderId)));
    if (selectedFolderId && folderIdsToDelete.includes(selectedFolderId)) {
        const rootFolder = folders.find(f => !f.parentId);
        setSelectedFolderId(rootFolder ? rootFolder.id : null);
    }
  };

  const handleExportCSV = () => {
    const headers = ['id', 'name', 'folderPath', 'status', 'description', 'steps', 'labels', 'priority', 'affectedObjectType', 'testMethod', 'estimated_duration_sec', 'map', 'configuration'];
    
    const escapeCSV = (str: string | number | null | undefined): string => {
        const s = String(str ?? '');
        if (s.includes(',') || s.includes('"') || s.includes('\n')) {
            return `"${s.replace(/"/g, '""')}"`;
        }
        return s;
    };
    
    const rows = tests.map(test => {
        const folderPath = folderPathMap.get(test.folderId) || '/';
        const stepsString = test.steps.map(s => `${s.action || ''}||${s.expected || ''}`).join('@@');
        const labelsString = test.labels.join(',');

        return [
            test.id, test.name, folderPath, test.status, test.description, stepsString,
            labelsString, test.priority, test.affectedObjectType, test.testMethod,
            test.estimated_duration_sec, test.map, test.configuration
        ].map(escapeCSV).join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    const date = new Date().toISOString().split('T')[0];
    link.setAttribute("download", `catalyst_tests_export_${date}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsImportModalOpen(true);
      setImportStatus({ message: "Reading and parsing file..." });

      try {
        const csvText = await file.text();
        await processCSVData(csvText);
      } catch (error) {
          setImportStatus({ message: `Error reading file: ${error instanceof Error ? error.message : String(error)}`, error: true });
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
  };

  const processCSVData = async (csvText: string) => {
    const parseCsv = (text: string): string[][] => {
        const rows: string[][] = [];
        let currentRow: string[] = [];
        let field = '';
        let inQuotes = false;

        text = text.replace(/\r\n/g, '\n');

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (inQuotes) {
                if (char === '"') {
                    if (i + 1 < text.length && text[i + 1] === '"') {
                        field += '"';
                        i++; // Skip escaped quote
                    } else {
                        inQuotes = false;
                    }
                } else {
                    field += char;
                }
            } else {
                if (char === '"') {
                    if (field === '') {
                        inQuotes = true;
                    } else {
                        field += char; // Treat as part of the field if not at the start
                    }
                } else if (char === ',') {
                    currentRow.push(field);
                    field = '';
                } else if (char === '\n') {
                    currentRow.push(field);
                    rows.push(currentRow);
                    currentRow = [];
                    field = '';
                } else {
                    field += char;
                }
            }
        }
        
        if (field || currentRow.length > 0) {
            currentRow.push(field);
            rows.push(currentRow);
        }
        return rows;
    };

    const parsedRows = parseCsv(csvText);
    const nonEmptyRows = parsedRows.filter(row => row.length > 1 || (row.length === 1 && row[0] !== ''));

    if (nonEmptyRows.length < 1) {
        setImportStatus({ message: "CSV file is empty or has no header.", error: true });
        return;
    }
    
    const headerRow = nonEmptyRows.shift();
    if (!headerRow) {
      setImportStatus({ message: "CSV file has no header.", error: true });
      return;
    }
    const headers = headerRow.map(h => h.trim());

    const requiredHeaders = ['name', 'folderPath'];
    if (!requiredHeaders.every(h => headers.includes(h))) {
        setImportStatus({ message: `CSV is missing required headers. Required: ${requiredHeaders.join(', ')}`, error: true });
        return;
    }

    const newTests: TestCreate[] = [];
    const updatedTests: { id: string, data: TestCreate }[] = [];
    const skippedTests: { row: number, name: string, reason: string }[] = [];
    
    const pathIdCache = new Map<string, string>();
    folders.forEach(f => {
        const path = folderPathMap.get(f.id);
        if (path) {
            pathIdCache.set(path, f.id);
        }
    });
    
    // Keep track of newly created folders locally
    const newFolders: Omit<Folder, 'children' | 'tests'>[] = [];
    let folderIdCounter = 1;
    if (folders.length > 0) {
      const existingIds = folders
        .map(f => {
          const parts = f.id.split('-');
          // Validate format is 'f-{number}'
          if (parts.length === 2 && parts[0] === 'f') {
            const num = parseInt(parts[1], 10);
            return isNaN(num) ? 0 : num;
          }
          return 0;
        })
        .filter(id => id > 0);
      folderIdCounter = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    }
    
    // Helper function to create folder hierarchy from a path
    const ensureFolderPath = (path: string): UUID => {
      if (pathIdCache.has(path)) {
        return pathIdCache.get(path)!;
      }
      
      // Parse the path and create folders as needed
      const parts = path.split('/').filter(p => p.length > 0);
      if (parts.length === 0) {
        throw new Error('Invalid folder path: path is empty');
      }
      
      let currentPath = '';
      let parentId: UUID | null = null;
      
      for (const part of parts) {
        currentPath += '/' + part;
        
        if (pathIdCache.has(currentPath)) {
          parentId = pathIdCache.get(currentPath)!;
        } else {
          // Create new folder
          const newFolderId = `f-${folderIdCounter++}`;
          const newFolder: Omit<Folder, 'children' | 'tests'> = {
            id: newFolderId,
            name: part,
            parentId: parentId,
            path: currentPath
          };
          newFolders.push(newFolder);
          pathIdCache.set(currentPath, newFolderId);
          parentId = newFolderId;
        }
      }
      
      return parentId!;
    };
    
    let errors: string[] = [];

    nonEmptyRows.forEach((values, index) => {
      const row = headers.reduce((obj, key, i) => ({...obj, [key]: (values[i] || '').trim() }), {} as Record<string, string>);

      if (!row.name || !row.folderPath) {
          errors.push(`Row ${index + 2}: Missing required field 'name' or 'folderPath'.`);
          return;
      }
      
      // Ensure folder path exists, creating it if necessary
      let folderId: UUID;
      try {
        folderId = ensureFolderPath(row.folderPath);
      } catch (error) {
        skippedTests.push({
          row: index + 2,
          name: row.name,
          reason: `Failed to create folder path "${row.folderPath}": ${error instanceof Error ? error.message : String(error)}`
        });
        return;
      }
      
      const steps: TestStep[] = (row.steps || '').split('@@').map((s, i) => {
          const [action, expected] = s.split('||');
          return { step_no: i + 1, action: action || '', expected: expected || '' };
      }).filter(s => s.action || s.expected);
      
      const testData: TestCreate = {
          name: row.name,
          folderId,
          description: row.description || '',
          steps,
          labels: (row.labels || '').split(',').map(l => l.trim()).filter(Boolean),
          priority: Object.values(Priority).includes(row.priority as Priority) ? row.priority as Priority : Priority.P2,
          affectedObjectType: row.affectedObjectType,
          testMethod: row.testMethod,
          estimated_duration_sec: parseInt(row.estimated_duration_sec, 10) || 60,
          map: row.map,
          configuration: row.configuration
      };

      const existingTest = tests.find(t => t.id === row.id);
      if (existingTest) {
          updatedTests.push({ id: existingTest.id, data: testData });
      } else {
          newTests.push(testData);
      }
    });

    if (errors.length > 0) {
      setImportStatus({ message: `Import failed with ${errors.length} errors:\n${errors.slice(0, 5).join('\n')}`, error: true });
      return;
    }

    if (newTests.length === 0 && updatedTests.length === 0) {
      const message = skippedTests.length > 0 
        ? `No tests to import. All ${skippedTests.length} tests were skipped:\n${skippedTests.slice(0, 5).map(s => `Row ${s.row}: ${s.reason}`).join('\n')}${skippedTests.length > 5 ? '\n...' : ''}`
        : 'No tests to import.';
      setImportStatus({ message, error: true });
      return;
    }

    setImportStatus({ message: `Importing ${newTests.length} new tests and updating ${updatedTests.length} tests...` });

    // Use Promise.allSettled to handle errors gracefully and continue processing
    // Process both creates and updates concurrently for better performance
    const allResults = await Promise.allSettled([
      ...newTests.map(t => createTest(t)),
      ...updatedTests.map(t => updateTest(t.id, t.data))
    ]);
    
    // Separate results by operation type
    const createResults = allResults.slice(0, newTests.length);
    const updateResults = allResults.slice(newTests.length);
    
    // Count successes and failures
    const createSuccess = createResults.filter(r => r.status === 'fulfilled').length;
    const createFailed = createResults.filter(r => r.status === 'rejected').length;
    const updateSuccess = updateResults.filter(r => r.status === 'fulfilled').length;
    const updateFailed = updateResults.filter(r => r.status === 'rejected').length;

    // Add newly created folders to the state after tests are successfully processed
    // This ensures folders are only added if there's actual progress
    if (newFolders.length > 0 && (createSuccess > 0 || updateSuccess > 0)) {
      setFolders(prev => [...prev, ...newFolders]);
    }

    // Collect error details
    const failedDetails: string[] = [];
    createResults.forEach((result, index) => {
      if (result.status === 'rejected') {
        failedDetails.push(`Create test "${newTests[index].name}": ${getErrorMessage(result.reason)}`);
      }
    });
    updateResults.forEach((result, index) => {
      if (result.status === 'rejected') {
        failedDetails.push(`Update test "${updatedTests[index].data.name}": ${getErrorMessage(result.reason)}`);
      }
    });
    
    // Build result message
    let resultMessage = 'Import completed:\n';
    if (newFolders.length > 0) resultMessage += `✓ ${newFolders.length} folders created\n`;
    if (createSuccess > 0) resultMessage += `✓ ${createSuccess} tests created\n`;
    if (updateSuccess > 0) resultMessage += `✓ ${updateSuccess} tests updated\n`;
    if (skippedTests.length > 0) resultMessage += `⚠ ${skippedTests.length} tests skipped\n`;
    if (createFailed > 0 || updateFailed > 0) {
      resultMessage += `✗ ${createFailed + updateFailed} tests failed\n`;
      resultMessage += '\nFailure details:\n' + failedDetails.slice(0, MAX_DISPLAYED_ERRORS).join('\n');
      if (failedDetails.length > MAX_DISPLAYED_ERRORS) resultMessage += `\n... and ${failedDetails.length - MAX_DISPLAYED_ERRORS} more errors`;
    }
    
    const hasErrors = createFailed > 0 || updateFailed > 0 || skippedTests.length > 0;
    setImportStatus({ message: resultMessage, error: hasErrors });
  
    // After import, select the root folder to ensure imported tests are visible.
    const rootFolder = folders.find(f => !f.parentId);
    setSelectedFolderId(rootFolder ? rootFolder.id : (folders[0]?.id || null));
  };


  return (
    <div className="flex h-full">
        {permissions.canEditLibrary && editingTest && (
            <TestEditorModal 
                test={editingTest} 
                onClose={() => setEditingTest(null)}
                onSave={handleSaveTest}
            />
        )}
        {permissions.canEditLibrary && isBulkEditModalOpen && (
            <BulkTestEditModal 
                count={selectedTestIds.size}
                onClose={() => setIsBulkEditModalOpen(false)}
                onSave={handleBulkEditSave}
            />
        )}
        {isImportModalOpen && importStatus && (
            <ImportStatusModal status={importStatus} onClose={() => setIsImportModalOpen(false)} />
        )}
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".csv" style={{ display: 'none' }} />

        <aside 
            className={`bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-200 ${isSidebarCollapsed ? 'p-2' : 'p-4'}`}
            style={{ width: isSidebarCollapsed ? '48px' : `${sidebarWidth}px` }}
        >
            <div className={`flex items-center mb-4 ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
                {!isSidebarCollapsed && <h2 className="text-lg font-semibold whitespace-nowrap">Test Library</h2>}
                 <div className="flex items-center">
                    {!isSidebarCollapsed && (
                    <>
                        <button onClick={expandAllFolders} title="Expand All" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                            <ExpandAllIcon className="w-5 h-5" />
                        </button>
                        <button onClick={collapseAllFolders} title="Collapse All" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                            <CollapseAllIcon className="w-5 h-5" />
                        </button>
                    </>
                    )}
                    <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    title={isSidebarCollapsed ? "Expand Test Library" : "Collapse Test Library"}
                    className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ml-2"
                    >
                        <ChevronLeftIcon className={`w-5 h-5 transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                </div>
            </div>
            {!isSidebarCollapsed && (
                <div className="flex-1 overflow-y-auto">
                    <FolderTree 
                        folders={folderTree} 
                        selectedFolderId={selectedFolderId} 
                        onSelectFolder={setSelectedFolderId} 
                        onDropTest={handleDropTest}
                        onDropFolder={handleDropFolder}
                        onDeleteFolder={handleDeleteFolder}
                        expandedFolders={expandedFolders}
                        onToggleFolder={toggleFolder}
                        canEdit={permissions.canEditLibrary}
                    />
                </div>
            )}
        </aside>

        {!isSidebarCollapsed && (
             <div 
                className={`w-1.5 flex-shrink-0 ${permissions.canEditLibrary ? 'cursor-col-resize bg-gray-200 dark:bg-gray-800 hover:bg-blue-accent' : ''}`}
                onMouseDown={handleMouseDown}
            />
        )}

        <main className="flex-1 flex flex-col p-6 overflow-hidden">
            <header className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                    <input 
                        type="search" 
                        placeholder="Search tests by name, label, etc..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-96 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-accent focus:outline-none"
                    />
                    <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                        <input 
                            type="checkbox"
                            checked={showArchived}
                            onChange={(e) => setShowArchived(e.target.checked)}
                            className="h-4 w-4 bg-gray-200 dark:bg-gray-700 border-gray-400 dark:border-gray-600 rounded text-blue-accent focus:ring-blue-accent"
                        />
                        <span>Show Archived</span>
                    </label>
                </div>
                <div className="flex items-center space-x-2">
                    {selectedTestIds.size > 0 && (
                        <>
                            <button 
                                onClick={() => onStartReview(Array.from(selectedTestIds))}
                                className="flex items-center text-sm px-3 py-1.5 rounded-md bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/50"
                            >
                                <ReviewIcon className="w-4 h-4 mr-2" />
                                Review ({selectedTestIds.size})
                            </button>
                            {permissions.canEditLibrary && (
                                <button 
                                    onClick={() => setIsBulkEditModalOpen(true)}
                                    className="px-3 py-1.5 text-sm rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                                >
                                    Bulk Edit ({selectedTestIds.size})
                                </button>
                            )}
                        </>
                    )}
                    {permissions.canEditLibrary && (
                        <>
                            <button 
                                onClick={handleImportClick}
                                title="Import tests from a CSV file"
                                className="flex items-center text-sm px-3 py-1.5 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                            >
                                <UploadIcon className="w-4 h-4 mr-2" />
                                Import
                            </button>
                            <button 
                                onClick={handleExportCSV}
                                title="Export all tests to a CSV file"
                                className="flex items-center text-sm px-3 py-1.5 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                            >
                                <DownloadIcon className="w-4 h-4 mr-2" />
                                Export
                            </button>
                            <button 
                                onClick={() => setEditingTest({})}
                                className="flex items-center bg-blue-accent text-white px-4 py-1.5 rounded-md hover:bg-blue-600 transition-colors"
                            >
                                <PlusIcon className="w-5 h-5 mr-2" />
                                New Test
                            </button>
                        </>
                    )}
                </div>
            </header>
            <TestList 
                tests={filteredTests}
                onEdit={setEditingTest}
                onArchive={handleArchiveTest}
                onDuplicate={handleDuplicateTest}
                selectedTestIds={selectedTestIds}
                onSelectTest={handleSelectTest}
                onSelectAllTests={handleSelectAllTests}
                canEdit={permissions.canEditLibrary}
            />
        </main>
    </div>
  );
};

export default TestLibraryView;