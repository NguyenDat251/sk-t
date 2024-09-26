// src/reducers/userReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUsersRequest(state) {
      state.loading = true;
    },
    fetchUsersSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } = userSlice.actions;
export const userSelector = (state: { user: UserState }) => state.user;
export default userSlice.reducer;