
import React from 'react';
import { Folder } from '../types';
import { FolderIcon } from './icons/FolderIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { TrashIcon } from './icons/TrashIcon';

interface FolderTreeItemProps {
  folder: Folder;
  level: number;
  selectedFolderId: string | null;
  onSelectFolder: (id: string) => void;
  onDropTest: (testId: string, targetFolderId: string) => void;
  onDropFolder: (folderId: string, targetFolderId: string | null) => void;
  onDeleteFolder?: (folderId: string) => void;
  expandedFolders: Set<string>;
  onToggleFolder: (id:string) => void;
  canEdit: boolean;
}

const FolderTreeItem: React.FC<FolderTreeItemProps> = ({ folder, level, selectedFolderId, onSelectFolder, onDropTest, onDropFolder, onDeleteFolder, expandedFolders, onToggleFolder, canEdit }) => {
  const isOpen = expandedFolders.has(folder.id);

  const handleDragStart = (e: React.DragEvent, type: 'folder', id: string) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ type, id }));
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const data = JSON.parse(e.dataTransfer.getData('application/json'));
    if (data.type === 'test') {
      onDropTest(data.id, folder.id);
    } else if (data.type === 'folder' && data.id !== folder.id) {
      onDropFolder(data.id, folder.id);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const isSelected = selectedFolderId === folder.id;

  return (
    <div>
      <div
        className={`group flex items-center p-1.5 rounded-md transition-colors ${canEdit ? 'cursor-pointer' : 'cursor-default'} ${
          isSelected ? 'bg-blue-accent/20 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-200 dark:hover:bg-gray-800'
        }`}
        style={{ paddingLeft: `${level * 1.25}rem` }}
        onClick={() => onSelectFolder(folder.id)}
        onDrop={canEdit ? handleDrop : undefined}
        onDragOver={canEdit ? handleDragOver : undefined}
        draggable={canEdit}
        onDragStart={canEdit ? (e) => handleDragStart(e, 'folder', folder.id) : undefined}
      >
        <ChevronDownIcon
          className={`w-4 h-4 mr-2 transition-transform cursor-pointer ${isOpen ? 'rotate-0' : '-rotate-90'}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFolder(folder.id);
          }}
        />
        <FolderIcon className="w-5 h-5 mr-2 text-yellow-500" />
        <span className="flex-1 truncate">{folder.name}</span>
        {canEdit && onDeleteFolder && (
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    if(window.confirm(`Are you sure you want to delete the folder "${folder.name}" and all its contents?`)) {
                        onDeleteFolder(folder.id);
                    }
                }}
                className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                title="Delete Folder"
            >
                <TrashIcon className="w-4 h-4" />
            </button>
        )}
      </div>
      {isOpen && (
        <div className="pl-5">
            {folder.children.map(child => (
                <FolderTreeItem 
                    key={child.id}
                    folder={child}
                    level={level + 1}
                    selectedFolderId={selectedFolderId}
                    onSelectFolder={onSelectFolder}
                    onDropTest={onDropTest}
                    onDropFolder={onDropFolder}
                    onDeleteFolder={onDeleteFolder}
                    expandedFolders={expandedFolders}
                    onToggleFolder={onToggleFolder}
                    canEdit={canEdit}
                />
            ))}
        </div>
      )}
    </div>
  );
};

export default FolderTreeItem;
