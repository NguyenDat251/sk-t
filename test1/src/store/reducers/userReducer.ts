// src/reducers/userReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsersAction, UserPayload } from '../actions/userActions';
import {User} from 'types/user';

interface UserState {
  loading: boolean;
  users: User[];
  error: string | null;
  cache: Record<string, User[]>;
}

const initialState: UserState = {
  loading: false,
  users: [],
  error: null,
  cache: {},
};

// Create a slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //update user list action
    updateUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.users= [];
      })
      .addCase(fetchUsersAction.fulfilled, (state, action: PayloadAction<UserPayload>) => {
        state.loading = false;
        state.users = action.payload.users;
        state.cache = {
          ...state.cache,
          [action.payload.query]: action.payload.users,
        };
      })
      .addCase(fetchUsersAction.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.users = [];
      });
  },
});

export const { updateUsers } = userSlice.actions;
export const userSelector = (state: { user: UserState }) => state.user;
export default userSlice.reducer;