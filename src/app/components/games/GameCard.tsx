'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Game } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface GameCardProps {
  game: Game;
  marketId: string;
}

export default function GameCard({ game, marketId }: GameCardProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  
  // Get localized game data if available, or fall back to default
  const localizedGame = game.localisation[`en_${marketId.toUpperCase()}`] || 
                       game.localisation.en_ROW || 
                       { name: game.name, meta: game.meta };

  return (
    <div className="themed-card hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t">
        <Image
          src={localizedGame.meta.thumbnail.src}
          alt={localizedGame.name}
          width={320}
          height={180}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        {game.hasJackpot && (
          <div className="absolute top-2 right-2 bg-[var(--color-accent)] text-white text-xs font-bold px-2 py-1 rounded">
            JACKPOT
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-2 brand-decoration pl-3">
          {localizedGame.name}
        </h3>
        
        <div className="text-sm text-[var(--color-text)] opacity-80 mb-3">
          <p>{game.provider.name}</p>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {game.tags.slice(0, 3).map(tag => (
            <span 
              key={tag.id} 
              className="text-xs px-2 py-1 rounded-full bg-[var(--color-secondary)] bg-opacity-20 text-[var(--color-text)]"
            >
              {tag.name}
            </span>
          ))}
        </div>
        
        <div className="mt-auto">
          <Link
            href={`/${marketId}/casino/${game.slug}`}
            className="themed-button w-full text-center block"
          >
            Play Now
          </Link>
        </div>
      </div>
    </div>
  );
}