import axios from 'axios';
import { RegisterUserRequest, User, Video } from '.';

export const fetchAllUsers = () => axios.get<unknown, { data: User[] }>('/api/users');

export const registerUser = (request: RegisterUserRequest) => axios.post('/api/users', request)

export const fetchAllVideos = () => axios.get<unknown, { data: Video[] }>('/api/videos');