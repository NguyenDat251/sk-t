// src/actions/userActions.ts
import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  loading: boolean;
  users: any[];
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  users: [],
  error: null,
};

// Define the asynchronous thunk
export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (query: string, { rejectWithValue }) => {
    if (query.length < 3) return rejectWithValue('Query must be at least 3 characters long');
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${query}&per_page=100`);
      return response.data.items;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;