'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { MARKETS } from '../constants';

type Theme = 'light' | 'dark';

type MarketTheme = {
  [key in typeof MARKETS[number]]: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
};

// Define market-specific theme colors
const marketThemes: MarketTheme = {
  en: {
    light: {
      primary: '#3b82f6', // Blue
      secondary: '#60a5fa',
      accent: '#2563eb',
      background: '#f3f4f6',
      card: '#ffffff',
      text: '#111827',
      border: '#d1d5db',
    },
    dark: {
      primary: '#3b82f6', // Blue
      secondary: '#60a5fa',
      accent: '#2563eb',
      background: '#1f2937',
      card: '#374151',
      text: '#f9fafb',
      border: '#4b5563',
    },
  },
  ca: {
    light: {
      primary: '#ef4444', // Red
      secondary: '#f87171',
      accent: '#dc2626',
      background: '#f3f4f6',
      card: '#ffffff',
      text: '#111827',
      border: '#d1d5db',
    },
    dark: {
      primary: '#ef4444', // Red
      secondary: '#f87171',
      accent: '#dc2626',
      background: '#1f2937',
      card: '#374151',
      text: '#f9fafb',
      border: '#4b5563',
    },
  },
};

interface ThemeContextType {
  theme: Theme;
  market: typeof MARKETS[number];
  toggleTheme: () => void;
  setMarket: (market: typeof MARKETS[number]) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ 
  children,
  initialMarket = 'en'
}: {
  children: React.ReactNode;
  initialMarket?: typeof MARKETS[number];
}) {
  const [theme, setTheme] = useState<Theme>('light');
  const [market, setMarket] = useState<typeof MARKETS[number]>(initialMarket);

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    } else if (typeof window !== 'undefined') {
      // Check for user's system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Apply theme CSS variables when theme or market changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      document.documentElement.classList.remove('light-theme', 'dark-theme');
      document.documentElement.classList.add(`${theme}-theme`);
      
      // Apply theme CSS variables
      const themeColors = marketThemes[market][theme];
      Object.entries(themeColors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--color-${key}`, value);
      });
    }
  }, [theme, market]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, market, toggleTheme, setMarket }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}