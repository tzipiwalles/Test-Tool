import React, { useState, useMemo, useRef } from 'react';
import { Cycle, CycleItem, CycleItemResult, CycleStatus, Scope, ScopeName, Test, CycleMapInfo, CycleType, CycleCreate } from '../types';
import CycleBuilder from './CycleBuilder';
import { PlusIcon } from './icons/PlusIcon';
import { useData } from './DataContext';
import { CopyIcon } from './icons/CopyIcon';
import { TrashIcon } from './icons/TrashIcon';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';
import { UploadIcon } from './icons/UploadIcon';
import { ExportIcon } from './icons/ExportIcon';

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

const NewCycleModal: React.FC<{ onClose: () => void; onCreate: (data: { name: string; description: string; labels: string }) => void; }> = ({ onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [labels, setLabels] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate({ name, description, labels });
    };
    
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onMouseDown={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg text-gray-900 dark:text-white" onMouseDown={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Create New Cycle</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Cycle Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required autoFocus className="mt-1 w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Description</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="mt-1 w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Labels (comma-separated)</label>
                    <input type="text" value={labels} onChange={e => setLabels(e.target.value)} className="mt-1 w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"/>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100">Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded-md bg-blue-accent hover:bg-blue-600 text-white">Create Cycle</button>
                </div>
            </form>
        </div>
      </div>
    );
};

const CycleStatusBadge: React.FC<{ status: CycleStatus }> = ({ status }) => {
  const statusStyles = {
    [CycleStatus.DRAFT]: 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-100',
    [CycleStatus.ACTIVE]: 'bg-blue-500 text-white',
    [CycleStatus.CLOSED]: 'bg-green-600 text-white',
    [CycleStatus.ARCHIVED]: 'bg-gray-500 text-white',
  };
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
      {status.toUpperCase()}
    </span>
  );
};


const CycleProgress: React.FC<{ items: CycleItem[] }> = ({ items }) => {
  const total = items.length;
  if (total === 0) return <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5"></div>;

  const getCount = (result: CycleItemResult) => items.filter(i => i.result === result).length;
  
  const passed = getCount(CycleItemResult.PASSED);
  const failed = getCount(CycleItemResult.FAILED);
  const blocked = getCount(CycleItemResult.BLOCKED);
  const executing = getCount(CycleItemResult.EXECUTING);
  const pendingReview = getCount(CycleItemResult.PENDING_REVIEW);
  const notRun = total - passed - failed - blocked - executing - pendingReview;

  return (
      <div className="flex w-full h-2.5 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700" title={`Passed: ${passed}, Failed: ${failed}, Blocked: ${blocked}, Executing: ${executing}, Pending Review: ${pendingReview}, Not Run: ${notRun}`}>
        <div className="bg-green-500" style={{ width: `${(passed / total) * 100}%` }}></div>
        <div className="bg-red-500" style={{ width: `${(failed / total) * 100}%` }}></div>
        <div className="bg-yellow-500" style={{ width: `${(blocked / total) * 100}%` }}></div>
        <div className="bg-blue-400" style={{ width: `${(executing / total) * 100}%` }}></div>
        <div className="bg-purple-500" style={{ width: `${(pendingReview / total) * 100}%` }}></div>
      </div>
  );
};


const CyclesView: React.FC = () => {
  const { cycles, setCycles, cycleItems, setCycleItems, scopes, setScopes, permissions, users, tests, createCycle } = useData();
  const [selectedCycle, setSelectedCycle] = useState<Cycle | null>(null);
  const [isNewCycleModalOpen, setIsNewCycleModalOpen] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [archivingCycle, setArchivingCycle] = useState<Cycle | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importStatus, setImportStatus] = useState<{message: string, error?: boolean} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateCycle = async (cycleData: { name: string; description: string; labels: string }) => {
    // NOTE: version, refVersion, cycleType, mapsInfo are not in the modal.
    // The backend seems to require them. Sending empty/default values.
    const newCycleData = {
        name: cycleData.name,
        description: cycleData.description,
        labels: cycleData.labels.split(',').map(l => l.trim()).filter(Boolean),
        version: "1.0", // Default value
        cycleType: CycleType.REGRESSION // Default value
    };
    try {
      await createCycle(newCycleData);
      setIsNewCycleModalOpen(false);
    } catch (error) {
      console.error('Failed to create cycle:', error);
      setImportStatus({ 
        message: `Failed to create cycle: ${error instanceof Error ? error.message : 'Unknown error'}`, 
        error: true 
      });
      setIsImportModalOpen(true);
      setIsNewCycleModalOpen(false);
    }
  };

  const handleUpdateCycle = (updatedCycle: Cycle) => {
    // NOTE: API endpoint for updating a cycle is not specified.
    // This will only update local state.
    setCycles(prev => prev.map(c => c.id === updatedCycle.id ? updatedCycle : c));
    setSelectedCycle(updatedCycle);
  };

  const handleDuplicateCycle = async (cycleToDuplicate: Cycle) => {
    try {
      // Create the new cycle via API
      const newCycleData: CycleCreate = {
        name: `Copy of ${cycleToDuplicate.name}`,
        description: cycleToDuplicate.description,
        labels: cycleToDuplicate.labels,
        version: '', // Clear version
        refVersion: '', // Clear ref version
        cycleType: cycleToDuplicate.cycleType,
        mapsInfo: (cycleToDuplicate.mapsInfo || []).map(info => ({
          ...info,
          id: `mi-${Date.now()}-${Math.random().toString(36).substring(2,9)}`,
        })),
      };

      await createCycle(newCycleData);

      // Note: Scopes and cycle items creation is not supported by the backend API yet.
      // They would need to be created separately once the API endpoints are available.
      // For now, the cycle will be created but will be empty (no scopes or items).
      
      setImportStatus({ 
        message: `Cycle duplicated successfully!

Note: Scopes and test items were not copied as the backend does not yet support this functionality.` 
      });
      setIsImportModalOpen(true);
    } catch (error) {
      console.error('Failed to duplicate cycle:', error);
      setImportStatus({ 
        message: `Failed to duplicate cycle: ${error instanceof Error ? error.message : 'Unknown error'}`, 
        error: true 
      });
      setIsImportModalOpen(true);
    }
  };

  const handleArchiveCycle = () => {
    if (!archivingCycle) return;
    // NOTE: API endpoint for archiving/updating a cycle is not specified.
    // This will only update local state.
    setCycles(prev => prev.map(c => c.id === archivingCycle.id ? { ...c, status: CycleStatus.ARCHIVED } : c));
    setArchivingCycle(null);
  };

  const filteredCycles = useMemo(() => {
    return cycles
        .filter(cycle => showArchived ? true : cycle.status !== CycleStatus.ARCHIVED)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [cycles, showArchived]);
  
  const handleExportCycleCSV = (cycle: Cycle) => {
    const headers = [
      'cycle_name', 'cycle_description', 'cycle_labels', 'cycle_version', 'cycle_refVersion', 'cycle_type', 'cycle_mapsInfo_json',
      'scope_name',
      'test_id', 'snapshot_name', 'snapshot_steps', 'snapshot_labels', 'snapshot_affectedObjectType', 'snapshot_testMethod',
      'assignee_email', 'result', 'item_map', 'item_configurations'
    ];

    const escapeCSV = (str: string | number | null | undefined): string => {
        const s = String(str ?? '');
        if (s.includes(',') || s.includes('"') || s.includes('\n')) {
            return `"${s.replace(/"/g, '""')}"`;
        }
        return s;
    };
    
    const cycleScopes = scopes.filter(s => s.cycleId === cycle.id);
    const cycleItemsForExport = cycleItems.filter(item => item.cycleId === cycle.id);

    const mapsInfoJson = cycle.mapsInfo
        ? JSON.stringify(cycle.mapsInfo.map(({ id, ...rest }) => rest))
        : '[]';

    const rows = cycleItemsForExport.map(item => {
        const scope = cycleScopes.find(s => s.id === item.scopeId);
        const assignee = users.find(u => u.id === item.assigneeId);
        
        const stepsString = item.testSnapshot.steps.map(s => `${s.action || ''}||${s.expected || ''}`).join('@@');

        return [
            cycle.name, cycle.description, (cycle.labels || []).join(','), cycle.version, cycle.refVersion, cycle.cycleType, mapsInfoJson,
            scope?.name || ScopeName.NONE,
            item.testId, item.testSnapshot.name, stepsString, (item.testSnapshot.labels || []).join(','), item.testSnapshot.affectedObjectType, item.testSnapshot.testMethod,
            assignee?.email || '', item.result, item.map, (item.configurations || []).join(',')
        ].map(escapeCSV).join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    const date = new Date().toISOString().split('T')[0];
    const safeCycleName = cycle.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.setAttribute("download", `catalyst_cycle_${safeCycleName}_${date}.csv`);
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
        await processCycleCSVData(csvText);
      } catch (error) {
          setImportStatus({ message: `Error reading file: ${error instanceof Error ? error.message : String(error)}`, error: true });
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
  };

  const processCycleCSVData = async (csvText: string) => {
    // NOTE: This is a complex operation that should ideally be handled
    // by a dedicated backend endpoint. Currently only the cycle itself can be created via API.
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
                    if (field === '') { inQuotes = true; } 
                    else { field += char; }
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

    const requiredHeaders = ['cycle_name', 'scope_name', 'test_id', 'snapshot_name'];
    if (!requiredHeaders.every(h => headers.includes(h))) {
        setImportStatus({ message: `CSV is missing required headers. Required: ${requiredHeaders.join(', ')}`, error: true });
        return;
    }

    if (nonEmptyRows.length === 0) {
      setImportStatus({ message: "CSV has headers but no data rows.", error: true });
      return;
    }
    
    const firstRow = headers.reduce((obj, key, i) => ({...obj, [key]: (nonEmptyRows[0][i] || '').trim() }), {} as Record<string, string>);
    let errors: string[] = [];

    let mapsInfo: CycleMapInfo[] = [];
    if (headers.includes('cycle_mapsInfo_json') && firstRow.cycle_mapsInfo_json) {
        try {
            const parsedMapsInfo = JSON.parse(firstRow.cycle_mapsInfo_json);
            if (Array.isArray(parsedMapsInfo)) {
                // Add IDs to map info objects since backend expects them
                mapsInfo = parsedMapsInfo.map((info: Omit<CycleMapInfo, 'id'>, index: number) => ({
                    ...info,
                    id: `mi-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 9)}`,
                }));
            }
        } catch (e) {
            errors.push(`Warning: Could not parse 'cycle_mapsInfo_json'. Map information will be ignored.`);
        }
    }

    // Validate cycle type
    let cycleType: CycleType | undefined = undefined;
    if (firstRow.cycle_type && Object.values(CycleType).includes(firstRow.cycle_type as CycleType)) {
      cycleType = firstRow.cycle_type as CycleType;
    } else if (firstRow.cycle_type) {
      errors.push(`Warning: Invalid cycle type '${firstRow.cycle_type}'. Using default.`);
    }

    const newCycleData: CycleCreate = {
      name: `[IMPORT] ${firstRow.cycle_name || 'Untitled Cycle'}`,
      description: firstRow.cycle_description || '',
      labels: (firstRow.cycle_labels || '').split(',').map(l => l.trim()).filter(Boolean),
      version: firstRow.cycle_version,
      refVersion: firstRow.cycle_refVersion,
      cycleType: cycleType,
      mapsInfo: mapsInfo,
    };

    try {
      await createCycle(newCycleData);
      
      // Note: The backend does not yet support creating scopes and cycle items via API.
      // Only the cycle metadata has been imported.
      const warningsSection = errors.length > 0 ? `\n\nWarnings:\n${errors.join('\n')}` : '';
      const message = `Import successful!
- 1 cycle created: "${newCycleData.name}"

Note: Scopes and test items were not imported as the backend does not yet support this functionality.
The cycle has been created but is empty. You will need to add tests manually.${warningsSection}`;
      
      setImportStatus({ message });
    } catch (error) {
      console.error('Failed to import cycle:', error);
      setImportStatus({ message: `Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`, error: true });
    }
  };


  if (selectedCycle) {
    return (
      <CycleBuilder 
        cycle={selectedCycle} 
        onBack={() => setSelectedCycle(null)}
        onUpdateCycle={handleUpdateCycle}
      />
    );
  }

  return (
    <div className="p-6 h-full flex flex-col">
      {isNewCycleModalOpen && <NewCycleModal onClose={() => setIsNewCycleModalOpen(false)} onCreate={handleCreateCycle} />}
      {isImportModalOpen && importStatus && (
        <ImportStatusModal status={importStatus} onClose={() => setIsImportModalOpen(false)} />
      )}
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".csv" style={{ display: 'none' }} />
      {archivingCycle && (
        <ConfirmationModal
            title="Archive Cycle"
            message={<p>Are you sure you want to archive the cycle "<strong>{archivingCycle.name}</strong>"? It can be viewed later by enabling 'Show Archived'.</p>}
            onConfirm={handleArchiveCycle}
            onCancel={() => setArchivingCycle(null)}
            confirmText="Archive"
            confirmButtonClass="bg-red-600 hover:bg-red-700"
        />
      )}
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Test Cycles</h1>
        <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                <input 
                    type="checkbox"
                    checked={showArchived}
                    onChange={(e) => setShowArchived(e.target.checked)}
                    className="h-4 w-4 bg-gray-200 dark:bg-gray-700 border-gray-400 dark:border-gray-600 rounded text-blue-accent focus:ring-blue-accent"
                />
                <span>Show Archived</span>
            </label>
            {permissions.canCreateCycles && (
              <div className="flex items-center space-x-2">
                 <button 
                    onClick={handleImportClick}
                    title="Import cycle from a CSV file"
                    className="flex items-center text-sm px-3 py-1.5 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                    <UploadIcon className="w-4 h-4 mr-2" />
                    Import
                </button>
                <button 
                onClick={() => setIsNewCycleModalOpen(true)}
                className="flex items-center bg-blue-accent text-white px-4 py-1.5 rounded-md hover:bg-blue-600 transition-colors"
                >
                <PlusIcon className="w-5 h-5 mr-2" />
                New Cycle
                </button>
              </div>
            )}
        </div>
      </header>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-gray-50 dark:bg-gray-950">
            <tr>
              <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Name</th>
              <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Status</th>
              <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Progress</th>
              <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Last Updated</th>
              <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {filteredCycles.map(cycle => (
              <tr 
                key={cycle.id} 
                className={`hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${cycle.status === CycleStatus.ARCHIVED ? 'opacity-60' : ''}`}
                onClick={() => setSelectedCycle(cycle)}
              >
                <td className="p-3 font-medium">{cycle.name}</td>
                <td className="p-3"><CycleStatusBadge status={cycle.status} /></td>
                <td className="p-3 w-1/3"><CycleProgress items={cycleItems.filter(item => item.cycleId === cycle.id)} /></td>
                <td className="p-3 text-gray-500 dark:text-gray-400">{new Date(cycle.updatedAt).toLocaleDateString()}</td>
                <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-1">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleExportCycleCSV(cycle);
                            }}
                            title="Export Cycle"
                            className="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                        >
                            <ExportIcon className="w-5 h-5" />
                        </button>
                        {permissions.canCreateCycles && cycle.status !== CycleStatus.ARCHIVED && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDuplicateCycle(cycle);
                                }}
                                title="Duplicate Cycle"
                                className="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                            >
                                <CopyIcon className="w-5 h-5" />
                            </button>
                        )}
                        {permissions.canEditCycles && cycle.status !== CycleStatus.ARCHIVED && (
                             <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setArchivingCycle(cycle);
                                }}
                                title="Archive Cycle"
                                className="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-red-500 dark:hover:text-red-400"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CyclesView;