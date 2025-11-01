import React from 'react';
// FIX: Import Test type for onSelectTest prop
import { Folder, Test } from '../types';
import { FolderIcon } from './icons/FolderIcon';
import { FileIcon } from './icons/FileIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import FolderTreeItem from './FolderTreeItem';

interface FolderTreeProps {
  folders: Folder[];
  selectedFolderId: string | null;
  onSelectFolder: (id: string) => void;
  onDropTest: (testId: string, targetFolderId: string) => void;
  onDropFolder: (folderId: string, targetFolderId: string | null) => void;
  onDeleteFolder?: (id: string) => void;
  isCycleBuilder?: boolean;
  expandedFolders: Set<string>;
  onToggleFolder: (id: string) => void;
  // FIX: Add onSelectTest prop for cycle builder functionality
  onSelectTest?: (test: Test) => void;
  // MODAL PROPS
  onSelectTestInModal?: (test: Test) => void;
  modalSelectedTestIds?: Set<string>;
  modalExistingTestIds?: Set<string>;
}

const FolderTree: React.FC<FolderTreeProps> = ({ folders, selectedFolderId, onSelectFolder, onDropTest, onDropFolder, onDeleteFolder, isCycleBuilder, expandedFolders, onToggleFolder, onSelectTest, onSelectTestInModal, modalSelectedTestIds, modalExistingTestIds }) => {
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
            isCycleBuilder={isCycleBuilder}
            expandedFolders={expandedFolders}
            onToggleFolder={onToggleFolder}
            // FIX: Pass onSelectTest to FolderTreeItem
            onSelectTest={onSelectTest}
            // MODAL PROPS
            onSelectTestInModal={onSelectTestInModal}
            modalSelectedTestIds={modalSelectedTestIds}
            modalExistingTestIds={modalExistingTestIds}
        />
      ))}
    </div>
  );
};

export default FolderTree;