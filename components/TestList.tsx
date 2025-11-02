
import React, { useState } from 'react';
import { Test, Priority, TestStatus } from '../types';
import { MoreHorizontalIcon } from './icons/MoreHorizontalIcon';
import { ArchiveIcon } from './icons/ArchiveIcon';
import { EditIcon } from './icons/EditIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { TestDetailView } from './TestDetailView';
import { CopyIcon } from './icons/CopyIcon';

const PriorityBadge: React.FC<{ priority: Priority }> = ({ priority }) => {
    const styles = {
        [Priority.P0]: 'bg-red-500 border-red-500',
        [Priority.P1]: 'bg-orange-500 border-orange-500',
        [Priority.P2]: 'bg-yellow-500 border-yellow-500',
        [Priority.P3]: 'bg-blue-500 border-blue-500',
    };
    return <span className={`px-2 py-0.5 text-xs font-semibold text-white rounded-full border ${styles[priority]}`}>{priority}</span>
}

interface TestListProps {
  tests: Test[];
  onEdit: (test: Test) => void;
  onArchive: (test: Test) => void;
  onDuplicate: (test: Test) => void;
  selectedTestIds: Set<string>;
  onSelectTest: (testId: string) => void;
  onSelectAllTests: () => void;
  canEdit: boolean;
}

const TestList: React.FC<TestListProps> = ({ tests, onEdit, onArchive, onDuplicate, selectedTestIds, onSelectTest, onSelectAllTests, canEdit }) => {
  const [expandedTestId, setExpandedTestId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, testId: string) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ type: 'test', id: testId }));
  };

  const allVisibleSelected = tests.length > 0 && tests.every(t => selectedTestIds.has(t.id));

  if (tests.length === 0) {
    return <div className="text-center text-gray-500 mt-10">No tests found.</div>
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <table className="w-full text-left">
        <thead className="sticky top-0 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm z-10">
          <tr>
            <th className="py-2 px-3 w-16">
               <input
                type="checkbox"
                checked={allVisibleSelected}
                onChange={onSelectAllTests}
                className="h-4 w-4 bg-gray-200 dark:bg-gray-700 border-gray-400 dark:border-gray-600 rounded text-blue-accent focus:ring-blue-accent focus:ring-offset-white dark:focus:ring-offset-gray-900 ml-8"
              />
            </th>
            <th className="py-2 px-3 text-sm font-semibold text-gray-500 dark:text-gray-400 w-2/5">Name</th>
            <th className="py-2 px-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Affected Object</th>
            <th className="py-2 px-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Labels</th>
            <th className="py-2 px-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Priority</th>
            <th className="py-2 px-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Last Updated</th>
            <th className="py-2 px-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Status</th>
            <th className="py-2 px-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tests.map(test => {
            const isExpanded = expandedTestId === test.id;
            return (
                <React.Fragment key={test.id}>
                    <tr 
                        className={`border-b border-gray-200 dark:border-gray-800 ${selectedTestIds.has(test.id) ? 'bg-blue-accent/20' : 'hover:bg-gray-100/60 dark:hover:bg-gray-800/60'}`}
                        draggable={canEdit}
                        onDragStart={(e) => canEdit && handleDragStart(e, test.id)}
                    >
                        <td className="py-1.5 px-3">
                            <div className="flex items-center space-x-2">
                                <button 
                                    onClick={() => setExpandedTestId(isExpanded ? null : test.id)}
                                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                                    title={isExpanded ? "Collapse" : "Expand"}
                                >
                                    <ChevronRightIcon className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                                </button>
                                <input
                                    type="checkbox"
                                    checked={selectedTestIds.has(test.id)}
                                    onChange={() => onSelectTest(test.id)}
                                    className="h-4 w-4 bg-gray-200 dark:bg-gray-700 border-gray-400 dark:border-gray-600 rounded text-blue-accent focus:ring-blue-accent focus:ring-offset-white dark:focus:ring-offset-gray-900"
                                />
                            </div>
                        </td>
                        <td className="py-1.5 px-3 font-medium text-sm text-gray-900 dark:text-gray-100">{test.name}</td>
                        <td className="py-1.5 px-3 text-sm text-gray-600 dark:text-gray-400">{test.affectedObjectType}</td>
                        <td className="py-1.5 px-3">
                            <div className="flex flex-wrap gap-1">
                                {test.labels.slice(0, 3).map(label => (
                                    <span key={label} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 text-xs rounded-md">{label}</span>
                                ))}
                                {test.labels.length > 3 && <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 text-xs rounded-md">+{test.labels.length - 3}</span>}
                            </div>
                        </td>
                        <td className="py-1.5 px-3"><PriorityBadge priority={test.priority} /></td>
                        <td className="py-1.5 px-3 text-sm text-gray-600 dark:text-gray-400">{test.updatedAt}</td>
                        <td className="py-1.5 px-3 text-sm">
                            <span className={`capitalize ${test.status === TestStatus.ARCHIVED ? 'text-gray-400 dark:text-gray-500' : 'text-green-600 dark:text-green-400'}`}>
                            {test.status}
                            </span>
                        </td>
                        <td className="py-1.5 px-3">
                            <div className="flex items-center space-x-1">
                                {canEdit ? (
                                    <>
                                        <button onClick={() => onEdit(test)} title="Edit Test" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"><EditIcon className="w-4 h-4" /></button>
                                        <button onClick={() => onDuplicate(test)} title="Duplicate Test" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"><CopyIcon className="w-4 h-4" /></button>
                                        {test.status !== TestStatus.ARCHIVED &&
                                        <button onClick={() => onArchive(test)} title="Archive Test" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"><ArchiveIcon className="w-4 h-4" /></button>
                                        }
                                    </>
                                ) : (
                                    <span className="text-xs text-gray-400 dark:text-gray-500 italic">Read-only</span>
                                )}
                            </div>
                        </td>
                    </tr>
                    {isExpanded && (
                        <tr className="bg-gray-100/50 dark:bg-gray-800/30">
                            <td colSpan={8} className="p-0">
                                <TestDetailView test={test} />
                            </td>
                        </tr>
                    )}
                </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TestList;