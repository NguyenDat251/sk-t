// src/reducers/userReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers } from '../actions/userActions';

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
        state.users = [];
      });
  },
});

export const userSelector = (state: { user: UserState }) => state.user;
export default userSlice.reducer;