import axios from 'axios';
import { RegisterUserRequest, User, Video } from '.';

export const fetchAllUsers = () => axios.get<unknown, { data: User[] }>('/api/users');

export const registerUser = (request: RegisterUserRequest) => axios.post('/api/users', request)

export const fetchAllVideoPreviews = () => axios.get<unknown, { data: Video[] }>('/api/videos');

export const fetchVideo = (id: string) => axios.get<unknown, { data: Video }>(`/api/videos/${id}`);