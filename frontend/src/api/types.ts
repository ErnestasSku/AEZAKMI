export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  role_id: unknown;
}

export interface RegisterUserRequest {
  username: string;
  email: string;
  password: string;
}