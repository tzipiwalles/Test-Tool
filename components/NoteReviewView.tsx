import React, { useState, useMemo } from 'react';
import { Cycle, CycleItemResult, Note, User, Test } from '../types';
import { useData } from './DataContext';
import { BuilderIcon } from './icons/BuilderIcon';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import RichTextEditor from './RichTextEditor';
import { PinIcon } from './icons/PinIcon';
import { ExportIcon } from './icons/ExportIcon';

const getResultColorClass = (result: CycleItemResult) => {
    switch (result) {
        case CycleItemResult.PASSED: return 'text-green-600 dark:text-green-400 border-green-500';
        case CycleItemResult.FAILED: return 'text-red-600 dark:text-red-400 border-red-500';
        case CycleItemResult.BLOCKED: return 'text-yellow-600 dark:text-yellow-400 border-yellow-500';
        case CycleItemResult.EXECUTING: return 'text-blue-600 dark:text-blue-400 border-blue-500';
        case CycleItemResult.PENDING_REVIEW: return 'text-purple-600 dark:text-purple-400 border-purple-500';
        case CycleItemResult.NOT_RUN:
        default:
            return 'text-gray-600 dark:text-gray-400 border-gray-500';
    }
};

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


const NoteReviewView: React.FC<{ cycle: Cycle, onBack: () => void }> = ({ cycle, onBack }) => {
    const { notes, cycleItems, users, permissions, tests } = useData();
    const [summary, setSummary] = useState('');
    const [activeFilter, setActiveFilter] = useState<'all' | 'failed' | 'blocked'>('all');
    const [groupBy, setGroupBy] = useState<'none' | 'result' | 'author' | 'map' | 'affectedObjectType'>('none');
    const [selectedMaps, setSelectedMaps] = useState<string[]>([]);
    const [selectedAffectedObjects, setSelectedAffectedObjects] = useState<string[]>([]);

    const cycleNotes = useMemo(() => {
        return notes
            .map(note => {
                let context: any = null;
                if (note.parentType === 'cycle' && note.parentId === cycle.id) {
                    context = { type: 'Cycle', name: cycle.name };
                } else if (note.parentType === 'map') {
                    const mapInfo = cycle.mapsInfo?.find(m => m.id === note.parentId);
                    if (mapInfo) {
                        context = { type: 'Map', name: mapInfo.mapName };
                    }
                } else if (note.parentType === 'item') {
                    const cycleItem = cycleItems.find(i => i.id === note.parentId);
                    if (cycleItem && cycleItem.cycleId === cycle.id) {
                        const test = tests.find(t => t.id === cycleItem.testId);
                        context = { type: 'Test', name: cycleItem.testSnapshot.name, result: cycleItem.result, test };
                    }
                } else if (note.parentType === 'objectType' && note.parentId.startsWith(cycle.id + '_')) {
                    const objectTypeName = note.parentId.split('_').slice(1).join('_');
                    context = { type: 'Object Type', name: objectTypeName };
                }
                
                const author = users.find(u => u.id === note.authorId);
                
                return context ? { ...note, context, author } : null;
            })
            .filter((note): note is Note & { context: any, author: User | undefined } => note !== null);
    }, [notes, cycle, cycleItems, users, tests]);

    const allMapsInCycle = useMemo(() => {
        const mapSet = new Set<string>();
        cycle.mapsInfo?.forEach(m => m.mapName && mapSet.add(m.mapName));
        cycleItems.filter(i => i.cycleId === cycle.id && i.map).forEach(i => mapSet.add(i.map!));
        return Array.from(mapSet).sort();
    }, [cycle, cycleItems]);

    const allAffectedObjectsInCycle = useMemo(() => {
        const cycleTestIds = new Set(cycleItems.filter(i => i.cycleId === cycle.id).map(i => i.testId));
        const objects = new Set(
            tests.filter(t => cycleTestIds.has(t.id) && t.affectedObjectType)
                 .map(t => t.affectedObjectType!)
        );
        return Array.from(objects).sort();
    }, [cycleItems, tests, cycle.id]);


    const filteredNotes = useMemo(() => {
        return cycleNotes.filter(note => {
            if (activeFilter !== 'all') {
                if (!note.context || note.context.type !== 'Test') return false;
                if (activeFilter === 'failed' && note.context.result !== CycleItemResult.FAILED) return false;
                if (activeFilter === 'blocked' && note.context.result !== CycleItemResult.BLOCKED) return false;
            }
            if (selectedMaps.length > 0) {
                let noteMap: string | null = null;
                if (note.parentType === 'map') {
                    noteMap = note.context.name;
                } else if (note.parentType === 'item') {
                    const cycleItem = cycleItems.find(i => i.id === note.parentId);
                    noteMap = cycleItem?.map || null;
                }
                if (!noteMap || !selectedMaps.includes(noteMap)) {
                    return false;
                }
            }
            if (selectedAffectedObjects.length > 0) {
                 if (note.parentType === 'item') {
                    if (!note.context.test?.affectedObjectType || !selectedAffectedObjects.includes(note.context.test.affectedObjectType)) {
                        return false;
                    }
                 } else if (note.parentType === 'objectType') {
                    if (!selectedAffectedObjects.includes(note.context.name)) {
                        return false;
                    }
                 } else {
                     return false; // Notes for cycle/map don't have an affected object
                 }
            }
            return true;
        });
    }, [cycleNotes, activeFilter, selectedMaps, selectedAffectedObjects, cycleItems]);

    const groupedNotes = useMemo(() => {
        if (groupBy === 'none') return null;

        const groups = filteredNotes.reduce((acc, note) => {
            let key = 'Uncategorized';
            if (groupBy === 'result') {
                key = note.context.result ? note.context.result.replace(/_/g, ' ').replace(/\b\w/g, (l:string) => l.toUpperCase()) : 'Cycle/Map/Object Notes';
            } else if (groupBy === 'author') {
                key = note.author?.displayName || 'Unknown Author';
            } else if (groupBy === 'map') {
                let noteMap: string | null = null;
                if (note.parentType === 'map') {
                    noteMap = note.context.name;
                } else if (note.parentType === 'item') {
                    const cycleItem = cycleItems.find(i => i.id === note.parentId);
                    noteMap = cycleItem?.map || null;
                }
                key = noteMap || 'N/A';
            } else if (groupBy === 'affectedObjectType') {
                 if (note.parentType === 'item') {
                    key = note.context.test?.affectedObjectType || 'N/A';
                 } else if (note.parentType === 'objectType') {
                    key = note.context.name;
                 } else {
                    key = 'N/A';
                 }
            }

            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(note);
            return acc;
        }, {} as Record<string, typeof filteredNotes>);

        return Object.entries(groups).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    }, [filteredNotes, groupBy, users, cycleItems]);

    const handlePinToSummary = (note: Note & { context: any }) => {
        const contextString = `<blockquote><strong>Note on ${note.context.type}: ${note.context.name}</strong><br/>`;
        const noteContent = `${note.content}</blockquote><p><br></p>`;
        setSummary(prev => prev + contextString + noteContent);
    };

    const handleExport = () => {
        const strippedHtml = summary.replace(/<[^>]+>/g, '');
        navigator.clipboard.writeText(strippedHtml)
            .then(() => alert('Summary copied to clipboard as plain text!'))
            .catch(err => console.error('Failed to copy text: ', err));
    };

    const handleMapFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedMaps(options);
    };

    const handleAffectedObjectFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedAffectedObjects(options);
    };

    const totalItems = cycleItems.filter(i => i.cycleId === cycle.id).length;
    const resultCounts = cycleItems.filter(i => i.cycleId === cycle.id).reduce((acc, item) => {
        acc[item.result] = (acc[item.result] || 0) + 1;
        return acc;
    }, {} as Record<CycleItemResult, number>);

    return (
        <div className="flex h-full overflow-hidden bg-gray-50 dark:bg-gray-950">
            <div className="w-1/3 max-w-md flex-shrink-0 flex flex-col border-r border-gray-200 dark:border-gray-800">
                <header className="p-4 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-lg font-bold">Control Panel & Summary</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Build your cycle report here.</p>
                </header>
                <div className="flex-1 p-4 overflow-y-auto space-y-6">
                    <div>
                        <h3 className="text-md font-semibold mb-2">Executive Summary</h3>
                        <RichTextEditor value={summary} onChange={setSummary} disabled={!permissions.canAddNotes} />
                        <div className="mt-2 flex justify-end">
                            <button 
                                onClick={handleExport}
                                className="flex items-center text-sm px-3 py-1.5 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                            >
                                <ExportIcon className="w-4 h-4 mr-2"/>
                                Copy to Clipboard
                            </button>
                        </div>
                    </div>
                     <div>
                        <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-300">Quick Filters</h3>
                        <div className="flex space-x-2">
                            <button onClick={() => setActiveFilter('all')} className={`px-3 py-1 text-sm rounded-full ${activeFilter === 'all' ? 'bg-blue-accent text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>All Notes</button>
                            <button onClick={() => setActiveFilter('failed')} className={`px-3 py-1 text-sm rounded-full ${activeFilter === 'failed' ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>Failed</button>
                            <button onClick={() => setActiveFilter('blocked')} className={`px-3 py-1 text-sm rounded-full ${activeFilter === 'blocked' ? 'bg-yellow-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>Blocked</button>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Filter by Map</h3>
                            {selectedMaps.length > 0 && (
                                <button onClick={() => setSelectedMaps([])} className="text-xs text-blue-500 hover:underline">
                                    Clear
                                </button>
                            )}
                        </div>
                        <select multiple value={selectedMaps} onChange={handleMapFilterChange} className="w-full h-24 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:ring-blue-accent focus:border-blue-accent">
                            {allMapsInCycle.map(map => <option key={map} value={map} className="p-1">{map}</option>)}
                        </select>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Filter by Affected Object</h3>
                             {selectedAffectedObjects.length > 0 && (
                                <button onClick={() => setSelectedAffectedObjects([])} className="text-xs text-blue-500 hover:underline">
                                    Clear
                                </button>
                            )}
                        </div>
                        <select multiple value={selectedAffectedObjects} onChange={handleAffectedObjectFilterChange} className="w-full h-24 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:ring-blue-accent focus:border-blue-accent">
                            {allAffectedObjectsInCycle.map(obj => <option key={obj} value={obj} className="p-1">{obj}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="group-by" className="text-sm font-semibold text-gray-600 dark:text-gray-300">Group Notes By</label>
                        <select id="group-by" value={groupBy} onChange={e => setGroupBy(e.target.value as any)} className="mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm focus:ring-blue-accent focus:border-blue-accent">
                            <option value="none">None (Chronological)</option>
                            <option value="result">Test Result</option>
                            <option value="author">Author</option>
                            <option value="map">Map</option>
                            <option value="affectedObjectType">Affected Object Type</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                     <div className="flex items-center">
                        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-2">
                            <ChevronLeftIcon className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold">Note Review: {cycle.name}</h1>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                {Object.entries(resultCounts).map(([result, count]) => (
                                    <span key={result} className={getResultColorClass(result as CycleItemResult)}>
                                        {result.replace(/_/g, ' ').toUpperCase()}: {count}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button onClick={onBack} className="flex items-center text-sm px-3 py-1.5 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                        <BuilderIcon className="w-4 h-4 mr-2" />
                        Switch to Builder
                    </button>
                </header>
                <main className="flex-1 overflow-y-auto p-4 space-y-4">
                    {groupedNotes ? (
                        groupedNotes.map(([groupName, notesInGroup]) => (
                            <div key={groupName}>
                                <h3 className="font-semibold text-lg mb-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md sticky top-0">{groupName} ({notesInGroup.length})</h3>
                                <div className="space-y-4">
                                {notesInGroup.map(note => <NoteCard key={note.id} note={note} onPin={handlePinToSummary} />)}
                                </div>
                            </div>
                        ))
                    ) : (
                        filteredNotes.map(note => <NoteCard key={note.id} note={note} onPin={handlePinToSummary} />)
                    )}
                    {filteredNotes.length === 0 && <div className="text-center text-gray-500 mt-10">No notes found for the current filter.</div>}
                </main>
            </div>
        </div>
    );
};

const NoteCard: React.FC<{note: any, onPin: (note: any) => void}> = ({ note, onPin }) => {
    return (
        <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 shadow-sm overflow-hidden">
            <header className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/40 border-b border-gray-200 dark:border-gray-700/50">
                <div className="flex items-center space-x-3">
                    <UserAvatar user={note.author} />
                    <div>
                        <p className="font-semibold text-sm">{note.author?.displayName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Note on {note.context.type}: <span className="font-medium text-gray-700 dark:text-gray-300">{note.context.name}</span>
                            {note.context.result && 
                                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full border ${getResultColorClass(note.context.result)}`}>
                                    {note.context.result.replace(/_/g, ' ')}
                                </span>
                            }
                        </p>
                    </div>
                </div>
                 <button 
                    onClick={() => onPin(note)}
                    title="Pin to summary"
                    className="flex items-center text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-blue-accent hover:text-white dark:hover:bg-blue-accent"
                >
                    <PinIcon className="w-3 h-3 mr-1.5" />
                    Pin
                </button>
            </header>
            <div className="prose dark:prose-invert max-w-none p-4 text-sm" dangerouslySetInnerHTML={{ __html: note.content }} />
        </div>
    );
}

export default NoteReviewView;