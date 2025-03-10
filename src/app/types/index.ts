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
  id: number;
  name: string;
  slug: string;
  desktopGameId: string;
  mobileGameId: string;
  meta: {
    thumbnail: {
      src: string;
    };
  };
  licenses: {
    id: number;
    key: string;
    name: string;
  }[];
  aspectRatio: string;
  hasJackpot: boolean;
  demoModeLoggedIn: boolean;
  demoModeLoggedOut: boolean;
  isLiveGame: boolean;
  provider: {
    logo: string;
    meta: {
      vendorId: string;
    };
    name: string;
    aggregator: string;
    externalKey: string;
  };
  tags: {
    id: number;
    name: string;
    type: number;
  }[];
  category: {
    id: number;
    name: string;
  };
  positions: Record<string, number>;
  localisation: Record<string, {
    meta: {
      thumbnail: {
        src: string;
      };
    };
    name: string;
  }>;
}