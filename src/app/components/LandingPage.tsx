'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import Link from 'next/link';
import { ROUTES } from '../constants';

interface LandingPageProps {
  marketId: string;
}

export default function LandingPage({ marketId }: LandingPageProps) {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className={`flex flex-col items-center market-${marketId}`}>
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to the Casino Portal - {marketId.toUpperCase()} Market
        </h1>
        
        <div className="themed-card mb-8">
          <h2 className="text-2xl font-semibold mb-4 brand-decoration pl-3">
            Hello, {user?.firstName}!
          </h2>
          <p className="mb-6 text-[var(--color-text)]">
            {marketId === 'en' 
              ? 'Explore our wide range of casino games designed especially for the English market.'
              : 'Découvrez notre large gamme de jeux de casino conçus spécialement pour le marché canadien.'}
          </p>
          
          <Link 
            href={`/${marketId}${ROUTES.CASINO}`}
            className="themed-button inline-block py-3 px-6 rounded-lg transition duration-200"
          >
            Browse Games
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="themed-card">
            <h3 className="text-xl font-semibold mb-3 brand-decoration pl-3">Latest Promotions</h3>
            <p className="text-[var(--color-text)]">
              {marketId === 'en' 
                ? 'Check out our latest promotions and bonuses tailored for you.'
                : 'Découvrez nos dernières promotions et bonus adaptés pour vous.'}
            </p>
          </div>
          
          <div className="themed-card">
            <h3 className="text-xl font-semibold mb-3 brand-decoration pl-3">Player Support</h3>
            <p className="text-[var(--color-text)]">
              {marketId === 'en' 
                ? 'Our support team is available 24/7 to assist you with any questions.'
                : 'Notre équipe d\'assistance est disponible 24/7 pour vous aider avec toutes vos questions.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}