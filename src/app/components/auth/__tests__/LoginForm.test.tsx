import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loginUser } from '../../../store/slices/authSlice';
import LoginForm from '../LoginForm';

// Mock Redux
jest.mock('../../../store/slices/authSlice', () => {
  const actual = jest.requireActual('../../../store/slices/authSlice');
  return {
    ...actual,
    loginUser: jest.fn()
  };
});

// Mock the useRouter hook
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => ({
    push: mockPush
  })
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer
    },
    preloadedState: initialState
  });
};

describe('LoginForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login form correctly', () => {
    const store = createMockStore({
      auth: {
        user: null,
        isLoading: false,
        error: null
      }
    });

    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    // Check that form elements are rendered
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows error message when login fails', async () => {
    // Mock the loginUser to return rejected promise
    (loginUser as jest.Mock).mockImplementation(() => ({
      type: 'auth/login/rejected',
      payload: 'Invalid username or password'
    }));

    const store = createMockStore({
      auth: {
        user: null,
        isLoading: false,
        error: 'Invalid username or password'
      }
    });

    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    // Check that error message is displayed
    expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
  });

  it('submits the form with correct credentials', async () => {
    // Mock the loginUser to return fulfilled promise
    (loginUser as jest.Mock).mockImplementation(() => ({
      type: 'auth/login/fulfilled',
      payload: {
        id: '1',
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        country: 'en'
      }
    }));

    const store = createMockStore({
      auth: {
        user: null,
        isLoading: false,
        error: null
      }
    });

    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Check that loginUser was called with correct credentials
    expect(loginUser).toHaveBeenCalledWith({ username: 'testuser', password: 'password' });
  });

  it('shows loading state during login', () => {
    const store = createMockStore({
      auth: {
        user: null,
        isLoading: true,
        error: null
      }
    });

    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    // Check that the button is in loading state
    expect(screen.getByText(/logging in/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});