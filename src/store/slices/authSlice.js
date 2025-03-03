
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/me');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch user profile' });
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user/login', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Login failed' });
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user/signup', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Signup failed' });
    }
  }
);

export const verifySignup = createAsyncThunk(
  'auth/verifySignup',
  async (verificationData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user/verify-signup', verificationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Verification failed' });
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user/logout');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Logout failed' });
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  verificationEmail: '',
  needsVerification: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setVerificationEmail: (state, action) => {
      state.verificationEmail = action.payload;
      state.needsVerification = true;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUserProfile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
      })
      // signupUser
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.needsVerification = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Signup failed';
      })
      // verifySignup
      .addCase(verifySignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifySignup.fulfilled, (state) => {
        state.loading = false;
        state.needsVerification = false;
      })
      .addCase(verifySignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Verification failed';
      })
      // logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setVerificationEmail, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
