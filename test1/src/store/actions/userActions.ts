// src/actions/userActions.ts
import {fetchUsers} from 'utils/axios';
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
const fetchUsersAction = createAsyncThunk(
  'user/fetchUsers',
  async (query: string, { rejectWithValue }) => {
    if (query.length < 3) return rejectWithValue('Query must be at least 3 characters long');
    try {
      const response = await fetchUsers(query);
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

  store.dispatch(fetchUsersAction(query)).then(res => console.log('result', res)).finally(() => {
    console.log('fetching from api');
  });
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

export { fetchUsersAction, handleRequestFetchingUser };