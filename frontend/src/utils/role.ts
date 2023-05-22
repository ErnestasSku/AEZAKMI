import { Role } from '../api';

export const roleToString = (role?: Role) => {
  switch (role) {
    case 'ADMIN':
      return 'Admin';
    case 'TEACHER':
      return 'Teacher';
    default:
    case 'USER':
      return 'User';
  }
};
