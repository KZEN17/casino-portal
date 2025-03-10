import { MARKETS } from "../constants";


export type Market = typeof MARKETS[number];

export interface User {
  id: string;
  username: string;
  country: Market;
  firstName: string;
  lastName: string;
  password?: string; // Optional as we don't want to expose it in the UI
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
}

export interface Game {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  provider: string;
  categories: string[];
  markets: Market[];
}