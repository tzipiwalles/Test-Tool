import React, { useState, useEffect, useMemo } from 'react';
import { useData } from './DataContext';
import { NoteParentType, UUID, User } from '../types';
import RichTextEditor from './RichTextEditor';
import { XCircleIcon } from './icons/XCircleIcon';
import { SaveIcon } from './icons/SaveIcon';
import { PinIcon } from './icons/PinIcon';

interface NotesPanelProps {
  target: {
    id: UUID;
    type: NoteParentType;
    name: string;
  };
  onClose: () => void;
  onSave: (content: string, isPinned: boolean) => void;
}

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

const NotesPanel: React.FC<NotesPanelProps> = ({ target, onClose, onSave }) => {
  const { notes, users, permissions } = useData();
  
  const existingNote = useMemo(() => notes.find(n => n.parentId === target.id), [notes, target.id]);

  const [content, setContent] = useState(existingNote?.content || '');
  const [isPinned, setIsPinned] = useState(existingNote?.isPinned || false);
  
  useEffect(() => {
      setContent(existingNote?.content || '');
      setIsPinned(existingNote?.isPinned || false);
  }, [existingNote]);

  const author = useMemo(() => {
    if (!existingNote) return null;
    return users.find(u => u.id === existingNote.authorId) || null;
  }, [existingNote, users]);

  const handleSave = () => {
    onSave(content, isPinned);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 animate-fade-in-down" onClick={onClose} style={{animationDuration: '0.3s'}}></div>

      {/* Panel */}
      <div className="relative w-full max-w-2xl h-full bg-gray-50 dark:bg-gray-900 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out translate-x-0" style={{ animation: 'slide-in-from-right 0.3s ease-out forwards' }}>
        <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <div>
             <h2 className="text-lg font-bold">Notes</h2>
             <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-md" title={target.name}>{target.name}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <XCircleIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </header>

        <main className="flex-1 p-4 overflow-y-auto">
          <RichTextEditor value={content} onChange={setContent} disabled={!permissions.canAddNotes}/>
        </main>

        <footer className="flex-shrink-0 flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
            <div className="flex items-center space-x-4">
                 {author && existingNote && (
                    <div className="flex items-center space-x-2">
                        <UserAvatar user={author} />
                        <div className="text-sm">
                            <span className="font-semibold">{author.displayName}</span>
                            <span className="text-gray-500 dark:text-gray-400"> last updated on </span>
                            <span>{new Date(existingNote.updatedAt).toLocaleString()}</span>
                        </div>
                    </div>
                )}
                 {permissions.canAddNotes && target.type === 'cycle' && (
                    <label className="flex items-center space-x-2 cursor-pointer text-sm text-gray-600 dark:text-gray-300">
                        <input
                            type="checkbox"
                            checked={isPinned}
                            onChange={(e) => setIsPinned(e.target.checked)}
                            className="h-4 w-4 bg-gray-200 dark:bg-gray-700 border-gray-400 dark:border-gray-600 rounded text-blue-accent focus:ring-blue-accent"
                        />
                        <PinIcon className="w-4 h-4" />
                        <span>Pin this note to the top of the cycle</span>
                    </label>
                )}
            </div>
          {permissions.canAddNotes && (
            <button onClick={handleSave} className="flex items-center bg-blue-accent text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
              <SaveIcon className="w-5 h-5 mr-2" />
              Save Note
            </button>
          )}
        </footer>
      </div>
      <style>{`
        @keyframes slide-in-from-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default NotesPanel;