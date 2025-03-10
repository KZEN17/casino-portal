'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import Link from 'next/link';
import { ROUTES } from '../constants';
import { getGamesData } from '../data/gamesData';
import { Game } from '../types';
import GameCard from './games/GameCard';

interface LandingPageProps {
  marketId: string;
}

export default function LandingPage({ marketId }: LandingPageProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);
  
  // Load featured games on component mount
  useEffect(() => {
    const { games } = getGamesData();
    
    // Get random featured games
    const getRandomGames = (count: number) => {
      const shuffled = [...games].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };
    
    setFeaturedGames(getRandomGames(4));
  }, []);

  return (
    <div className={`flex flex-col items-center market-${marketId}`}>
      <div className="max-w-6xl w-full">
        <div className="text-center mb-10">
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
              Browse All Games
            </Link>
          </div>
        </div>
        
        {/* Featured Games Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold brand-decoration pl-3">Featured Games</h2>
            <Link 
              href={`/${marketId}${ROUTES.CASINO}`}
              className="text-[var(--color-primary)] hover:underline"
            >
              View All Games
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredGames.map(game => (
              <GameCard key={game.id} game={game} marketId={marketId} />
            ))}
          </div>
        </div>
        
        {/* Info Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
        
        {/* Categories Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 brand-decoration pl-3">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Slots', 'Table Games', 'Live Casino', 'Jackpots'].map(category => (
              <Link 
                key={category}
                href={`/${marketId}${ROUTES.CASINO}`}
                className="themed-card p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}