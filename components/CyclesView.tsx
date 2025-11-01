
import React, { useState } from 'react';
import { Cycle, CycleItem, CycleItemResult, CycleStatus, Scope, ScopeName } from '../types';
import CycleBuilder from './CycleBuilder';
import { PlusIcon } from './icons/PlusIcon';
import { useData } from './DataContext';

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
  const notRun = getCount(CycleItemResult.NOT_RUN);

  return (
      <div className="flex w-full h-2.5 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700" title={`Passed: ${passed}, Failed: ${failed}, Blocked: ${blocked}, Not Run: ${notRun}`}>
        <div className="bg-green-500" style={{ width: `${(passed / total) * 100}%` }}></div>
        <div className="bg-red-500" style={{ width: `${(failed / total) * 100}%` }}></div>
        <div className="bg-yellow-500" style={{ width: `${(blocked / total) * 100}%` }}></div>
      </div>
  );
};


const CyclesView: React.FC = () => {
  const { cycles, setCycles, cycleItems, setScopes } = useData();
  const [selectedCycle, setSelectedCycle] = useState<Cycle | null>(null);
  const [isNewCycleModalOpen, setIsNewCycleModalOpen] = useState(false);

  const handleCreateCycle = (cycleData: { name: string; description: string; labels: string }) => {
    const newCycle: Cycle = {
      id: `c-${Date.now()}`,
      name: cycleData.name,
      description: cycleData.description,
      labels: cycleData.labels.split(',').map(l => l.trim()).filter(Boolean),
      status: CycleStatus.DRAFT,
      updatedAt: new Date().toLocaleDateString(),
    };
    setCycles(prev => [newCycle, ...prev]);

    const newScope: Scope = {
      id: `s-${Date.now()}`,
      cycleId: newCycle.id,
      name: ScopeName.NONE,
    };
    setScopes(prev => [...prev, newScope]);
    
    setIsNewCycleModalOpen(false);
  };

  const handleUpdateCycle = (updatedCycle: Cycle) => {
    setCycles(prev => prev.map(c => c.id === updatedCycle.id ? updatedCycle : c));
    setSelectedCycle(updatedCycle);
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
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Test Cycles</h1>
        <button 
          onClick={() => setIsNewCycleModalOpen(true)}
          className="flex items-center bg-blue-accent text-white px-4 py-1.5 rounded-md hover:bg-blue-600 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          New Cycle
        </button>
      </header>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-gray-50 dark:bg-gray-950">
            <tr>
              <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Name</th>
              <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Status</th>
              <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Progress</th>
              <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {cycles.map(cycle => (
              <tr 
                key={cycle.id} 
                className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => setSelectedCycle(cycle)}
              >
                <td className="p-3 font-medium">{cycle.name}</td>
                <td className="p-3"><CycleStatusBadge status={cycle.status} /></td>
                <td className="p-3 w-1/3"><CycleProgress items={cycleItems.filter(item => item.cycleId === cycle.id)} /></td>
                <td className="p-3 text-gray-500 dark:text-gray-400">{cycle.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CyclesView;