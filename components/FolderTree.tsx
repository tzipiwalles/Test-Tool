import React from 'react';
import { Folder } from '../types';
import FolderTreeItem from './FolderTreeItem';

interface FolderTreeProps {
  folders: Folder[];
  selectedFolderId: string | null;
  onSelectFolder: (id: string) => void;
  onDropTest: (testId: string, targetFolderId: string) => void;
  onDropFolder: (folderId: string, targetFolderId: string | null) => void;
  onDeleteFolder?: (id: string) => void;
  expandedFolders: Set<string>;
  onToggleFolder: (id: string) => void;
}

const FolderTree: React.FC<FolderTreeProps> = ({ folders, selectedFolderId, onSelectFolder, onDropTest, onDropFolder, onDeleteFolder, expandedFolders, onToggleFolder }) => {
  return (
    <div className="space-y-1">
      {folders.map(folder => (
        <FolderTreeItem 
            key={folder.id} 
            folder={folder} 
            level={0} 
            selectedFolderId={selectedFolderId} 
            onSelectFolder={onSelectFolder}
            onDropTest={onDropTest}
            onDropFolder={onDropFolder}
            onDeleteFolder={onDeleteFolder}
            expandedFolders={expandedFolders}
            onToggleFolder={onToggleFolder}
        />
      ))}
    </div>
  );
};

export default FolderTree;