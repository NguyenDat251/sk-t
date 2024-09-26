// src/actions/userActions.ts
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import debounce from 'lodash-es/debounce';
import store from 'store';
import {User} from 'types/user';
import { updateUsers } from '../reducers/userReducer'; // Adjust the import path if necessary


export interface UserPayload {
  query: string;
  users: User[];
}

let shouldKeepFetching = true;

// Define the asynchronous thunk
const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (query: string, { rejectWithValue }) => {
    if (query.length < 3) return rejectWithValue('Query must be at least 3 characters long');
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${query}&per_page=100`);
      return {
        query,
        users: response.data.items,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


const handleDebouceFetchUsers = debounce((query: string) => {
  if(!shouldKeepFetching) {
    shouldKeepFetching = true;
    return;
  }

  store.dispatch(fetchUsers(query))
}
, 500);

const handleRequestFetchingUser = (query: string) => {
  const userCache = store.getState().user.cache;

  if(userCache[query]) {
    shouldKeepFetching = false
    return store.dispatch(updateUsers(userCache[query]));
  }

  handleDebouceFetchUsers(query);
}

export { fetchUsers, handleRequestFetchingUser };