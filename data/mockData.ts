import { User, UserRole, UUID } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-1' as UUID,
    displayName: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    role: UserRole.MAINTAINER,
  },
  {
    id: 'user-2' as UUID,
    displayName: 'Michael Rodriguez',
    email: 'michael.rodriguez@example.com',
    role: UserRole.VALIDATION_LEAD,
  },
  {
    id: 'user-3' as UUID,
    displayName: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    role: UserRole.ANALYST,
  },
  {
    id: 'user-4' as UUID,
    displayName: 'David Kim',
    email: 'david.kim@example.com',
    role: UserRole.VIEWER,
  },
  {
    id: 'user-5' as UUID,
    displayName: 'Alex Thompson',
    email: 'alex.thompson@example.com',
    role: UserRole.ANALYST,
  },
];
