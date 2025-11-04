import React, { useState, useRef, useEffect } from 'react';
import { useData } from './DataContext';
import { UserIcon } from './icons/UserIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { User, UserRole } from '../types';
import { LogoIcon } from './icons/LogoIcon';

const getRoleName = (role: UserRole) => {
    switch (role) {
        case UserRole.MAINTAINER: return 'Maintainer';
        case UserRole.VALIDATION_LEAD: return 'Validation Lead';
        case UserRole.ANALYST: return 'Analyst';
        case UserRole.VIEWER: return 'Viewer';
        default: return 'User';
    }
};

const UserAvatar: React.FC<{ user: User | null }> = ({ user }) => {
    const initials = user ? user.displayName.split(' ').map(n => n[0]).join('') : '?';
    const colors = ['#f87171', '#fb923c', '#fbbf24', '#a3e635', '#4ade80', '#34d399', '#2dd4bf', '#22d3ee', '#38bdf8', '#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#e879f9', '#f472b6'];
    const colorIndex = user ? user.displayName.charCodeAt(0) % colors.length : 0;
    const bgColor = colors[colorIndex];
    
    return (
        <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ backgroundColor: bgColor }}
        >
            {initials}
        </div>
    );
};


const Header: React.FC = () => {
  const { currentUser, users, setCurrentUser } = useData();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUserSelect = (user: User) => {
      setCurrentUser(user);
      setIsDropdownOpen(false);
  }

  return (
    <header className="flex-shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center justify-between px-6">
        <div className="flex items-center space-x-2">
            <LogoIcon className="h-8 w-8 text-blue-accent" />
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">QualityLane</h1>
        </div>
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
                <UserAvatar user={currentUser} />
                <div className="text-left hidden md:block">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{currentUser?.displayName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{getRoleName(currentUser?.role || UserRole.VIEWER)}</p>
                </div>
                <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 animate-fade-in-down">
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold">{currentUser?.displayName}</p>
                        <p className="text-xs text-gray-500">{currentUser?.email}</p>
                    </div>
                    <div className="py-2">
                        <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase">Switch User</p>
                        {users.filter(u => u.id !== currentUser?.id).map(user => (
                            <button 
                                key={user.id} 
                                onClick={() => handleUserSelect(user)}
                                className="w-full text-left flex items-center space-x-3 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <UserAvatar user={user} />
                                <div className="flex-1">
                                    <p className="font-semibold">{user.displayName}</p>
                                    <p className="text-xs text-gray-500">{getRoleName(user.role)}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </header>
  );
};

export default Header;