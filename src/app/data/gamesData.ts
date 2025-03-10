import gamesJson from './games.json';
import { Game } from '../types';

// Type for the games collection
export interface GamesData {
  games: Game[];
  providers: string[];
  categories: string[];
  tags: string[];
}

// Process and export the games data
export function getGamesData(): GamesData {
  const games = gamesJson as Game[];
  
  // Extract unique providers, categories, and tags for filters
  const providers = Array.from(new Set(games.map(game => game.provider.name)));
  
  const categories = Array.from(
    new Set(games.map(game => game.category.name))
  );
  
  const allTags: string[] = [];
  games.forEach(game => {
    game.tags.forEach(tag => {
      if (!allTags.includes(tag.name)) {
        allTags.push(tag.name);
      }
    });
  });
  
  return {
    games,
    providers,
    categories,
    tags: allTags,
  };
}

// Get game by slug
export function getGameBySlug(slug: string): Game | undefined {
  const games = gamesJson as Game[];
  return games.find(game => game.slug === slug);
}

// Paginate games
export function paginateGames(
  games: Game[],
  page: number,
  gamesPerPage: number
): {
  paginatedGames: Game[];
  totalPages: number;
} {
  const startIndex = (page - 1) * gamesPerPage;
  const endIndex = startIndex + gamesPerPage;
  const paginatedGames = games.slice(startIndex, endIndex);
  const totalPages = Math.ceil(games.length / gamesPerPage);
  
  return {
    paginatedGames,
    totalPages,
  };
}

// Filter games by provider, category, and search term
export function filterGames(
  games: Game[],
  filters: {
    provider?: string;
    category?: string;
    tag?: string;
    searchTerm?: string;
  }
): Game[] {
  return games.filter(game => {
    // Filter by provider
    if (filters.provider && game.provider.name !== filters.provider) {
      return false;
    }
    
    // Filter by category
    if (filters.category && game.category.name !== filters.category) {
      return false;
    }
    
    // Filter by tag
    if (filters.tag && !game.tags.some(tag => tag.name === filters.tag)) {
      return false;
    }
    
    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      return game.name.toLowerCase().includes(searchLower);
    }
    
    return true;
  });
}

// Sort games by name, provider, or category
export function sortGames(
  games: Game[],
  sortBy: 'name' | 'provider' | 'category' = 'name',
  sortOrder: 'asc' | 'desc' = 'asc'
): Game[] {
  return [...games].sort((a, b) => {
    let compareA: string;
    let compareB: string;
    
    switch (sortBy) {
      case 'provider':
        compareA = a.provider.name;
        compareB = b.provider.name;
        break;
      case 'category':
        compareA = a.category.name;
        compareB = b.category.name;
        break;
      case 'name':
      default:
        compareA = a.name;
        compareB = b.name;
        break;
    }
    
    if (sortOrder === 'asc') {
      return compareA.localeCompare(compareB);
    } else {
      return compareB.localeCompare(compareA);
    }
  });
}