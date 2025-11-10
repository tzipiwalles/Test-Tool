import React, { useState } from 'react';
import { useData } from './DataContext';
import { User, UserRole } from '../types';
import { UserIcon } from './icons/UserIcon';

const roleLabels: Record<UserRole, string> = {
  [UserRole.VIEWER]: 'Viewer',
  [UserRole.ANALYST]: 'Analyst',
  [UserRole.VALIDATION_LEAD]: 'Validation Lead',
  [UserRole.MAINTAINER]: 'Maintainer',
};

const roleDescriptions: Record<UserRole, string> = {
  [UserRole.VIEWER]: 'Can view tests and cycles, but cannot make any changes',
  [UserRole.ANALYST]: 'Can run tests, add notes, and update test results',
  [UserRole.VALIDATION_LEAD]: 'Can create and edit cycles, run tests, and manage test execution',
  [UserRole.MAINTAINER]: 'Full access - can edit test library, manage cycles, and configure system',
};

const rolePermissions: Record<UserRole, string[]> = {
  [UserRole.VIEWER]: ['View test library', 'View test cycles', 'View notes'],
  [UserRole.ANALYST]: ['View test library', 'View test cycles', 'Run tests', 'Add notes', 'Update test results'],
  [UserRole.VALIDATION_LEAD]: ['View test library', 'View test cycles', 'Create cycles', 'Edit cycles', 'Run tests', 'Add notes', 'Update test results'],
  [UserRole.MAINTAINER]: ['All permissions', 'Edit test library', 'Create cycles', 'Edit cycles', 'Run tests', 'Add notes', 'Update test results', 'Manage user permissions'],
};

export const UserPermissionsView: React.FC = () => {
  const { users, setUsers, currentUser, permissions } = useData();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const selectedUser = users ? users.find(u => u.id === selectedUserId) : null;

  // Handle case where users haven't loaded yet
  if (!users || users.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="mb-4 text-gray-400 dark:text-gray-600">
            <UserIcon className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No Users Found
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            User data is still loading or unavailable.
          </p>
        </div>
      </div>
    );
  }

  // Only maintainers can access this view
  if (!permissions.canEditLibrary) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="mb-4 text-gray-400 dark:text-gray-600">
            <UserIcon className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            You need Maintainer permissions to access user settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">User Permissions</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage user roles and access permissions
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Users List */}
        <div className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Users ({users.length})
            </h2>
            <div className="space-y-2">
              {users.map(user => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUserId(user.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors duration-150 ${
                    selectedUserId === user.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-accent'
                      : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-accent flex items-center justify-center text-white font-medium">
                        {user.displayName.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {user.displayName}
                          {user.id === currentUser?.id && (
                            <span className="ml-2 text-xs text-blue-accent">(You)</span>
                          )}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 font-medium">
                        {roleLabels[user.role]}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedUser ? (
            <div className="max-w-3xl">
              {/* User Info */}
              <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 mb-6">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-accent flex items-center justify-center text-white font-medium text-2xl">
                    {selectedUser.displayName.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {selectedUser.displayName}
                      {selectedUser.id === currentUser?.id && (
                        <span className="ml-2 text-sm text-blue-accent">(Current User)</span>
                      )}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedUser.email}</p>
                  </div>
                </div>

                {/* Role Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    User Role
                  </label>
                  <div className="space-y-2">
                    {Object.values(UserRole).map(role => (
                      <label
                        key={role}
                        className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-150 ${
                          selectedUser.role === role
                            ? 'border-blue-accent bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={role}
                          checked={selectedUser.role === role}
                          onChange={() => handleRoleChange(selectedUser.id, role)}
                          disabled={selectedUser.id === currentUser?.id}
                          className="mt-1 h-4 w-4 text-blue-accent focus:ring-blue-accent border-gray-300 dark:border-gray-600"
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {roleLabels[role]}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {roleDescriptions[role]}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {selectedUser.id === currentUser?.id && (
                    <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 italic">
                      You cannot change your own role. Ask another maintainer to update your permissions.
                    </p>
                  )}
                </div>
              </div>

              {/* Permissions Summary */}
              <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Permissions for {roleLabels[selectedUser.role]}
                </h3>
                <ul className="space-y-2">
                  {rolePermissions[selectedUser.role].map((permission, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {permission}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <UserIcon className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Select a user to view and manage their permissions
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
