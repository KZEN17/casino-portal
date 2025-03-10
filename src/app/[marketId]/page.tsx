'use client';

import React from 'react';
import LandingPage from '../components/LandingPage';

interface MarketHomeProps {
  params: {
    marketId: string;
  };
}

export default function MarketHome({ params }: MarketHomeProps) {
  const { marketId } = params;
  
  return <LandingPage marketId={marketId} />;
}