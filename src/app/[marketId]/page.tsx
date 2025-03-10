import React from 'react';
import LandingPage from '../components/LandingPage';

interface MarketHomeProps {
  params: {
    marketId: string;
  };
}

// This is a server component, no 'use client' directive
export default function MarketHome({ params }: MarketHomeProps) {
  const { marketId } = params;
  
  return <LandingPage marketId={marketId} />;
}