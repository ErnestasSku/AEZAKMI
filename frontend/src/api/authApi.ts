import axios from 'axios';
import { LoginRequest, LoginResponse, RegisterUserRequest } from '.';

export const login = async (request: LoginRequest) =>
  axios.post<LoginRequest, LoginResponse>('/api/login', request);

export const registerUser = (request: RegisterUserRequest) =>
  axios.post('/api/signup', request);
