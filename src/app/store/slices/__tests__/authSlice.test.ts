import authReducer, { 
  updateUserProfile 
} from '../authSlice';

// Mock implementation of js-cookie for testing
jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn()
}));

describe('Auth Slice', () => {
  const initialState = {
    user: null,
    isLoading: false,
    error: null
  };

  const loggedInState = {
    user: {
      id: '1',
      username: 'testuser',
      firstName: 'John',
      lastName: 'Doe',
      country: 'en'
    },
    isLoading: false,
    error: null
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual({
      user: null,
      isLoading: false,
      error: null
    });
  });

  it('should handle updateUserProfile', () => {
    const newProfile = {
      firstName: 'Jane',
      lastName: 'Smith'
    };

    const actual = authReducer(loggedInState, updateUserProfile(newProfile));
    
    expect(actual.user).toEqual({
      ...loggedInState.user,
      firstName: 'Jane',
      lastName: 'Smith'
    });
  });

  it('should not update profile if user is null', () => {
    const newProfile = {
      firstName: 'Jane',
      lastName: 'Smith'
    };

    const actual = authReducer(initialState, updateUserProfile(newProfile));
    
    expect(actual.user).toBeNull();
  });
});