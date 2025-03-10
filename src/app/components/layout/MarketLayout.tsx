'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import Navbar from './Navbar';
import AuthLayout from './AuthLayout';
import { BRAND_CONFIGS } from '../../constants';
import { useTheme } from '../../providers/ThemeProvider';

interface MarketLayoutProps {
  children: React.ReactNode;
  marketId: string;
}

export default function MarketLayout({ children, marketId }: MarketLayoutProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const { setMarket } = useTheme();
  
  // Set the market in theme context when the component mounts
  useEffect(() => {
    setMarket(marketId as any);
  }, [marketId, setMarket]);
  
  // Choose the casino theme based on user preferences or defaults
  // For now, we'll just use CasinoA for all users, but this could be customized
  const casinoConfig = BRAND_CONFIGS.CASINO_A;
  
  return (
    <AuthLayout requireAuth={true}>
      <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-text)]">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mb-4">
            <span className="text-sm text-gray-500">Market: {marketId.toUpperCase()}</span>
          </div>
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p>&copy; {new Date().getFullYear()} Casino Portal. All rights reserved.</p>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">Terms of Service</a>
                <a href="#" className="hover:text-gray-300">Privacy Policy</a>
                <a href="#" className="hover:text-gray-300">Support</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AuthLayout>
  );
}