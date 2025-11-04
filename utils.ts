import { Folder, Test, UUID } from './types';

// UTILITY to build folder tree structure
export const buildFolderTree = (
  folders: Omit<Folder, 'children' | 'tests'>[],
  tests: Test[]
): Folder[] => {
  const folderMap = new Map<UUID, Folder>();
  const rootFolders: Folder[] = [];

  // Initialize map with folder structures
  folders.forEach(f => {
    folderMap.set(f.id, { ...f, children: [], tests: [] });
  });

  // Populate tests into their respective folders
  tests.forEach(test => {
    const folder = folderMap.get(test.folderId);
    if (folder) {
      folder.tests.push(test);
    }
  });

  // Link children to their parents
  folders.forEach(f => {
    const folder = folderMap.get(f.id)!;
    if (f.parentId && folderMap.has(f.parentId)) {
      const parent = folderMap.get(f.parentId)!;
      // Avoid duplicates if already processed
      if (!parent.children.some(child => child.id === folder.id)) {
        parent.children.push(folder);
      }
    } else {
      rootFolders.push(folder);
    }
  });

  return rootFolders;
};
