'use client';

import React from 'react';

interface GameFiltersProps {
  providers: string[];
  categories: string[];
  tags: string[];
  selectedProvider: string;
  selectedCategory: string;
  selectedTag: string;
  searchTerm: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onProviderChange: (provider: string) => void;
  onCategoryChange: (category: string) => void;
  onTagChange: (tag: string) => void;
  onSearchChange: (search: string) => void;
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
}

export default function GameFilters({
  providers,
  categories,
  tags,
  selectedProvider,
  selectedCategory,
  selectedTag,
  searchTerm,
  sortBy,
  sortOrder,
  onProviderChange,
  onCategoryChange,
  onTagChange,
  onSearchChange,
  onSortChange,
}: GameFiltersProps) {
  return (
    <div className="bg-[var(--color-card)] shadow-md rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium mb-1 text-[var(--color-text)]">
            Search Games
          </label>
          <input
            type="text"
            id="search"
            className="w-full px-3 py-2 border border-[var(--color-border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        {/* Provider Filter */}
        <div>
          <label htmlFor="provider" className="block text-sm font-medium mb-1 text-[var(--color-text)]">
            Provider
          </label>
          <select
            id="provider"
            className="w-full px-3 py-2 border border-[var(--color-border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            value={selectedProvider}
            onChange={(e) => onProviderChange(e.target.value)}
          >
            <option value="">All Providers</option>
            {providers.map((provider) => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            ))}
          </select>
        </div>
        
        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1 text-[var(--color-text)]">
            Category
          </label>
          <select
            id="category"
            className="w-full px-3 py-2 border border-[var(--color-border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        {/* Tag Filter */}
        <div>
          <label htmlFor="tag" className="block text-sm font-medium mb-1 text-[var(--color-text)]">
            Game Features
          </label>
          <select
            id="tag"
            className="w-full px-3 py-2 border border-[var(--color-border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            value={selectedTag}
            onChange={(e) => onTagChange(e.target.value)}
          >
            <option value="">All Features</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
        
        {/* Sort */}
        <div>
          <label htmlFor="sort" className="block text-sm font-medium mb-1 text-[var(--color-text)]">
            Sort By
          </label>
          <div className="flex">
            <select
              id="sort"
              className="flex-1 px-3 py-2 border border-[var(--color-border)] rounded-l focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value, sortOrder)}
            >
              <option value="name">Name</option>
              <option value="provider">Provider</option>
              <option value="category">Category</option>
            </select>
            <button
              className="px-3 py-2 border border-l-0 border-[var(--color-border)] rounded-r bg-[var(--color-card)] text-[var(--color-text)]"
              onClick={() => onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
              aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}