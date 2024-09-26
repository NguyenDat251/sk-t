// src/actions/userActions.ts
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import debounce from 'lodash-es/debounce';
import store from 'store';


// Define the asynchronous thunk
const fetchUsers = createAsyncThunk(
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


const handleDebouceFetchUsers = debounce((query: string) => 
  store.dispatch(fetchUsers(query))
, 500);

export { fetchUsers, handleDebouceFetchUsers };