
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';

export const createFreeUrl = createAsyncThunk(
  'url/createFreeUrl',
  async (urlData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/url/create-free-url', urlData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to create URL' });
    }
  }
);

export const createUrl = createAsyncThunk(
  'url/createUrl',
  async (urlData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/url/create-url', urlData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to create URL' });
    }
  }
);

export const deleteUrl = createAsyncThunk(
  'url/deleteUrl',
  async (shortUrl, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete('/url/delete', { data: { shortUrl } });
      return { ...response.data, shortUrl };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to delete URL' });
    }
  }
);

export const fetchUserUrls = createAsyncThunk(
  'url/fetchUserUrls',
  async ({ page = 1, limit = 5 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/my_urls?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch URLs' });
    }
  }
);

export const getUrlAnalytics = createAsyncThunk(
  'url/getAnalytics',
  async (shortCode, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/get-analytics/${shortCode}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch analytics' });
    }
  }
);

const initialState = {
  urls: [],
  currentUrl: null,
  analytics: [],
  loading: false,
  error: null,
  success: false,
  totalUrls: 0,
  totalPages: 0,
  currentPage: 1,
};

const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    clearUrlState: (state) => {
      state.currentUrl = null;
      state.error = null;
      state.success = false;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // createFreeUrl
      .addCase(createFreeUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createFreeUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUrl = action.payload.data;
        state.success = true;
      })
      .addCase(createFreeUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create URL';
        state.success = false;
      })
      // createUrl
      .addCase(createUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUrl = action.payload.data;
        state.success = true;
      })
      .addCase(createUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create URL';
        state.success = false;
      })
      // deleteUrl
      .addCase(deleteUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.urls = state.urls.filter(url => url.shortUrl !== action.payload.shortUrl);
      })
      .addCase(deleteUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete URL';
      })
      // fetchUserUrls
      .addCase(fetchUserUrls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.urls = action.payload.data;
        state.totalUrls = action.payload.total;
        state.totalPages = action.payload.totalPage;
        state.currentPage = parseInt(action.payload.page);
      })
      .addCase(fetchUserUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch URLs';
      })
      // getUrlAnalytics
      .addCase(getUrlAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUrlAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload.data;
      })
      .addCase(getUrlAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch analytics';
      });
  },
});

export const { clearUrlState, setCurrentPage } = urlSlice.actions;
export default urlSlice.reducer;
