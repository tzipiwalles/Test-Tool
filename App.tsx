
import React, { useState } from 'react';
import TestLibraryView from './components/TestLibraryView';
import CyclesView from './components/CyclesView';
import { ArchiveIcon } from './components/icons/ArchiveIcon';
import { PlayIcon } from './components/icons/PlayIcon';
import { useData } from './components/DataContext';
import { SunIcon } from './components/icons/SunIcon';
import { MoonIcon } from './components/icons/MoonIcon';
import Header from './components/Header';

type View = 'library' | 'cycles';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('library');
  const { theme, toggleTheme } = useData();

  const navItems = [
    { id: 'library', label: 'Test Library', icon: <ArchiveIcon /> },
    { id: 'cycles', label: 'Test Cycles', icon: <PlayIcon /> },
  ];

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-200 font-sans">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <nav className="flex flex-col items-center w-20 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 py-4">
          <div className="text-blue-accent font-bold text-2xl mb-10">C</div>
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as View)}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 ${
                  currentView === item.id
                    ? 'bg-blue-accent text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
                title={item.label}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label.split(' ')[1]}</span>
              </button>
            ))}
          </div>

          <div className="mt-auto">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center p-2 rounded-lg transition-colors duration-200 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        <main className="flex-1 flex flex-col overflow-hidden">
          {currentView === 'library' && <TestLibraryView />}
          {currentView === 'cycles' && <CyclesView />}
        </main>
      </div>
    </div>
  );
};

export default App;
