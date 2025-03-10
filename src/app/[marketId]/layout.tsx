import React from 'react';
import { MARKETS } from '../constants';
import MarketLayout from '../components/layout/MarketLayout';

interface MarketLayoutProps {
  children: React.ReactNode;
  params: {
    marketId: string;
  };
}

// This is a server component, no 'use client' directive
export default function RootMarketLayout({ children, params }: MarketLayoutProps) {
  const { marketId } = params;
  
  // Validate that the market ID is valid
  if (!MARKETS.includes(marketId as any)) {
    // Handle invalid market
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600">Invalid Market</h1>
          <p className="mt-2">The requested market does not exist.</p>
        </div>
      </div>
    );
  }
  
  return <MarketLayout marketId={marketId}>{children}</MarketLayout>;
}