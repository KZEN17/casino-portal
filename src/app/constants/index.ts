export const MARKETS = ['en', 'ca'] as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  CASINO: '/casino',
  PROFILE: '/my-profile',
};

export const BRAND_CONFIGS = {
  CASINO_A: {
    name: 'Casino A',
    theme: 'casinoA',
    menuPosition: 'left',
    logo: '/images/casinoA-logo.svg',
  },
  CASINO_B: {
    name: 'Casino B',
    theme: 'casinoB',
    menuPosition: 'top',
    logo: '/images/casinoB-logo.svg',
  },
};