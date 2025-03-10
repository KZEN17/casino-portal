import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GameFilters from '../GameFilters';

describe('GameFilters Component', () => {
  const mockProps = {
    providers: ['Provider A', 'Provider B'],
    categories: ['Slots', 'Table Games'],
    tags: ['Feature A', 'Feature B'],
    selectedProvider: '',
    selectedCategory: '',
    selectedTag: '',
    searchTerm: '',
    sortBy: 'name',
    sortOrder: 'asc' as const,
    onProviderChange: jest.fn(),
    onCategoryChange: jest.fn(),
    onTagChange: jest.fn(),
    onSearchChange: jest.fn(),
    onSortChange: jest.fn(),
  };

  it('renders correctly with default props', () => {
    const { container } = render(<GameFilters {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with selected filters', () => {
    const selectedProps = {
      ...mockProps,
      selectedProvider: 'Provider A',
      selectedCategory: 'Slots',
      selectedTag: 'Feature A',
      searchTerm: 'test',
      sortBy: 'provider',
      sortOrder: 'desc' as const,
    };

    const { container } = render(<GameFilters {...selectedProps} />);
    expect(container).toMatchSnapshot();
  });

  it('calls the provider change handler when provider changes', () => {
    const { getByLabelText } = render(<GameFilters {...mockProps} />);
    const providerSelect = getByLabelText('Provider');

    fireEvent.change(providerSelect, { target: { value: 'Provider A' } });
    expect(mockProps.onProviderChange).toHaveBeenCalledWith('Provider A');
  });

  it('calls the category change handler when category changes', () => {
    const { getByLabelText } = render(<GameFilters {...mockProps} />);
    const categorySelect = getByLabelText('Category');

    fireEvent.change(categorySelect, { target: { value: 'Slots' } });
    expect(mockProps.onCategoryChange).toHaveBeenCalledWith('Slots');
  });

  it('calls the search change handler when search input changes', () => {
    const { getByLabelText } = render(<GameFilters {...mockProps} />);
    const searchInput = getByLabelText('Search');

    fireEvent.change(searchInput, { target: { value: 'test search' } });
    expect(mockProps.onSearchChange).toHaveBeenCalledWith('test search');
  });

  it('calls the sort change handler when sort order button is clicked', () => {
    const { getByLabelText } = render(<GameFilters {...mockProps} />);
    const sortOrderButton = getByLabelText(/Sort/);

    fireEvent.click(sortOrderButton);
    expect(mockProps.onSortChange).toHaveBeenCalledWith('name', 'desc');
  });
});