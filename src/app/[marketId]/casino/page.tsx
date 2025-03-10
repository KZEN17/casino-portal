'use client';

import React, { useState, useEffect } from 'react';
import { getGamesData, filterGames, paginateGames, sortGames } from '../../data/gamesData';
import GameCard from '../../components/games/GameCard';
import GameFilters from '../../components/games/GameFilters';
import Pagination from '../../components/games/Pagination';
import { Game } from '../../types';

interface CasinoPageProps {
  params: {
    marketId: string;
  };
}

export default function CasinoPage({ params }: CasinoPageProps) {
    const { marketId } = params;
  const gamesPerPage = 12;
  
  // State for games and filters
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [displayedGames, setDisplayedGames] = useState<Game[]>([]);
  const [providers, setProviders] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filter and sort states
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'provider' | 'category'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Load games data
  useEffect(() => {
    const { games, providers, categories, tags } = getGamesData();
    setAllGames(games);
    setProviders(providers);
    setCategories(categories);
    setTags(tags);
  }, []);
  
  // Apply filters and sort whenever filter/sort state changes
  useEffect(() => {
    if (allGames.length === 0) return;
    
    // Apply filters
    let filtered = filterGames(allGames, {
      provider: selectedProvider,
      category: selectedCategory,
      tag: selectedTag,
      searchTerm: searchTerm,
    });
    
    // Apply sorting
    filtered = sortGames(filtered, sortBy, sortOrder);
    
    // Reset to first page when filters change
    setCurrentPage(1);
    
    // Update filtered games
    setFilteredGames(filtered);
  }, [
    allGames,
    selectedProvider,
    selectedCategory,
    selectedTag,
    searchTerm,
    sortBy,
    sortOrder,
  ]);
  
  // Paginate the filtered games
  useEffect(() => {
    if (filteredGames.length === 0) {
      setDisplayedGames([]);
      setTotalPages(1);
      return;
    }
    
    const { paginatedGames, totalPages } = paginateGames(
      filteredGames,
      currentPage,
      gamesPerPage
    );
    
    setDisplayedGames(paginatedGames);
    setTotalPages(totalPages);
  }, [filteredGames, currentPage]);
  
  // Handler for page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handler for sort changes
  const handleSortChange = (newSortBy: string, newSortOrder: 'asc' | 'desc') => {
    setSortBy(newSortBy as 'name' | 'provider' | 'category');
    setSortOrder(newSortOrder);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 brand-decoration pl-4">Casino Games</h1>
      
      <GameFilters
        providers={providers}
        categories={categories}
        tags={tags}
        selectedProvider={selectedProvider}
        selectedCategory={selectedCategory}
        selectedTag={selectedTag}
        searchTerm={searchTerm}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onProviderChange={setSelectedProvider}
        onCategoryChange={setSelectedCategory}
        onTagChange={setSelectedTag}
        onSearchChange={setSearchTerm}
        onSortChange={handleSortChange}
      />
      
      {/* Games count and results info */}
      <div className="mb-4 p-3 bg-[var(--color-card)] rounded-lg shadow-sm">
        <p className="text-[var(--color-text)]">
          Showing {displayedGames.length} of {filteredGames.length} games
          {selectedProvider && ` from ${selectedProvider}`}
          {selectedCategory && ` in ${selectedCategory}`}
          {selectedTag && ` with ${selectedTag}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>
      
      {/* Games grid */}
      {displayedGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedGames.map((game) => (
            <GameCard key={game.id} game={game} marketId={marketId} />
          ))}
        </div>
      ) : (
        <div className="py-10 text-center">
          <p className="text-[var(--color-text)] text-xl">No games found matching your criteria.</p>
          <button
            className="mt-4 themed-button"
            onClick={() => {
              setSelectedProvider('');
              setSelectedCategory('');
              setSelectedTag('');
              setSearchTerm('');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
      
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}