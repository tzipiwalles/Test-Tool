import React, { useState, useMemo, useEffect } from 'react';
import { Test, Priority, TestStep } from '../types';
import { useData } from './DataContext';
import { XCircleIcon } from './icons/XCircleIcon';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { SaveIcon } from './icons/SaveIcon';
import { CheckIcon } from './icons/CheckIcon';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';
import { CircleIcon } from './icons/CircleIcon';
import { TrashIcon } from './icons/TrashIcon';
import { PlusIcon } from './icons/PlusIcon';
import { GoogleGenAI, Type } from '@google/genai';
import { SparklesIcon } from './icons/SparklesIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

type ReviewStatus = 'pending' | 'approved' | 'needs_changes';

interface AISuggestions {
    name: string;
    description: string;
    steps: TestStep[];
}

const SuggestionSection: React.FC<{
    title: string;
    original: string | TestStep[];
    suggestion: string | TestStep[];
    onAccept: () => void;
    isAccepted: boolean;
}> = ({ title, original, suggestion, onAccept, isAccepted }) => {

    const renderContent = (content: string | TestStep[]) => {
        if (typeof content === 'string') {
            return <p className="text-sm whitespace-pre-wrap">{content || 'N/A'}</p>;
        }
        return (
            <div className="space-y-2">
                {content.map((step, index) => (
                    <div key={index} className="text-sm">
                        <p><strong>{step.step_no}. Action:</strong> {step.action}</p>
                        <p className="pl-4"><strong>Expected:</strong> {step.expected}</p>
                    </div>
                ))}
            </div>
        );
    };

    const isDifferent = JSON.stringify(original) !== JSON.stringify(suggestion);

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
            <header className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50">
                <h4 className="font-semibold">{title}</h4>
                {isDifferent && (
                    isAccepted ? (
                        <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">
                           <CheckCircleIcon className="w-4 h-4" />
                           <span className="text-sm font-medium">Accepted</span>
                        </div>
                    ) : (
                         <button onClick={onAccept} className="px-3 py-1 text-sm rounded-md bg-blue-accent text-white hover:bg-blue-600">Accept</button>
                    )
                )}
            </header>
            {isDifferent ? (
                 <div className="grid grid-cols-2 gap-px bg-gray-200 dark:bg-gray-700">
                    <div className="p-3 bg-white dark:bg-gray-800">
                        <h5 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-2">Current</h5>
                        {renderContent(original)}
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20">
                        <h5 className="text-xs font-bold uppercase text-blue-600 dark:text-blue-300 mb-2">Suggestion</h5>
                        {renderContent(suggestion)}
                    </div>
                </div>
            ) : (
                <div className="p-3 text-sm text-gray-500 dark:text-gray-400 italic">No changes suggested.</div>
            )}
        </div>
    );
};


const AISuggestionsModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    test: Test;
    suggestions: AISuggestions | null;
    status: 'loading' | 'error' | 'idle';
    onAccept: (field: keyof AISuggestions, value: any) => void;
}> = ({ isOpen, onClose, test, suggestions, status, onAccept }) => {
    const [acceptedFields, setAcceptedFields] = useState<Set<keyof AISuggestions>>(new Set());

    useEffect(() => {
        // Reset accepted fields when a new set of suggestions comes in
        setAcceptedFields(new Set());
    }, [suggestions]);
    
    if (!isOpen) return null;

    const handleAccept = (field: keyof AISuggestions) => {
        if (!suggestions) return;
        onAccept(field, suggestions[field]);
        setAcceptedFields(prev => new Set(prev).add(field));
    };

    return (
         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onMouseDown={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col text-gray-900 dark:text-white" onMouseDown={(e) => e.stopPropagation()}>
                <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold flex items-center"><SparklesIcon className="w-5 h-5 mr-2 text-purple-500"/> AI Suggestions for "{test.name}"</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">&times;</button>
                </header>

                <main className="flex-1 p-6 overflow-y-auto space-y-4">
                    {status === 'loading' && (
                        <div className="flex flex-col items-center justify-center h-full">
                            <svg className="animate-spin h-8 w-8 text-blue-accent mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p>Analyzing test case and generating suggestions...</p>
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="flex flex-col items-center justify-center h-full text-red-600 dark:text-red-400">
                            <AlertTriangleIcon className="w-12 h-12 mb-4" />
                            <p className="font-semibold">Failed to get AI suggestions.</p>
                            <p className="text-sm">Please try again later.</p>
                        </div>
                    )}
                    {status === 'idle' && suggestions && (
                        <>
                            <SuggestionSection title="Test Name" original={test.name} suggestion={suggestions.name} onAccept={() => handleAccept('name')} isAccepted={acceptedFields.has('name')} />
                            <SuggestionSection title="Description" original={test.description} suggestion={suggestions.description} onAccept={() => handleAccept('description')} isAccepted={acceptedFields.has('description')} />
                            <SuggestionSection title="Steps" original={test.steps} suggestion={suggestions.steps} onAccept={() => handleAccept('steps')} isAccepted={acceptedFields.has('steps')} />
                        </>
                    )}
                </main>
                
                <footer className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100">Done</button>
                </footer>
            </div>
        </div>
    );
};

const PriorityBadge: React.FC<{ priority: Priority }> = ({ priority }) => {
    const styles = {
        [Priority.P0]: 'bg-red-500 border-red-500',
        [Priority.P1]: 'bg-orange-500 border-orange-500',
        [Priority.P2]: 'bg-yellow-500 border-yellow-500',
        [Priority.P3]: 'bg-blue-500 border-blue-500',
    };
    return <span className={`px-2 py-0.5 text-xs font-semibold text-white rounded-full border ${styles[priority]}`}>{priority}</span>
}

const ReviewStatusIcon: React.FC<{ status: ReviewStatus }> = ({ status }) => {
    switch (status) {
        case 'approved':
            return <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0"><title>Approved</title></CheckIcon>;
        case 'needs_changes':
            return <AlertTriangleIcon className="w-5 h-5 text-yellow-500 flex-shrink-0"><title>Needs Changes</title></AlertTriangleIcon>;
        case 'pending':
        default:
            return <CircleIcon className="w-5 h-5 text-gray-400 flex-shrink-0"><title>Pending</title></CircleIcon>;
    }
}

const TestPlanReviewView: React.FC<{ testIds: string[], onEndReview: () => void }> = ({ testIds, onEndReview }) => {
    const { tests, setTests, permissions, currentUser } = useData();

    const reviewTests = useMemo(() => {
      // Preserve the order of testIds from the selection
      const testsById = new Map(tests.map(t => [t.id, t]));
      return testIds.map(id => testsById.get(id)).filter((t): t is Test => !!t);
    }, [tests, testIds]);
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [reviewStatuses, setReviewStatuses] = useState<Record<string, ReviewStatus>>(() => 
        testIds.reduce((acc, id) => ({ ...acc, [id]: 'pending' }), {})
    );

    const activeTest = useMemo(() => reviewTests[currentIndex], [reviewTests, currentIndex]);

    const [editableTest, setEditableTest] = useState<Test | null>(null);

    // AI Feature State
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [aiSuggestions, setAiSuggestions] = useState<AISuggestions | null>(null);
    const [aiReviewStatus, setAiReviewStatus] = useState<'idle' | 'loading' | 'error'>('idle');


    useEffect(() => {
        if (activeTest) {
            setEditableTest(JSON.parse(JSON.stringify(activeTest)));
        }
    }, [activeTest]);

    const hasChanges = useMemo(() => {
        if (!activeTest || !editableTest) return false;
        return JSON.stringify(activeTest) !== JSON.stringify(editableTest);
    }, [activeTest, editableTest]);

    const handleSaveChanges = () => {
        if (!editableTest || !hasChanges) return;
        setTests(prevTests => prevTests.map(t => t.id === editableTest.id ? { ...editableTest, updatedAt: new Date().toLocaleDateString(), updatedBy: currentUser?.displayName || 'System' } : t));
    };

    const nextTest = () => {
        if (hasChanges && !window.confirm("You have unsaved changes. Are you sure you want to proceed without saving?")) {
            return;
        }
        setCurrentIndex(prev => (prev + 1) % reviewTests.length);
    };

    const prevTest = () => {
        if (hasChanges && !window.confirm("You have unsaved changes. Are you sure you want to proceed without saving?")) {
            return;
        }
        setCurrentIndex(prev => (prev - 1 + reviewTests.length) % reviewTests.length);
    };
    
    const setStatus = (testId: string, status: ReviewStatus) => {
        setReviewStatuses(prev => ({...prev, [testId]: status}));
    };
    
    const handleFieldChange = (field: keyof Test, value: any) => {
        if (!editableTest) return;
        setEditableTest(prev => prev ? {...prev, [field]: value} : null);
    };

    const handleLabelsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editableTest) return;
        setEditableTest(prev => prev ? ({...prev, labels: e.target.value.split(',').map(l => l.trim())}) : null);
    }
    
    const handleStepChange = (index: number, field: 'action' | 'expected', value: string) => {
        if (!editableTest) return;
        const newSteps = [...(editableTest.steps || [])];
        newSteps[index] = { ...newSteps[index], [field]: value, step_no: index + 1 };
        setEditableTest(prev => prev ? ({ ...prev, steps: newSteps }) : null);
    };
    
    const addStep = () => {
        if (!editableTest) return;
        const newSteps = [...(editableTest.steps || [])];
        newSteps.push({ step_no: newSteps.length + 1, action: '', expected: '' });
        setEditableTest(prev => prev ? ({ ...prev, steps: newSteps }) : null);
    };
    
    const removeStep = (index: number) => {
        if (!editableTest) return;
        const newSteps = [...(editableTest.steps || [])].filter((_, i) => i !== index).map((s, i) => ({ ...s, step_no: i + 1 }));
        setEditableTest(prev => prev ? ({ ...prev, steps: newSteps }) : null);
    };

    const handleAiReview = async () => {
        if (!editableTest) return;
        setIsAiModalOpen(true);
        setAiReviewStatus('loading');
        setAiSuggestions(null);

        const test = editableTest;
        const prompt = `You are a world-class Senior QA Engineer specializing in writing clear, concise, and effective test cases.
    Review the following test case and provide suggestions for improvement.
    Your goal is to make the test case easier to understand, more precise, and more effective.
    Provide suggestions for the name, description, and each step. If a field is already good and needs no changes, return the original content for that field.
    For steps, review both the 'action' and 'expected' result. Ensure actions are imperative commands and expected results are verifiable outcomes.
    Return your suggestions in a JSON format that adheres to the provided schema.

    Here is the test case:
    Name: ${test.name}
    Description: ${test.description}
    Steps:
    ${test.steps.map(s => `${s.step_no}. Action: ${s.action}\n   Expected: ${s.expected}`).join('\n')}
    `;

        const schema = {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Suggested test case name." },
            description: { type: Type.STRING, description: "Suggested test case description." },
            steps: {
              type: Type.ARRAY,
              description: "Array of suggested test steps, maintaining original step numbers.",
              items: {
                type: Type.OBJECT,
                properties: {
                  step_no: { type: Type.INTEGER },
                  action: { type: Type.STRING },
                  expected: { type: Type.STRING },
                },
                required: ['step_no', 'action', 'expected'],
              },
            },
          },
          required: ['name', 'description', 'steps'],
        };

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: { responseMimeType: 'application/json', responseSchema: schema },
            });
            
            const jsonStr = response.text.trim();
            const suggestions = JSON.parse(jsonStr) as AISuggestions;
            
            if (suggestions.steps) {
                suggestions.steps.sort((a, b) => a.step_no - b.step_no);
            }

            setAiSuggestions(suggestions);
            setAiReviewStatus('idle');
        } catch (error) {
            console.error("AI review failed:", error);
            setAiReviewStatus('error');
        }
    };

    const handleAcceptSuggestion = (field: keyof AISuggestions, value: any) => {
        handleFieldChange(field, value);
    };
    
    const closeAiModal = () => {
        setIsAiModalOpen(false);
        setAiReviewStatus('idle');
        setAiSuggestions(null);
    }

    if (!activeTest || !editableTest) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-200">
                <p className="mb-4">No tests selected for review or selected tests could not be found.</p>
                <button onClick={onEndReview} className="px-4 py-2 rounded-md bg-blue-accent text-white hover:bg-blue-600">
                  Back to Test Library
                </button>
            </div>
        );
    }
    
    const canEdit = permissions.canEditLibrary;

    return (
        <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-200 font-sans">
            <AISuggestionsModal 
                isOpen={isAiModalOpen}
                onClose={closeAiModal}
                test={editableTest}
                suggestions={aiSuggestions}
                status={aiReviewStatus}
                onAccept={handleAcceptSuggestion}
            />

            <aside className="w-1/4 max-w-sm flex flex-col bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
                <header className="p-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
                    <h2 className="text-lg font-bold">Test Plan Review</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{reviewTests.length} tests to review</p>
                </header>
                <div className="flex-1 overflow-y-auto">
                    {reviewTests.map((test, index) => (
                        <button 
                            key={test.id} 
                            onClick={() => setCurrentIndex(index)}
                            className={`w-full text-left p-3 flex items-center space-x-3 border-l-4 ${
                                currentIndex === index 
                                ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-accent' 
                                : 'border-transparent hover:bg-gray-200/50 dark:hover:bg-gray-800/50'
                            }`}
                        >
                           <ReviewStatusIcon status={reviewStatuses[test.id]} />
                           <div className="flex-1 overflow-hidden">
                                <p className="font-medium truncate">{test.name}</p>
                           </div>
                           <PriorityBadge priority={test.priority} />
                        </button>
                    ))}
                </div>
            </aside>
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
                    <h1 className="text-2xl font-bold truncate">
                        <span className="text-gray-400 font-normal">{currentIndex + 1} / {reviewTests.length}</span>
                        <span className="mx-2 text-gray-300 dark:text-gray-700">|</span>
                        {activeTest.name}
                    </h1>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handleAiReview}
                            disabled={aiReviewStatus === 'loading'}
                            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/50 disabled:opacity-50 disabled:cursor-wait"
                        >
                            {aiReviewStatus === 'loading' ? (
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <SparklesIcon className="w-5 h-5" />
                            )}
                            <span>AI Review</span>
                        </button>
                        <button onClick={onEndReview} className="flex items-center space-x-2 px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                            <XCircleIcon className="w-5 h-5" />
                            <span>End Review</span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <fieldset disabled={!canEdit} className="space-y-6 disabled:opacity-70">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Test Name</label>
                            <input type="text" value={editableTest.name} onChange={(e) => handleFieldChange('name', e.target.value)} className="mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-blue-accent focus:border-blue-accent disabled:bg-gray-100 dark:disabled:bg-gray-800/50"/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Description</label>
                            <textarea value={editableTest.description} onChange={(e) => handleFieldChange('description', e.target.value)} rows={4} className="mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-blue-accent focus:border-blue-accent disabled:bg-gray-100 dark:disabled:bg-gray-800/50"></textarea>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Priority</label>
                                <select value={editableTest.priority} onChange={(e) => handleFieldChange('priority', e.target.value)} className="mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-blue-accent focus:border-blue-accent disabled:bg-gray-100 dark:disabled:bg-gray-800/50">
                                    {Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Affected Object Type</label>
                                <input type="text" value={editableTest.affectedObjectType || ''} onChange={(e) => handleFieldChange('affectedObjectType', e.target.value)} className="mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-blue-accent focus:border-blue-accent disabled:bg-gray-100 dark:disabled:bg-gray-800/50" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Test Method</label>
                                <input type="text" value={editableTest.testMethod || ''} onChange={(e) => handleFieldChange('testMethod', e.target.value)} className="mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-blue-accent focus:border-blue-accent disabled:bg-gray-100 dark:disabled:bg-gray-800/50" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Labels (comma-separated)</label>
                                <input type="text" value={editableTest.labels.join(', ')} onChange={handleLabelsChange} className="mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-blue-accent focus:border-blue-accent disabled:bg-gray-100 dark:disabled:bg-gray-800/50" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-md font-medium text-gray-600 dark:text-gray-300 mb-2">Steps</h3>
                             <div className="space-y-3">
                                {editableTest.steps?.map((step, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-100/50 dark:bg-gray-900/50 rounded-lg">
                                        <span className="text-lg font-bold text-gray-400 dark:text-gray-500 pt-1">{index + 1}.</span>
                                        <div className="flex-1 space-y-2">
                                            <textarea placeholder="Action" value={step.action} onChange={e => handleStepChange(index, 'action', e.target.value)} rows={3} className="w-full text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 focus:ring-blue-accent focus:border-blue-accent disabled:bg-gray-100 dark:disabled:bg-gray-800/50"></textarea>
                                            <textarea placeholder="Expected Result" value={step.expected} onChange={e => handleStepChange(index, 'expected', e.target.value)} rows={2} className="w-full text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 focus:ring-blue-accent focus:border-blue-accent disabled:bg-gray-100 dark:disabled:bg-gray-800/50"></textarea>
                                        </div>
                                        {canEdit && <button type="button" onClick={() => removeStep(index)} className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 p-1 mt-1"><TrashIcon className="w-4 h-4"/></button>}
                                    </div>
                                ))}
                             </div>
                             {canEdit && <button type="button" onClick={addStep} className="mt-3 flex items-center text-sm text-blue-500 dark:text-blue-400 hover:underline"><PlusIcon className="w-4 h-4 mr-1"/>Add Step</button>}
                        </div>
                    </fieldset>
                </div>

                <footer className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800/50 flex-shrink-0">
                    <div className="flex items-center space-x-2">
                        <button onClick={prevTest} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                            <ChevronLeftIcon className="w-6 h-6"/>
                        </button>
                        <button onClick={nextTest} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                            <ChevronRightIcon className="w-6 h-6"/>
                        </button>
                    </div>
                    <div className="flex items-center space-x-3">
                       <button onClick={() => setStatus(activeTest.id, 'needs_changes')} className="flex items-center space-x-2 px-4 py-2 rounded-md bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800/50">
                            <AlertTriangleIcon className="w-5 h-5"/> <span>Request Changes</span>
                       </button>
                       <button onClick={() => setStatus(activeTest.id, 'approved')} className="flex items-center space-x-2 px-4 py-2 rounded-md bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800/50">
                            <CheckIcon className="w-5 h-5"/> <span>Approve</span>
                       </button>
                       {canEdit && (
                        <button onClick={handleSaveChanges} disabled={!hasChanges} className="flex items-center space-x-2 px-4 py-2 rounded-md bg-blue-accent text-white hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed">
                                <SaveIcon className="w-5 h-5"/> <span>Save Changes</span>
                                {hasChanges && <span className="w-2 h-2 rounded-full bg-white ml-2"></span>}
                        </button>
                       )}
                    </div>
                </footer>
            </main>
        </div>
    );
}

export default TestPlanReviewView;