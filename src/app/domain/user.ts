export interface LoginRequest {
  userName: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  userName: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  username: string;
  email: string;
  rol: string;
}

export interface User {
  id?: number;
  name: string;
  userName: string;
  email: string;
  rol: string;
}