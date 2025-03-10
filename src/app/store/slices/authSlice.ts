import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthState } from '../../types';
import users from '../../data/users.json';

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

// Simulate an API call to fetch user data
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (!user) {
        return rejectWithValue('Invalid username or password');
      }

      // Remove password from returned user object for security
      const { password: _, ...secureUser } = user;
      
      // Store user in localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(secureUser));
      }
      
      return secureUser as User;
    } catch (error) {
      return rejectWithValue('Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout', 
  async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
    return null;
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth', 
  async () => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        return JSON.parse(storedUser) as User;
      }
    }
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserProfile: (state, action: PayloadAction<{ firstName: string; lastName: string }>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
        };
        
        // Update localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      // Check auth
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { updateUserProfile } = authSlice.actions;
export default authSlice.reducer;