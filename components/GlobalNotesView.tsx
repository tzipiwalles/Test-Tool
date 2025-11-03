
import React, { useState, useMemo, useRef } from 'react';
import { Cycle, Note, User, Test, NoteParentType, CycleItem, UUID, UserRole } from '../types';
import { useData } from './DataContext';
import { UserIcon } from './icons/UserIcon';
import { PinIcon } from './icons/PinIcon';
import { FilterIcon } from './icons/FilterIcon';
import { UploadIcon } from './icons/UploadIcon';
import { ExportIcon } from './icons/ExportIcon';

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

const UserAvatar: React.FC<{ user: User | null }> = ({ user }) => {
    const initials = user ? user.displayName.split(' ').map(n => n[0]).join('') : '?';
    const colors = ['#f87171', '#fb923c', '#fbbf24', '#a3e635', '#4ade80', '#34d399', '#2dd4bf', '#22d3ee', '#38bdf8', '#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#e879f9', '#f472b6'];
    const colorIndex = user ? user.displayName.charCodeAt(0) % colors.length : 0;
    const bgColor = colors[colorIndex];
    
    return (
        <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
            style={{ backgroundColor: bgColor }}
            title={user?.displayName}
        >
            {initials}
        </div>
    );
};

interface ProcessedNote extends Note {
    context: {
        type: string;
        name: string;
        test?: Test;
    };
    // Fix: Changed author to be explicitly `User | undefined` to resolve a tricky type predicate error.
    author: User | undefined;
    cycle: Cycle;
}

const NoteCard: React.FC<{note: ProcessedNote}> = ({ note }) => {
    return (
        <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 shadow-sm overflow-hidden animate-fade-in-down" style={{animationDuration: '0.3s'}}>
            <header className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/40 border-b border-gray-200 dark:border-gray-700/50">
                <div className="flex items-center space-x-3 overflow-hidden">
                    <UserAvatar user={note.author || null} />
                    <div className="overflow-hidden">
                        <p className="font-semibold text-sm truncate">{note.author?.displayName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            Note on {note.context.type}: <span className="font-medium text-gray-700 dark:text-gray-300">{note.context.name}</span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center flex-shrink-0 ml-4">
                     {/* Fix: Replaced invalid `title` prop with a child `<title>` element for SVG accessibility. */}
                     {note.isPinned && <PinIcon className="w-4 h-4 text-gray-400 mr-2"><title>Pinned Note</title></PinIcon>}
                    <div className="text-right">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate" title={note.cycle.name}>{note.cycle.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(note.updatedAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </header>
            <div className="prose dark:prose-invert max-w-none p-4 text-sm" dangerouslySetInnerHTML={{ __html: note.content }} />
        </div>
    );
}


const GlobalNotesView: React.FC = () => {
    const { notes: allNotes, setNotes, cycleItems, users, tests, cycles, permissions, currentUser } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
    const [selectedCycles, setSelectedCycles] = useState<string[]>([]);
    const [selectedNoteTypes, setSelectedNoteTypes] = useState<NoteParentType[]>([]);
    const [groupBy, setGroupBy] = useState<'cycle' | 'author' | 'type' | 'none'>('cycle');
    
    const [importStatus, setImportStatus] = useState<{message: string, error?: boolean} | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const cyclesMap = useMemo(() => new Map(cycles.map(c => [c.id, c])), [cycles]);
    const cycleItemsMap = useMemo(() => new Map(cycleItems.map(item => [item.id, item])), [cycleItems]);
    const testsMap = useMemo(() => new Map(tests.map(t => [t.id, t])), [tests]);
    const usersMap = useMemo(() => new Map(users.map(u => [u.id, u])), [users]);
    const mapInfoToCycleMap = useMemo(() => {
        const map = new Map<UUID, Cycle>();
        cycles.forEach(cycle => {
            cycle.mapsInfo?.forEach(mapInfo => {
                map.set(mapInfo.id, cycle);
            });
        });
        return map;
    }, [cycles]);

    const processedNotes = useMemo((): ProcessedNote[] => {
        return allNotes
            .map(note => {
                const author = usersMap.get(note.authorId);
                let context: ProcessedNote['context'] | null = null;
                let cycle: Cycle | undefined = undefined;

                switch (note.parentType) {
                    case 'cycle':
                        cycle = cyclesMap.get(note.parentId);
                        if (cycle) context = { type: 'Cycle', name: cycle.name };
                        break;
                    case 'item':
                        const item = cycleItemsMap.get(note.parentId);
                        if (item) {
                            cycle = cyclesMap.get(item.cycleId);
                            const test = testsMap.get(item.testId);
                            if (cycle) context = { type: 'Test', name: item.testSnapshot.name, test };
                        }
                        break;
                    case 'map':
                        cycle = mapInfoToCycleMap.get(note.parentId);
                        if (cycle) {
                            const mapInfo = cycle.mapsInfo?.find(mi => mi.id === note.parentId);
                            if (mapInfo) context = { type: 'Map', name: mapInfo.mapName };
                        }
                        break;
                    case 'objectType':
                        const [cycleId, ...objectTypeNameParts] = note.parentId.split('_');
                        cycle = cyclesMap.get(cycleId);
                        if (cycle) context = { type: 'Object Type', name: objectTypeNameParts.join('_') };
                        break;
                }

                if (context && cycle) {
                    return { ...note, context, author, cycle };
                }
                return null;
            })
            .filter((n): n is ProcessedNote => n !== null)
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }, [allNotes, usersMap, cyclesMap, cycleItemsMap, testsMap, mapInfoToCycleMap]);

    const filteredNotes = useMemo(() => {
        return processedNotes.filter(note => {
            if (searchTerm && !note.content.toLowerCase().includes(searchTerm.toLowerCase()) && !note.context.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            if (selectedAuthors.length > 0 && (!note.authorId || !selectedAuthors.includes(note.authorId))) return false;
            if (selectedCycles.length > 0 && !selectedCycles.includes(note.cycle.id)) return false;
            if (selectedNoteTypes.length > 0 && !selectedNoteTypes.includes(note.parentType)) return false;
            return true;
        });
    }, [processedNotes, searchTerm, selectedAuthors, selectedCycles, selectedNoteTypes]);

     const groupedNotes = useMemo(() => {
        if (groupBy === 'none') return null;
        
        const groups = filteredNotes.reduce((acc, note) => {
            let key: string = 'Uncategorized';
            if (groupBy === 'cycle') {
                key = note.cycle.name;
            } else if (groupBy === 'author') {
                key = note.author?.displayName || 'Unknown Author';
            } else if (groupBy === 'type') {
                key = note.context.type;
            }

            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(note);
            return acc;
        }, {} as Record<string, ProcessedNote[]>);

        return Object.entries(groups).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    }, [filteredNotes, groupBy]);

    const handleExport = () => {
        const jsonString = JSON.stringify(allNotes, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        const date = new Date().toISOString().split('T')[0];
        link.download = `qualitylane_notes_export_${date}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImportStatus({ message: "Reading and parsing file..." });

        try {
            const jsonText = await file.text();
            processJSONData(jsonText);
        } catch (error) {
            setImportStatus({ message: `Error reading file: ${error instanceof Error ? error.message : String(error)}`, error: true });
        } finally {
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };
    
    const processJSONData = (jsonText: string) => {
        try {
            const importedData = JSON.parse(jsonText);
            if (!Array.isArray(importedData)) {
                setImportStatus({ message: 'Import failed: JSON file should contain an array of notes.', error: true });
                return;
            }
    
            const now = new Date().toISOString();
            const newNotes: Note[] = importedData.map((noteData: Partial<Note>, index: number) => {
                if (!noteData.content || !noteData.authorId || !noteData.parentId || !noteData.parentType) {
                    throw new Error(`Note at index ${index} is missing required fields (content, authorId, parentId, parentType).`);
                }
                return {
                    id: `n-${Date.now()}-${index}`, // New unique ID
                    content: noteData.content,
                    authorId: noteData.authorId,
                    parentId: noteData.parentId,
                    parentType: noteData.parentType,
                    isPinned: noteData.isPinned || false,
                    createdAt: now,
                    updatedAt: now,
                };
            });
    
            if (newNotes.length > 0) {
                setNotes(prev => [...prev, ...newNotes]);
                setImportStatus({ message: `Successfully imported ${newNotes.length} notes.` });
            } else {
                setImportStatus({ message: 'No new notes were found in the file.', error: true });
            }
        } catch (error) {
            setImportStatus({ message: `Error processing file: ${error instanceof Error ? error.message : String(error)}`, error: true });
        }
    };
    
    const noteParentTypeValues: NoteParentType[] = ['cycle', 'map', 'item', 'objectType'];

    return (
        <div className="flex h-full overflow-hidden bg-gray-50 dark:bg-gray-950">
            {importStatus && (
                <ImportStatusModal status={importStatus} onClose={() => setImportStatus(null)} />
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" style={{ display: 'none' }} />
            <aside className="w-1/4 max-w-sm flex-shrink-0 flex flex-col border-r border-gray-200 dark:border-gray-800">
                <header className="p-4 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-lg font-bold flex items-center"><FilterIcon className="w-5 h-5 mr-2" /> Filters & Grouping</h2>
                </header>
                <div className="flex-1 p-4 overflow-y-auto space-y-6">
                     <div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="search" className="text-sm font-semibold text-gray-600 dark:text-gray-300">Search Notes</label>
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="text-xs text-blue-500 hover:underline">Clear</button>
                            )}
                        </div>
                        <input id="search" type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Type to search..." className="mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm"/>
                    </div>
                     <div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="cycle-filter" className="text-sm font-semibold text-gray-600 dark:text-gray-300">Filter by Cycle / Version</label>
                            {selectedCycles.length > 0 && (
                                <button onClick={() => setSelectedCycles([])} className="text-xs text-blue-500 hover:underline">Clear</button>
                            )}
                        </div>
                        <select id="cycle-filter" multiple value={selectedCycles} onChange={e => setSelectedCycles(Array.from(e.target.selectedOptions, option => option.value))} className="mt-1 w-full h-32 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm">
                            {cycles.map(cycle => <option key={cycle.id} value={cycle.id}>{cycle.name}{cycle.version && ` (${cycle.version})`}</option>)}
                        </select>
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="author-filter" className="text-sm font-semibold text-gray-600 dark:text-gray-300">Filter by Author</label>
                             {selectedAuthors.length > 0 && (
                                <button onClick={() => setSelectedAuthors([])} className="text-xs text-blue-500 hover:underline">Clear</button>
                            )}
                        </div>
                        <select id="author-filter" multiple value={selectedAuthors} onChange={e => setSelectedAuthors(Array.from(e.target.selectedOptions, option => option.value))} className="mt-1 w-full h-24 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm">
                            {users.map(user => <option key={user.id} value={user.id}>{user.displayName}</option>)}
                        </select>
                    </div>
                     <div>
                        <div className="flex justify-between items-center">
                           <label htmlFor="type-filter" className="text-sm font-semibold text-gray-600 dark:text-gray-300">Filter by Note Type</label>
                            {selectedNoteTypes.length > 0 && (
                                <button onClick={() => setSelectedNoteTypes([])} className="text-xs text-blue-500 hover:underline">Clear</button>
                            )}
                        </div>
                        <select id="type-filter" multiple value={selectedNoteTypes} onChange={e => setSelectedNoteTypes(Array.from(e.target.selectedOptions, option => option.value) as NoteParentType[])} className="mt-1 w-full h-24 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm">
                            {noteParentTypeValues.map(type => <option key={type} value={type} className="capitalize">{type === 'objectType' ? 'Object Type' : type}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="group-by" className="text-sm font-semibold text-gray-600 dark:text-gray-300">Group Notes By</label>
                        <select id="group-by" value={groupBy} onChange={e => setGroupBy(e.target.value as any)} className="mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm">
                            <option value="cycle">Cycle</option>
                            <option value="author">Author</option>
                            <option value="type">Note Type</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                     <div>
                        <h1 className="text-xl font-bold">Global Notes Review</h1>
                         <p className="text-sm text-gray-500 dark:text-gray-400">{filteredNotes.length} notes found</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        {currentUser?.role === UserRole.MAINTAINER && (
                            <button 
                                onClick={handleImportClick}
                                title="Import notes from a JSON file"
                                className="flex items-center text-sm px-3 py-1.5 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                            >
                                <UploadIcon className="w-4 h-4 mr-2" />
                                Import
                            </button>
                        )}
                        <button 
                            onClick={handleExport}
                            title="Export all notes to a JSON file"
                            className="flex items-center text-sm px-3 py-1.5 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                            <ExportIcon className="w-4 h-4 mr-2" />
                            Export
                        </button>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-4 space-y-4">
                    {groupedNotes ? (
                        groupedNotes.map(([groupName, notesInGroup]) => (
                            <div key={groupName}>
                                <h3 className="font-semibold text-lg mb-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md sticky top-0 z-10">{groupName} ({notesInGroup.length})</h3>
                                <div className="space-y-4">
                                {notesInGroup.map(note => <NoteCard key={note.id} note={note} />)}
                                </div>
                            </div>
                        ))
                    ) : (
                        filteredNotes.map(note => <NoteCard key={note.id} note={note} />)
                    )}
                    {filteredNotes.length === 0 && <div className="text-center text-gray-500 mt-10">No notes found for the current filters.</div>}
                </main>
            </div>
        </div>
    );
};

export default GlobalNotesView;
