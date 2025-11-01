import React, { useState, useMemo, useCallback, useEffect } from 'react';
// Fix: Imported 'Folder' type to resolve reference error.
import { Cycle, Test, CycleItem, CycleItemResult, User, CycleStatus, Scope, ScopeName, Priority, Folder } from '../types';
import { useData } from './DataContext';
import { buildFolderTree } from '../data/mockData';
import FolderTree from './FolderTree';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';
import { SaveIcon } from './icons/SaveIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { StopCircleIcon } from './icons/StopCircleIcon';
import { ClockIcon } from './icons/ClockIcon';

const PriorityBadge: React.FC<{ priority: Priority }> = ({ priority }) => {
    const styles = {
        [Priority.P0]: 'bg-red-500 border-red-500',
        [Priority.P1]: 'bg-orange-500 border-orange-500',
        [Priority.P2]: 'bg-yellow-500 border-yellow-500',
        [Priority.P3]: 'bg-blue-500 border-blue-500',
    };
    return <span className={`px-2 py-0.5 text-xs font-semibold text-white rounded-full border ${styles[priority]}`}>{priority}</span>
}


const AddTestsModal: React.FC<{
  onClose: () => void;
  onAddTests: (tests: Test[], maps: string[], configs: string[]) => void;
  existingTestCounts: Map<string, number>;
}> = ({ onClose, onAddTests, existingTestCounts }) => {
  const { tests, folders, maps, configurations } = useData();
  const [selectedTests, setSelectedTests] = useState<Map<string, Test>>(new Map());
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(folders.map(f => f.id)));
  const [selectedMaps, setSelectedMaps] = useState<string[]>([]);
  const [selectedConfigs, setSelectedConfigs] = useState<string[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(folders[0]?.id || null);

  const folderTreeForNav = useMemo(() => buildFolderTree(folders, []), [folders]);

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
    
    if (searchTerm) {
        const lowercasedFilter = searchTerm.toLowerCase();
        testsToShow = testsToShow.filter(test => 
            test.name.toLowerCase().includes(lowercasedFilter) ||
            test.labels.some(label => label.toLowerCase().includes(lowercasedFilter))
        );
    }
    return testsToShow;
  }, [tests, selectedFolderId, searchTerm, folders, getAllChildFolderIds]);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) newSet.delete(folderId);
      else newSet.add(folderId);
      return newSet;
    });
  };

  const handleSelectTest = (test: Test) => {
    setSelectedTests(prev => {
      const newMap = new Map(prev);
      if (newMap.has(test.id)) newMap.delete(test.id);
      else newMap.set(test.id, test);
      return newMap;
    });
  };

  const handleSelectAllVisible = () => {
    const testsToToggle = filteredTests;
    const allVisibleSelected = testsToToggle.length > 0 && testsToToggle.every(t => selectedTests.has(t.id));

    setSelectedTests(prev => {
      const newMap = new Map(prev);
      if (allVisibleSelected) {
        testsToToggle.forEach(t => newMap.delete(t.id));
      } else {
        testsToToggle.forEach(t => newMap.set(t.id, t));
      }
      return newMap;
    });
  };

  const handleSubmit = () => {
    onAddTests(Array.from(selectedTests.values()), selectedMaps, selectedConfigs);
    onClose();
  };
  
  const handleMultiSelectChange = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = [...e.target.selectedOptions].map(option => option.value);
    setter(options);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onMouseDown={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col" onMouseDown={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold">Add Tests from Library</h2>
        </div>
        <div className="flex-1 flex overflow-hidden">
          <aside className="w-1/3 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
            <FolderTree
              folders={folderTreeForNav}
              selectedFolderId={selectedFolderId}
              onSelectFolder={setSelectedFolderId}
              onDropTest={() => {}}
              onDropFolder={() => {}}
              expandedFolders={expandedFolders}
              onToggleFolder={toggleFolder}
              isCycleBuilder={false} // Use standard navigation behavior
            />
          </aside>
          <main className="w-2/3 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <input 
                type="search"
                placeholder="Search tests in selected folder..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-accent focus:outline-none"
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm z-10">
                  <tr>
                    <th className="p-2 w-12">
                      <input
                        type="checkbox"
                        onChange={handleSelectAllVisible}
                        ref={el => {
                            if (!el) return;
                            const selectableTests = filteredTests;
                            if (selectableTests.length === 0) {
                                el.checked = false;
                                el.indeterminate = false;
                                return;
                            }
                            const numSelected = selectableTests.filter(t => selectedTests.has(t.id)).length;
                            el.checked = numSelected === selectableTests.length;
                            el.indeterminate = numSelected > 0 && numSelected < selectableTests.length;
                        }}
                        className="h-4 w-4 bg-gray-200 dark:bg-gray-700 border-gray-400 dark:border-gray-600 rounded text-blue-accent focus:ring-blue-accent ml-3"
                      />
                    </th>
                    <th className="p-2 text-sm font-semibold text-gray-500 dark:text-gray-400">Name</th>
                    <th className="p-2 text-sm font-semibold text-gray-500 dark:text-gray-400">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {filteredTests.map(test => {
                    const isSelected = selectedTests.has(test.id);
                    const countInCycle = existingTestCounts.get(test.id) || 0;
                    return (
                      <tr
                        key={test.id}
                        onClick={() => handleSelectTest(test)}
                        className={`border-b border-gray-200/50 dark:border-gray-700/50 ${isSelected ? 'bg-blue-accent/20' : ''} cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-800/50`}
                      >
                        <td className="p-2 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            className="h-4 w-4 bg-gray-200 dark:bg-gray-700 border-gray-400 dark:border-gray-600 rounded text-blue-accent focus:ring-blue-accent ml-3"
                          />
                        </td>
                        <td className="p-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                          {test.name}
                          {countInCycle > 0 && <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 font-normal">in cycle ({countInCycle})</span>}
                        </td>
                        <td className="p-2"><PriorityBadge priority={test.priority} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </main>
        </div>
        <div className="flex justify-between items-center space-x-3 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-b-lg">
          <div className="flex gap-4">
              <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Add for Maps</label>
                  <select multiple onChange={handleMultiSelectChange(setSelectedMaps)} className="mt-1 w-48 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-accent focus:border-blue-accent text-sm">
                      {maps.map(map => <option key={map} value={map}>{map}</option>)}
                  </select>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Add for Configurations</label>
                  <select multiple onChange={handleMultiSelectChange(setSelectedConfigs)} className="mt-1 w-48 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-accent focus:border-blue-accent text-sm">
                      {configurations.map(config => <option key={config} value={config}>{config}</option>)}
                  </select>
              </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500 dark:text-gray-400 self-center">{selectedTests.size} tests selected</span>
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100">Cancel</button>
            <button type="button" onClick={handleSubmit} className="px-4 py-2 rounded-md bg-blue-accent hover:bg-blue-600 text-white" disabled={selectedTests.size === 0}>Add Tests</button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface BulkCycleItemChanges {
  assigneeId?: string | null;
  result?: CycleItemResult;
  map?: string;
  configuration?: string;
}

const BulkCycleItemEditModal: React.FC<{
  onClose: () => void;
  onSave: (changes: BulkCycleItemChanges) => void;
  count: number;
}> = ({ onClose, onSave, count }) => {
  const { users, maps, configurations } = useData();
  const [updates, setUpdates] = useState<BulkCycleItemChanges>(() => ({
    assigneeId: null,
    result: CycleItemResult.NOT_RUN,
    map: '',
    configuration: '',
  }));
  const [enabledFields, setEnabledFields] = useState<Set<keyof BulkCycleItemChanges>>(new Set());

  const handleToggleField = (field: keyof BulkCycleItemChanges) => {
    setEnabledFields(prev => {
      const newSet = new Set(prev);
      if (newSet.has(field)) newSet.delete(field);
      else newSet.add(field);
      return newSet;
    });
  };

  const handleSubmit = () => {
    const finalChanges: BulkCycleItemChanges = {};
    
    if (enabledFields.has('assigneeId')) {
      finalChanges.assigneeId = updates.assigneeId;
    }
    if (enabledFields.has('result')) {
      finalChanges.result = updates.result;
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
  
  const renderField = (field: keyof BulkCycleItemChanges, label: string, children: React.ReactElement<any>) => (
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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onMouseDown={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg text-gray-900 dark:text-white" onMouseDown={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Bulk Edit {count} Items</h2>
            <div className="space-y-4">
            {renderField('assigneeId', 'Assignee', 
                    <select value={updates.assigneeId || ''} onChange={e => setUpdates(p => ({...p, assigneeId: e.target.value || null}))} className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2">
                        <option value="">Unassigned</option>
                        {users.map(u => <option key={u.id} value={u.id}>{u.displayName}</option>)}
                    </select>
                )}
                {renderField('result', 'Result', 
                    <select value={updates.result || CycleItemResult.NOT_RUN} onChange={e => setUpdates(p => ({...p, result: e.target.value as CycleItemResult}))} className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2">
                        {Object.values(CycleItemResult).map(r => <option key={r} value={r} className="capitalize">{r.replace(/_/g, ' ')}</option>)}
                    </select>
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
        </div>
    </div>
  );
};


const CycleProgress: React.FC<{ items: CycleItem[] }> = ({ items }) => {
    const total = items.length;
    if (total === 0) return <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5"></div>;
  
    const getCount = (result: CycleItemResult) => items.filter(i => i.result === result).length;
    
    const passed = getCount(CycleItemResult.PASSED);
    const failed = getCount(CycleItemResult.FAILED);
    const blocked = getCount(CycleItemResult.BLOCKED);
    const notRun = total - passed - failed - blocked;
  
    return (
        <div className="flex w-full h-2.5 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700" title={`Passed: ${passed}, Failed: ${failed}, Blocked: ${blocked}, Not Run: ${notRun}`}>
          <div className="bg-green-500" style={{ width: `${(passed / total) * 100}%` }}></div>
          <div className="bg-red-500" style={{ width: `${(failed / total) * 100}%` }}></div>
          <div className="bg-yellow-500" style={{ width: `${(blocked / total) * 100}%` }}></div>
        </div>
    );
};


const getResultColorClass = (result: CycleItemResult) => {
    switch (result) {
        case CycleItemResult.PASSED: return 'text-green-600 dark:text-green-400 font-medium';
        case CycleItemResult.FAILED: return 'text-red-600 dark:text-red-400 font-medium';
        case CycleItemResult.BLOCKED: return 'text-yellow-600 dark:text-yellow-400 font-medium';
        case CycleItemResult.NOT_RUN:
        default:
            return 'text-gray-600 dark:text-gray-400';
    }
};

// Main Component
const CycleBuilder: React.FC<{
  cycle: Cycle;
  onBack: () => void;
  onUpdateCycle: (cycle: Cycle) => void;
}> = ({ cycle, onBack, onUpdateCycle }) => {
    const { cycleItems, setCycleItems, users, scopes, setScopes, tests, maps, configurations } = useData();
    const [editingCycle, setEditingCycle] = useState<Cycle>(cycle);
    const [isAddTestModalOpen, setIsAddTestModalOpen] = useState(false);
    const [isBulkEditModalOpen, setIsBulkEditModalOpen] = useState(false);
    const [groupBy, setGroupBy] = useState('none');
    const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(new Set());
    const [lastSelectedItemId, setLastSelectedItemId] = useState<string | null>(null);

    const cycleScopes = useMemo(() => scopes.filter(s => s.cycleId === cycle.id), [scopes, cycle.id]);
    const [selectedScopeId, setSelectedScopeId] = useState<string | null>(cycleScopes[0]?.id || null);

    const itemsInCurrentScope = useMemo(() =>
        cycleItems
            .filter(item => item.cycleId === cycle.id && item.scopeId === selectedScopeId)
            .map(item => ({...item, test: tests.find(t => t.id === item.testId)}))
            .filter(item => item.test) // Ensure test exists
    , [cycleItems, cycle.id, selectedScopeId, tests]);
    
    const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditingCycle(prev => ({ ...prev, [name]: value }));
    };

    const handleLabelsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingCycle(prev => ({...prev, labels: e.target.value.split(',').map(l => l.trim())}));
    }

    const handleMapsInfoChange = (index: number, field: 'mapName' | 'link', value: string) => {
        const newMapsInfo = [...(editingCycle.mapsInfo || [])];
        newMapsInfo[index] = { ...newMapsInfo[index], [field]: value };
        setEditingCycle(prev => ({ ...prev, mapsInfo: newMapsInfo }));
    };

    const addMapInfo = () => {
        const newMapsInfo = [...(editingCycle.mapsInfo || []), { mapName: '', link: '' }];
        setEditingCycle(prev => ({ ...prev, mapsInfo: newMapsInfo }));
    };

    const removeMapInfo = (index: number) => {
        const newMapsInfo = (editingCycle.mapsInfo || []).filter((_, i) => i !== index);
        setEditingCycle(prev => ({ ...prev, mapsInfo: newMapsInfo }));
    };

    const handleSaveDetails = () => {
        onUpdateCycle(editingCycle);
    };

    const handleAddScope = () => {
        const newScope: Scope = {
            id: `s-${Date.now()}`,
            cycleId: cycle.id,
            name: ScopeName.NONE,
        };
        setScopes(prev => [...prev, newScope]);
        setSelectedScopeId(newScope.id);
    };
    
    const handleUpdateScope = (scopeId: string, updates: Partial<Scope>) => {
        setScopes(prev => prev.map(s => s.id === scopeId ? {...s, ...updates} : s));
    };

    const handleDeleteScope = (scopeId: string) => {
        if (window.confirm("Are you sure you want to delete this scope and all its tests? This action cannot be undone.")) {
            setScopes(prev => prev.filter(s => s.id !== scopeId));
            setCycleItems(prev => prev.filter(item => item.scopeId !== scopeId));
            if (selectedScopeId === scopeId) {
                const remainingScopes = scopes.filter(s => s.cycleId === cycle.id && s.id !== scopeId);
                setSelectedScopeId(remainingScopes[0]?.id || null);
            }
        }
    };

    const handleAddTests = (testsToAdd: Test[], mapsToAdd: string[], configsToAdd: string[]) => {
        if (!selectedScopeId) return;

        let combinations: { map: string | null; config: string | null }[] = [];
        if (mapsToAdd.length === 0 && configsToAdd.length === 0) {
            combinations.push({ map: null, config: null });
        } else if (mapsToAdd.length > 0 && configsToAdd.length === 0) {
            combinations = mapsToAdd.map(map => ({ map, config: null }));
        } else if (mapsToAdd.length === 0 && configsToAdd.length > 0) {
            combinations = configsToAdd.map(config => ({ map: null, config }));
        } else {
            mapsToAdd.forEach(map => {
                configsToAdd.forEach(config => {
                    combinations.push({ map, config });
                });
            });
        }
    
        const newItems: CycleItem[] = testsToAdd.flatMap(test =>
            combinations.map(({ map, config }) => ({
                id: `ci-${Date.now()}-${test.id}-${map}-${config}-${Math.random().toString(36).substring(2, 9)}`,
                cycleId: cycle.id,
                scopeId: selectedScopeId,
                testId: test.id,
                testSnapshot: { name: test.name, steps: test.steps, labels: test.labels },
                assigneeId: null,
                result: CycleItemResult.NOT_RUN,
                updatedAt: new Date().toLocaleDateString(),
                map: map ?? test.map ?? null,
                configuration: config ?? test.configuration ?? null,
            }))
        );

        setCycleItems(prev => [...prev, ...newItems]);
    };

    const handleUpdateItem = (itemId: string, updates: Partial<CycleItem>) => {
        setCycleItems(prev => prev.map(item => item.id === itemId ? { ...item, ...updates } : item));
    }

    const handleRemoveItem = (itemId: string) => {
        setCycleItems(prev => prev.filter(item => item.id !== itemId));
    };
    
    const groupedItems = useMemo(() => {
        if (groupBy === 'none') return null;
    
        const groups = itemsInCurrentScope.reduce((acc, item) => {
            let key: string;
    
            switch (groupBy) {
                case 'assignee': {
                    const user = users.find(u => u.id === item.assigneeId);
                    key = user ? user.displayName : 'Unassigned';
                    break;
                }
                case 'result':
                    key = item.result.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    break;
                case 'map':
                    key = item.map || 'No Map';
                    break;
                case 'configuration':
                    key = item.configuration || 'No Configuration';
                    break;
                case 'affectedObjectType':
                    key = item.test.affectedObjectType || 'No Affected Object';
                    break;
                default:
                    key = 'Unknown Group'; // Fallback
                    break;
            }
    
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {} as Record<string, typeof itemsInCurrentScope>);
    
        return Object.entries(groups).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    }, [itemsInCurrentScope, groupBy, users]);

    const displayedItems = useMemo(() => {
        return groupedItems ? groupedItems.flatMap(([, items]) => items) : itemsInCurrentScope;
    }, [groupedItems, itemsInCurrentScope]);

    const handleSelectItem = (itemId: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const isShiftPressed = (event.nativeEvent as MouseEvent).shiftKey;

        if (isShiftPressed && lastSelectedItemId) {
            const newSelectedIds = new Set(selectedItemIds);
            const lastIndex = displayedItems.findIndex(i => i.id === lastSelectedItemId);
            const currentIndex = displayedItems.findIndex(i => i.id === itemId);

            if (lastIndex !== -1 && currentIndex !== -1) {
                const start = Math.min(lastIndex, currentIndex);
                const end = Math.max(lastIndex, currentIndex);
                for (let i = start; i <= end; i++) {
                    newSelectedIds.add(displayedItems[i].id);
                }
                setSelectedItemIds(newSelectedIds);
            }
        } else {
             setSelectedItemIds(prev => {
                const newSet = new Set(prev);
                if (newSet.has(itemId)) {
                    newSet.delete(itemId);
                } else {
                    newSet.add(itemId);
                }
                return newSet;
            });
            setLastSelectedItemId(itemId);
        }
    };

    const handleSelectAllItems = () => {
        if (selectedItemIds.size === itemsInCurrentScope.length) {
            setSelectedItemIds(new Set());
        } else {
            setSelectedItemIds(new Set(itemsInCurrentScope.map(item => item.id)));
        }
    };
    
    const handleSelectGroup = (groupItems: {id: string}[]) => {
        const groupItemIds = groupItems.map(item => item.id);
        const allSelected = groupItemIds.every(id => selectedItemIds.has(id));

        if (allSelected) {
            setSelectedItemIds(prev => {
                const newSet = new Set(prev);
                groupItemIds.forEach(id => newSet.delete(id));
                return newSet;
            });
        } else {
            setSelectedItemIds(prev => new Set([...prev, ...groupItemIds]));
        }
    };

    const handleBulkEditSave = (changes: BulkCycleItemChanges) => {
        setCycleItems(prev => prev.map(item => 
            selectedItemIds.has(item.id) ? { ...item, ...changes, updatedAt: new Date().toLocaleDateString() } : item
        ));
        setIsBulkEditModalOpen(false);
        setSelectedItemIds(new Set());
    };

    const handleBulkStatusChange = (result: CycleItemResult) => {
        if (selectedItemIds.size === 0) return;
        setCycleItems(prev =>
            prev.map(item =>
                selectedItemIds.has(item.id) ? { ...item, result: result, updatedAt: new Date().toLocaleDateString() } : item
            )
        );
        setSelectedItemIds(new Set());
        setLastSelectedItemId(null);
    };

    const allUsers = useMemo(() => [{ id: '', displayName: 'Unassigned', email: '' }, ...users], [users]);
    
    const existingTestCountsInScope = useMemo(() => {
        return itemsInCurrentScope.reduce((acc, item) => {
            acc.set(item.testId, (acc.get(item.testId) || 0) + 1);
            return acc;
        }, new Map<string, number>());
      }, [itemsInCurrentScope]);

    return (
        <div className="flex flex-col h-full p-6 overflow-hidden">
            <datalist id="maps-datalist">
                {maps.map(map => <option key={map} value={map} />)}
            </datalist>
            <datalist id="configurations-datalist">
                {configurations.map(config => <option key={config} value={config} />)}
            </datalist>
             {isAddTestModalOpen && (
                <AddTestsModal 
                    onClose={() => setIsAddTestModalOpen(false)} 
                    onAddTests={handleAddTests}
                    existingTestCounts={existingTestCountsInScope}
                />
            )}
            {isBulkEditModalOpen && (
                <BulkCycleItemEditModal
                    count={selectedItemIds.size}
                    onClose={() => setIsBulkEditModalOpen(false)}
                    onSave={handleBulkEditSave}
                />
            )}
            <header className="flex-shrink-0 mb-4">
                <div className="flex items-center mb-2">
                     <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-2">
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold truncate" title={cycle.name}>{cycle.name}</h1>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>Total Tests: {itemsInCurrentScope.length}</span>
                    <div className="w-1/3">
                        <CycleProgress items={itemsInCurrentScope} />
                    </div>
                </div>
            </header>
            
            <details className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4 mb-4 flex-shrink-0">
                <summary className="font-semibold cursor-pointer">Cycle Details</summary>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Description</label>
                        <textarea name="description" value={editingCycle.description} onChange={handleDetailsChange} rows={3} className="mt-1 w-full text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"></textarea>
                    </div>
                     <div className="grid grid-rows-3 gap-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Version</label>
                            <input type="text" name="version" value={editingCycle.version || ''} onChange={handleDetailsChange} className="w-full text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Ref Version</label>
                            <input type="text" name="refVersion" value={editingCycle.refVersion || ''} onChange={handleDetailsChange} className="w-full text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Labels</label>
                            <input type="text" value={(editingCycle.labels || []).join(', ')} onChange={handleLabelsChange} className="w-full text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"/>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Map Links</label>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {(editingCycle.mapsInfo || []).map((info, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input type="text" list="maps-datalist" placeholder="Map Name" value={info.mapName} onChange={e => handleMapsInfoChange(index, 'mapName', e.target.value)} className="w-1/3 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1"/>
                                    <input type="text" placeholder="URL" value={info.link} onChange={e => handleMapsInfoChange(index, 'link', e.target.value)} className="flex-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1"/>
                                    <button onClick={() => removeMapInfo(index)} className="text-gray-400 hover:text-red-500"><TrashIcon className="w-4 h-4"/></button>
                                </div>
                            ))}
                        </div>
                        <button onClick={addMapInfo} className="text-sm text-blue-500 hover:underline mt-2">Add Map Link</button>
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={handleSaveDetails} className="flex items-center bg-blue-accent text-white px-4 py-1.5 rounded-md hover:bg-blue-600 transition-colors text-sm">
                        <SaveIcon className="w-4 h-4 mr-2"/>
                        Save Details
                    </button>
                </div>
            </details>

            <div className="border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <nav className="-mb-px flex space-x-2 items-center">
                    {cycleScopes.map(scope => (
                        <div key={scope.id} onClick={() => setSelectedScopeId(scope.id)} className={`group relative flex items-center cursor-pointer py-3 px-1 border-b-2 ${selectedScopeId === scope.id ? 'border-blue-accent' : 'border-transparent hover:border-gray-300'}`}>
                           <select
                                value={scope.name}
                                onChange={(e) => handleUpdateScope(scope.id, { name: e.target.value as ScopeName })}
                                onClick={(e) => e.stopPropagation()}
                                className={`bg-transparent font-medium text-sm focus:outline-none appearance-none cursor-pointer ${selectedScopeId === scope.id ? 'text-blue-accent' : 'text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200'}`}
                            >
                                {Object.values(ScopeName).map(name => <option key={name} value={name}>{name}</option>)}
                            </select>
                            {cycleScopes.length > 1 && (
                                <button onClick={(e) => { e.stopPropagation(); handleDeleteScope(scope.id); }} className="ml-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" title="Delete Scope">
                                    <TrashIcon className="w-3 h-3"/>
                                </button>
                            )}
                        </div>
                    ))}
                    <button onClick={handleAddScope} className="flex items-center text-sm text-blue-500 hover:underline py-3 px-1">
                        <PlusIcon className="w-4 h-4 mr-1" /> Add Scope
                    </button>
                </nav>
            </div>
            
            <div className="flex items-center justify-between py-2 flex-shrink-0">
                 <div className="flex items-center gap-4">
                    <div className="flex items-center">
                        <label htmlFor="group-by" className="text-sm font-medium mr-2">Group by:</label>
                        <select id="group-by" value={groupBy} onChange={e => setGroupBy(e.target.value)} className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm">
                            <option value="none">None</option>
                            <option value="result">Result</option>
                            <option value="assignee">Assignee</option>
                            <option value="map">Map</option>
                            <option value="configuration">Configuration</option>
                            <option value="affectedObjectType">Affected Object</option>
                        </select>
                    </div>
                     {selectedItemIds.size > 0 && (
                        <div className="flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded-md p-0.5">
                            <button onClick={() => setIsBulkEditModalOpen(true)} className="px-3 py-1 text-sm rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                               Bulk Edit ({selectedItemIds.size})
                            </button>
                            <div className="h-5 w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>
                             <button onClick={() => handleBulkStatusChange(CycleItemResult.PASSED)} title="Mark as Passed" className="p-1 rounded-md hover:bg-green-100 dark:hover:bg-green-900/50">
                                <CheckCircleIcon className="w-5 h-5 text-green-500"/>
                            </button>
                            <button onClick={() => handleBulkStatusChange(CycleItemResult.FAILED)} title="Mark as Failed" className="p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-900/50">
                                <XCircleIcon className="w-5 h-5 text-red-500"/>
                            </button>
                            <button onClick={() => handleBulkStatusChange(CycleItemResult.BLOCKED)} title="Mark as Blocked" className="p-1 rounded-md hover:bg-yellow-100 dark:hover:bg-yellow-900/50">
                                <StopCircleIcon className="w-5 h-5 text-yellow-500"/>
                            </button>
                            <button onClick={() => handleBulkStatusChange(CycleItemResult.NOT_RUN)} title="Mark as Not Run" className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                                <ClockIcon className="w-5 h-5 text-gray-500 dark:text-gray-400"/>
                            </button>
                         </div>
                    )}
                </div>
                <button onClick={() => setIsAddTestModalOpen(true)} className="flex items-center bg-blue-accent text-white px-4 py-1.5 rounded-md hover:bg-blue-600 transition-colors text-sm">
                    <PlusIcon className="w-4 h-4 mr-2" /> Add Tests from Library
                </button>
            </div>

            <div className="flex-1 overflow-y-auto border-t border-gray-200 dark:border-gray-700">
                <table className="w-full text-left">
                   <thead className="sticky top-0 bg-gray-50 dark:bg-gray-950 z-10">
                        <tr>
                            <th className="p-2 w-10"><input type="checkbox" onChange={handleSelectAllItems} checked={itemsInCurrentScope.length > 0 && selectedItemIds.size === itemsInCurrentScope.length} className="h-4 w-4 bg-gray-200 dark:bg-gray-700 border-gray-400 dark:border-gray-600 rounded text-blue-accent focus:ring-blue-accent"/></th>
                            <th className="p-2 text-sm font-semibold text-gray-500 dark:text-gray-400 w-2/5">Test Name</th>
                            <th className="p-2 text-sm font-semibold text-gray-500 dark:text-gray-400">Assignee</th>
                            <th className="p-2 text-sm font-semibold text-gray-500 dark:text-gray-400">Map</th>
                            <th className="p-2 text-sm font-semibold text-gray-500 dark:text-gray-400">Config</th>
                            <th className="p-2 text-sm font-semibold text-gray-500 dark:text-gray-400">Result</th>
                            <th className="p-2 text-sm font-semibold text-gray-500 dark:text-gray-400">Actions</th>
                        </tr>
                   </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {groupedItems ? (
                           groupedItems.map(([groupName, items]) => {
                                const groupItemIds = items.map(i => i.id);
                                const allSelectedInGroup = groupItemIds.length > 0 && groupItemIds.every(id => selectedItemIds.has(id));
                                const someSelectedInGroup = groupItemIds.some(id => selectedItemIds.has(id));
                               return (
                                   <React.Fragment key={groupName}>
                                       <tr className="bg-gray-100 dark:bg-gray-800 sticky top-10 z-[5]">
                                           <td colSpan={7} className="p-2 font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
                                               <div className="flex items-center">
                                                   <input
                                                       type="checkbox"
                                                       ref={el => {
                                                           if (el) { el.indeterminate = someSelectedInGroup && !allSelectedInGroup; }
                                                       }}
                                                       checked={allSelectedInGroup}
                                                       onChange={() => handleSelectGroup(items)}
                                                       className="h-4 w-4 bg-gray-200 dark:bg-gray-700 border-gray-400 dark:border-gray-600 rounded text-blue-accent focus:ring-blue-accent mr-3"
                                                   />
                                                   {groupName} ({items.length})
                                               </div>
                                           </td>
                                       </tr>
                                       {items.map(item => (
                                         <CycleTestRow key={item.id} item={item} allUsers={allUsers} onUpdateItem={handleUpdateItem} onRemoveItem={handleRemoveItem} onSelectItem={handleSelectItem} isSelected={selectedItemIds.has(item.id)} />
                                       ))}
                                   </React.Fragment>
                               )
                           })
                        ) : (
                            itemsInCurrentScope.map(item => (
                               <CycleTestRow key={item.id} item={item} allUsers={allUsers} onUpdateItem={handleUpdateItem} onRemoveItem={handleRemoveItem} onSelectItem={handleSelectItem} isSelected={selectedItemIds.has(item.id)} />
                            ))
                        )}
                         {itemsInCurrentScope.length === 0 && (
                            <tr><td colSpan={7} className="text-center p-8 text-gray-500">No tests in this scope.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const CycleTestRow: React.FC<{
    item: any;
    allUsers: User[];
    onUpdateItem: (id: string, updates: Partial<CycleItem>) => void;
    onRemoveItem: (id: string) => void;
    onSelectItem: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void;
    isSelected: boolean;
}> = ({ item, allUsers, onUpdateItem, onRemoveItem, onSelectItem, isSelected }) => (
    <tr className={isSelected ? 'bg-blue-accent/20' : 'hover:bg-gray-100/50 dark:hover:bg-gray-800/50'}>
        <td className="p-2"><input type="checkbox" checked={isSelected} onChange={(e) => onSelectItem(item.id, e)} className="h-4 w-4 bg-gray-200 dark:bg-gray-700 border-gray-400 dark:border-gray-600 rounded text-blue-accent focus:ring-blue-accent"/></td>
        <td className="p-2 font-medium text-sm text-gray-900 dark:text-gray-100">{item.testSnapshot.name}</td>
        <td className="p-2">
            <select
                value={item.assigneeId || ''}
                onChange={e => onUpdateItem(item.id, { assigneeId: e.target.value || null })}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm focus:ring-blue-accent focus:border-blue-accent"
            >
                {allUsers.map(user => <option key={user.id} value={user.id}>{user.displayName}</option>)}
            </select>
        </td>
        <td className="p-1">
            <input
                type="text"
                list="maps-datalist"
                value={item.map || ''}
                onChange={e => onUpdateItem(item.id, { map: e.target.value || null })}
                className="w-full bg-transparent text-sm p-1 rounded-md border border-transparent text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 focus:ring-1 focus:ring-blue-accent focus:border-blue-accent focus:bg-white dark:focus:bg-gray-700"
            />
        </td>
        <td className="p-1">
            <input
                type="text"
                list="configurations-datalist"
                value={item.configuration || ''}
                onChange={e => onUpdateItem(item.id, { configuration: e.target.value || null })}
                className="w-full bg-transparent text-sm p-1 rounded-md border border-transparent text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 focus:ring-1 focus:ring-blue-accent focus:border-blue-accent focus:bg-white dark:focus:bg-gray-700"
            />
        </td>
        <td className="p-2">
            <select
                value={item.result}
                onChange={e => onUpdateItem(item.id, { result: e.target.value as CycleItemResult })}
                className={`w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm focus:ring-blue-accent focus:border-blue-accent ${getResultColorClass(item.result)}`}
            >
                {Object.values(CycleItemResult).map(r => <option key={r} value={r} className="text-gray-900 dark:text-gray-100 capitalize">{r.replace(/_/g, ' ')}</option>)}
            </select>
        </td>
        <td className="p-2">
            <button onClick={() => onRemoveItem(item.id)} title="Remove test from cycle" className="text-gray-400 hover:text-red-500">
                <TrashIcon className="w-4 h-4" />
            </button>
        </td>
    </tr>
)

export default CycleBuilder;