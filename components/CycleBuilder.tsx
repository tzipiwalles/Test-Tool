
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Cycle, Test, CycleItem, CycleItemResult, User, CycleStatus, Scope, ScopeName, Priority, Folder, Permissions, UserRole, CycleMapInfo, UUID, Note, NoteParentType } from '../types';
import { useData } from './DataContext';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';
import { SaveIcon } from './icons/SaveIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { StopCircleIcon } from './icons/StopCircleIcon';
import { ClockIcon } from './icons/ClockIcon';
import EditableDatalistInput from './EditableDatalistInput';
import { ExpandAllIcon } from './icons/ExpandAllIcon';
import { CollapseAllIcon } from './icons/CollapseAllIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { NoteIcon } from './icons/NoteIcon';
import NotesPanel from './NotesPanel';
import NoteReviewView from './NoteReviewView';
import { ReviewIcon } from './icons/ReviewIcon';
import { BuilderIcon } from './icons/BuilderIcon';
import { PinIcon } from './icons/PinIcon';
import { PlayIcon } from './icons/PlayIcon';
import { CopyIcon } from './icons/CopyIcon';
import { EditIcon } from './icons/EditIcon';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';
import { LinkIcon } from './icons/editorIcons';
import { UploadIcon } from './icons/UploadIcon';
import { ExportIcon } from './icons/ExportIcon';
import * as api from '../lib/api';
// Fix: Imported FolderTree component to resolve "Cannot find name 'FolderTree'" error.
import FolderTree from './FolderTree';

// Helper to build the folder tree from a flat list
const buildFolderTree = (
  folders: Omit<Folder, 'children' | 'tests'>[],
  tests: Test[]
): Folder[] => {
  const folderMap = new Map<UUID, Folder>();
  const rootFolders: Folder[] = [];

  folders.forEach(f => {
    folderMap.set(f.id, { ...f, children: [], tests: [] });
  });

  tests.forEach(test => {
    const folder = folderMap.get(test.folderId);
    if (folder) {
      folder.tests.push(test);
    }
  });

  folders.forEach(f => {
    const folder = folderMap.get(f.id)!;
    if (f.parentId && folderMap.has(f.parentId)) {
      const parent = folderMap.get(f.parentId)!;
      if (!parent.children.some(child => child.id === folder.id)) {
        parent.children.push(folder);
      }
    } else {
      rootFolders.push(folder);
    }
  });

  return rootFolders;
};


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

const EditableLink: React.FC<{
  value: string | undefined;
  onChange: (value: string) => void;
  disabled: boolean;
}> = ({ value, onChange, disabled }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value || '');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setEditValue(value || '');
    }, [value]);
    
    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [isEditing]);

    const handleSave = () => {
        if (value !== editValue) {
            onChange(editValue);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditValue(value || '');
        setIsEditing(false);
    };

    const getUrlHostname = (url: string | undefined): string | null => {
        if (!url) return null;
        try {
            // Prepend https:// if no protocol is present, as URL constructor requires it.
            const fullUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
            const urlObject = new URL(fullUrl);
            // Return hostname, removing 'www.' if it exists for brevity
            return urlObject.hostname.replace(/^www\./, '');
        } catch (error) {
            // If it's not a valid URL, return a truncated version of the original string.
            return url.length > 30 ? `${url.substring(0, 27)}...` : url;
        }
    };
    const displayUrl = getUrlHostname(value);


    if (disabled) {
        return value ? (
            <div className="min-h-[30px] flex items-center">
                <a href={value} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-500 dark:text-blue-400 hover:underline truncate" title={value}>
                    <LinkIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{displayUrl || value}</span>
                </a>
            </div>
        ) : (
             <div className="min-h-[30px] flex items-center">
                <span className="text-gray-400 dark:text-gray-500 italic">No link</span>
            </div>
        );
    }

    if (isEditing) {
        return (
            <div className="flex items-center space-x-1">
                <input
                    ref={inputRef}
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSave();
                        if (e.key === 'Escape') handleCancel();
                    }}
                    className="w-full text-sm bg-white dark:bg-gray-800 border border-blue-accent rounded-md px-2 py-1"
                />
            </div>
        );
    }

    return (
        <div 
            className="group flex items-center justify-between w-full cursor-pointer min-h-[30px]" 
            onClick={() => setIsEditing(true)}
        >
            {value ? (
                <a href={value} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 flex-1 text-blue-500 dark:text-blue-400 hover:underline truncate" title={value}>
                    <LinkIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{displayUrl || value}</span>
                </a>
            ) : (
                <span className="flex-1 text-gray-400 dark:text-gray-500 italic">Add link...</span>
            )}
            <button onClick={(e) => { e.stopPropagation(); setIsEditing(true); }} className="p-1 rounded-md text-gray-400 opacity-0 group-hover:opacity-100 focus-within:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-700 focus:opacity-100">
                <EditIcon className="w-4 h-4" />
            </button>
        </div>
    );
};

const ConfirmationModal: React.FC<{
  title: string;
  message: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  confirmButtonClass?: string;
}> = ({ title, message, onConfirm, onCancel, confirmText = 'Confirm', confirmButtonClass = 'bg-blue-accent hover:bg-blue-600' }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in-down" style={{animationDuration: '0.2s'}} onMouseDown={onCancel}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md text-gray-900 dark:text-white" onMouseDown={e => e.stopPropagation()}>
        <div className="flex items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/50 sm:mx-0 sm:h-10 sm:w-10">
                <AlertTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-bold" id="modal-title">
                    {title}
                </h3>
                <div className="mt-2">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        {message}
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            onClick={onConfirm}
            className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-500 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-accent sm:mt-0 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const MultiSelectPills: React.FC<{
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  disabled?: boolean;
}> = ({ options, selected, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [listStyle, setListStyle] = useState<React.CSSProperties>({});

  const updateListPosition = useCallback(() => {
    if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setListStyle({
            position: 'fixed',
            top: `${rect.bottom + 2}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            zIndex: 1000,
        });
    }
  }, []);

  useEffect(() => {
      if (isOpen) {
          updateListPosition();
          window.addEventListener('resize', updateListPosition);
          window.addEventListener('scroll', updateListPosition, true);
      }
      return () => {
          window.removeEventListener('resize', updateListPosition);
          window.removeEventListener('scroll', updateListPosition, true);
      };
  }, [isOpen, updateListPosition]);
  
  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
          if (
              isOpen &&
              containerRef.current && !containerRef.current.contains(event.target as Node) &&
              listRef.current && !listRef.current.contains(event.target as Node)
          ) {
              setIsOpen(false);
          }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);


  const toggleOption = (option: string) => {
    if (disabled) return;
    const newSelected = selected.includes(option)
      ? selected.filter(s => s !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  return (
    <div ref={containerRef} className="relative w-full">
        <div 
            onClick={() => !disabled && setIsOpen(prev => !prev)} 
            className={`flex flex-wrap items-center gap-1 p-1 rounded-md border ${disabled ? 'bg-transparent' : 'cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 focus:ring-1 focus:ring-blue-accent focus:border-blue-accent bg-transparent' } border-transparent`}
        >
            {selected.length === 0 ? (
                <span className="text-gray-500 dark:text-gray-400 text-sm italic px-1">None</span>
            ) : (
                selected.map(s => (
                    <span key={s} className="bg-gray-200 dark:bg-gray-600 text-xs px-2 py-0.5 rounded-md">{s}</span>
                ))
            )}
        </div>
        {isOpen && !disabled && (
            <ul ref={listRef} style={listStyle} className="mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-48 overflow-y-auto">
            {options.map(option => (
                <li key={option} className="px-3 py-1.5 text-sm cursor-pointer hover:bg-blue-accent hover:text-white text-gray-800 dark:text-gray-200">
                    <label className="flex items-center space-x-2 w-full cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selected.includes(option)}
                            onChange={() => toggleOption(option)}
                            className="h-4 w-4 bg-gray-200 dark:bg-gray-700 border-gray-400 dark:border-gray-600 rounded text-blue-accent focus:ring-blue-accent"
                        />
                        <span>{option}</span>
                    </label>
                </li>
            ))}
            </ul>
        )}
    </div>
  );
};


const PriorityBadge: React.FC<{ priority: Priority }> = ({ priority }) => {
    const styles = {
        [Priority.P0]: 'bg-red-500 border-red-500',
        [Priority.P1]: 'bg-orange-500 border-orange-500',
        [Priority.P2]: 'bg-yellow-500 border-yellow-500',
        [Priority.P3]: 'bg-blue-500 border-blue-500',
    };
    return <span className={`px-2 py-0.5 text-xs font-semibold text-white rounded-full border ${styles[priority]}`}>{priority}</span>
}

const CycleStatusBadge: React.FC<{ status: CycleStatus }> = ({ status }) => {
  const statusStyles = {
    [CycleStatus.DRAFT]: 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-100',
    [CycleStatus.ACTIVE]: 'bg-blue-500 text-white',
    [CycleStatus.CLOSED]: 'bg-green-600 text-white',
    [CycleStatus.ARCHIVED]: 'bg-gray-500 text-white',
  };
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>
      {status.toUpperCase()}
    </span>
  );
};

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

  const expandAllFolders = useCallback(() => {
    setExpandedFolders(new Set(folders.map(f => f.id)));
  }, [folders]);

  const collapseAllFolders = () => {
      setExpandedFolders(new Set());
  };

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
          <aside className="w-1/3 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Folders</h3>
                <div className="flex items-center">
                    <button onClick={expandAllFolders} title="Expand All" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                        <ExpandAllIcon className="w-5 h-5" />
                    </button>
                    <button onClick={collapseAllFolders} title="Collapse All" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                        <CollapseAllIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <FolderTree
                folders={folderTreeForNav}
                selectedFolderId={selectedFolderId}
                onSelectFolder={setSelectedFolderId}
                onDropTest={() => {}}
                onDropFolder={() => {}}
                expandedFolders={expandedFolders}
                onToggleFolder={toggleFolder}
                canEdit={false}
              />
            </div>
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
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {selectedTests.size} test{selectedTests.size !== 1 ? 's' : ''} selected
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={selectedTests.size === 0}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-accent rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Add Selected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CycleBuilder: React.FC = () => <div>CycleBuilder placeholder</div>;
