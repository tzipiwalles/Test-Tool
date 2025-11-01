
import React from 'react';
import { Test } from '../types';

export const TestDetailView: React.FC<{ test: Test }> = ({ test }) => {
  return (
    <div className="px-16 py-4">
        <div className="mb-6">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Description</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{test.description || 'No description provided.'}</p>
        </div>
        <div>
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Steps</h4>
            {test.steps.length > 0 ? (
                <div className="space-y-4">
                    {test.steps.map((step) => (
                        <div key={step.step_no} className="flex text-sm">
                            <div className="text-gray-400 dark:text-gray-500 font-medium w-8 flex-shrink-0 pt-0.5">{step.step_no}.</div>
                            <div className="flex-1">
                                <p className="text-gray-800 dark:text-gray-200">{step.action}</p>
                                {step.expected && (
                                    <div className="mt-1.5 pl-4 border-l-2 border-gray-300 dark:border-gray-700">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <span className="font-semibold text-gray-500 dark:text-gray-500">Expected:</span> {step.expected}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-400 dark:text-gray-500">No steps defined for this test.</p>
            )}
        </div>
    </div>
  );
};