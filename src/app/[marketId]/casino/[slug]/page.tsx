'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getGameBySlug } from '../../../data/gamesData';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import Link from 'next/link';

interface GameDetailPageProps {
  params: {
    marketId: string;
    slug: string;
  };
}

export default function GameDetailPage({ params }: GameDetailPageProps) {
  // Unwrap params using React.use() as recommended
  const unwrappedParams = React.use(Promise.resolve(params));
  const { marketId, slug } = unwrappedParams;
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  
  // Get game data
  const game = getGameBySlug(slug);
  
  if (!game) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
        <p className="mb-6">The game you're looking for doesn't exist or has been removed.</p>
        <Link 
          href={`/${marketId}/casino`}
          className="themed-button"
        >
          Back to Casino
        </Link>
      </div>
    );
  }
  
  // Get localized game data if available, or fall back to default
  const localizedGame = game.localisation[`en_${marketId.toUpperCase()}`] || 
                       game.localisation.en_ROW || 
                       { name: game.name, meta: game.meta };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          href={`/${marketId}/casino`}
          className="text-[var(--color-primary)] hover:underline flex items-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-1"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Casino
        </Link>
      </div>
      
      <div className="themed-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Game Thumbnail */}
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={localizedGame.meta.thumbnail.src}
              alt={localizedGame.name}
              width={600}
              height={400}
              className="w-full object-cover"
            />
            {game.hasJackpot && (
              <div className="absolute top-4 right-4 bg-[var(--color-accent)] text-white px-3 py-1 rounded-full font-semibold">
                JACKPOT
              </div>
            )}
          </div>
          
          {/* Game Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2 brand-decoration pl-4">
              {localizedGame.name}
            </h1>
            
            <div className="mb-4">
              <p className="text-[var(--color-text)] mb-1">
                <span className="font-semibold">Provider:</span> {game.provider.name}
              </p>
              <p className="text-[var(--color-text)] mb-1">
                <span className="font-semibold">Category:</span> {game.category.name}
              </p>
              <p className="text-[var(--color-text)] mb-1">
                <span className="font-semibold">Demo Mode:</span> {game.demoModeLoggedOut ? 'Available' : 'Not Available'}
              </p>
            </div>
            
            {/* Game Features / Tags */}
            {game.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Game Features</h3>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map(tag => (
                    <span 
                      key={tag.id}
                      className="px-3 py-1 bg-[var(--color-secondary)] bg-opacity-20 rounded-full text-sm"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Play Buttons */}
            <div className="mt-6 space-y-3">
              {user ? (
                // Logged in - Show "Play for Real" button
                <button className="themed-button w-full py-3 text-lg font-medium">
                  Play for Real
                </button>
              ) : (
                // Logged out - Show "Play for Free" button
                <button className="themed-button w-full py-3 text-lg font-medium">
                  Play for Free
                </button>
              )}
              
              {!user && game.demoModeLoggedOut && (
                <div className="text-center text-[var(--color-text)] text-sm">
                  <p>
                    <Link href={`/${marketId}/login`} className="text-[var(--color-primary)] hover:underline">
                      Log in
                    </Link> or create an account to play for real money
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Additional Details Section */}
        <div className="mt-8 border-t border-[var(--color-border)] pt-6">
          <h2 className="text-xl font-semibold mb-4">About This Game</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Game Details</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-[var(--color-text)] opacity-80">Game ID:</span>
                  <span className="font-medium">{game.desktopGameId}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[var(--color-text)] opacity-80">Aspect Ratio:</span>
                  <span className="font-medium">{game.aspectRatio}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[var(--color-text)] opacity-80">Live Game:</span>
                  <span className="font-medium">{game.isLiveGame ? 'Yes' : 'No'}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Licensing Information</h3>
              <ul className="space-y-2">
                {game.licenses.map(license => (
                  <li key={license.id} className="flex justify-between">
                    <span className="text-[var(--color-text)] opacity-80">{license.name}:</span>
                    <span className="font-medium">Licensed</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-[var(--color-secondary)] bg-opacity-10 rounded-lg">
            <p className="text-sm text-[var(--color-text)] opacity-80">
              Please note that game availability may differ based on your location. This game is provided by {game.provider.name} and is subject to their terms and conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}