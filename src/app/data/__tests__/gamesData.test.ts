import { 
    filterGames, 
    paginateGames, 
    sortGames 
  } from '../gamesData';
  
  // Mock games data
  const mockGames = [
    {
      id: 1,
      name: 'Game One',
      slug: 'game-one',
      provider: { name: 'Provider A' },
      category: { name: 'Slots' },
      tags: [{ id: 1, name: 'Feature A', type: 1 }],
    },
    {
      id: 2,
      name: 'Game Two',
      slug: 'game-two',
      provider: { name: 'Provider B' },
      category: { name: 'Table Games' },
      tags: [{ id: 2, name: 'Feature B', type: 1 }],
    },
    {
      id: 3,
      name: 'Game Three',
      slug: 'game-three',
      provider: { name: 'Provider A' },
      category: { name: 'Slots' },
      tags: [{ id: 1, name: 'Feature A', type: 1 }, { id: 2, name: 'Feature B', type: 1 }],
    },
  ] as any[];
  
  describe('Games Data Utilities', () => {
    describe('filterGames', () => {
      it('should filter games by provider', () => {
        const filtered = filterGames(mockGames, { provider: 'Provider A' });
        expect(filtered).toHaveLength(2);
        expect(filtered[0].id).toBe(1);
        expect(filtered[1].id).toBe(3);
      });
  
      it('should filter games by category', () => {
        const filtered = filterGames(mockGames, { category: 'Table Games' });
        expect(filtered).toHaveLength(1);
        expect(filtered[0].id).toBe(2);
      });
  
      it('should filter games by tag', () => {
        const filtered = filterGames(mockGames, { tag: 'Feature B' });
        expect(filtered).toHaveLength(2);
        expect(filtered[0].id).toBe(2);
        expect(filtered[1].id).toBe(3);
      });
  
      it('should filter games by search term', () => {
        const filtered = filterGames(mockGames, { searchTerm: 'three' });
        expect(filtered).toHaveLength(1);
        expect(filtered[0].id).toBe(3);
      });
  
      it('should combine multiple filters', () => {
        const filtered = filterGames(mockGames, { 
          provider: 'Provider A',
          tag: 'Feature B'
        });
        expect(filtered).toHaveLength(1);
        expect(filtered[0].id).toBe(3);
      });
    });
  
    describe('paginateGames', () => {
      it('should paginate games correctly', () => {
        const { paginatedGames, totalPages } = paginateGames(mockGames, 1, 2);
        expect(paginatedGames).toHaveLength(2);
        expect(totalPages).toBe(2);
        expect(paginatedGames[0].id).toBe(1);
        expect(paginatedGames[1].id).toBe(2);
      });
  
      it('should handle the last page with fewer items', () => {
        const { paginatedGames, totalPages } = paginateGames(mockGames, 2, 2);
        expect(paginatedGames).toHaveLength(1);
        expect(totalPages).toBe(2);
        expect(paginatedGames[0].id).toBe(3);
      });
  
      it('should handle empty games array', () => {
        const { paginatedGames, totalPages } = paginateGames([], 1, 10);
        expect(paginatedGames).toHaveLength(0);
        expect(totalPages).toBe(0);
      });
    });
  
    describe('sortGames', () => {
      it('should sort games by name in ascending order', () => {
        const sorted = sortGames(mockGames, 'name', 'asc');
        expect(sorted[0].name).toBe('Game One');
        expect(sorted[1].name).toBe('Game Three');
        expect(sorted[2].name).toBe('Game Two');
      });
  
      it('should sort games by name in descending order', () => {
        const sorted = sortGames(mockGames, 'name', 'desc');
        expect(sorted[0].name).toBe('Game Two');
        expect(sorted[1].name).toBe('Game Three');
        expect(sorted[2].name).toBe('Game One');
      });
  
      it('should sort games by provider', () => {
        const sorted = sortGames(mockGames, 'provider', 'asc');
        expect(sorted[0].provider.name).toBe('Provider A');
        expect(sorted[1].provider.name).toBe('Provider A');
        expect(sorted[2].provider.name).toBe('Provider B');
      });
  
      it('should sort games by category', () => {
        const sorted = sortGames(mockGames, 'category', 'asc');
        expect(sorted[0].category.name).toBe('Slots');
        expect(sorted[1].category.name).toBe('Slots');
        expect(sorted[2].category.name).toBe('Table Games');
      });
    });
  });