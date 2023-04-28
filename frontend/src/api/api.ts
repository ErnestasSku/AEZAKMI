import axios from 'axios';
import { User } from '.';

export const fetchAllUsers = () => axios.get<{}, { data: User[] }>('/api/users');
