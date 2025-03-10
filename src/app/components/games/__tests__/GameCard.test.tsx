import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom/extend-expect';
import authReducer from '../../../store/slices/authSlice';
import GameCard from '../GameCard';

// Mock the Redux store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer
    },
    preloadedState: initialState
  });
};

// Mock game data
const mockGame = {
  id: 1,
  name: 'Test Game',
  slug: 'test-game',
  desktopGameId: 'testgame',
  mobileGameId: 'testgame',
  meta: {
    thumbnail: {
      src: '/test-image.jpg'
    }
  },
  hasJackpot: true,
  provider: {
    name: 'Test Provider'
  },
  tags: [
    { id: 1, name: 'Tag 1', type: 1 },
    { id: 2, name: 'Tag 2', type: 2 }
  ],
  category: {
    name: 'Slots'
  },
  localisation: {
    en_EN: {
      name: 'Test Game EN',
      meta: {
        thumbnail: {
          src: '/test-image-en.jpg'
        }
      }
    },
    en_CA: {
      name: 'Test Game CA',
      meta: {
        thumbnail: {
          src: '/test-image-ca.jpg'
        }
      }
    },
    en_ROW: {
      name: 'Test Game ROW',
      meta: {
        thumbnail: {
          src: '/test-image-row.jpg'
        }
      }
    }
  }
} as any;

describe('GameCard Component', () => {
  it('renders correctly for EN market', () => {
    const store = createMockStore({
      auth: {
        user: null,
        isLoading: false,
        error: null
      }
    });

    const { container } = render(
      <Provider store={store}>
        <GameCard game={mockGame} marketId="en" />
      </Provider>
    );
      
    expect(container).toMatchSnapshot();
  });

  it('renders correctly for CA market', () => {
    const store = createMockStore({
      auth: {
        user: null,
        isLoading: false,
        error: null
      }
    });

    const { container } = render(
      <Provider store={store}>
        <GameCard game={mockGame} marketId="ca" />
      </Provider>
    );
      
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with user logged in', () => {
    const store = createMockStore({
      auth: {
        user: {
          id: '1',
          username: 'testuser',
          firstName: 'Test',
          lastName: 'User',
          country: 'en'
        },
        isLoading: false,
        error: null
      }
    });

    const { container } = render(
      <Provider store={store}>
        <GameCard game={mockGame} marketId="en" />
      </Provider>
    );
      
    expect(container).toMatchSnapshot();
  });
});