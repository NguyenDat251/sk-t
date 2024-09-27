// src/components/UserSearchApp.tsx
import React from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import UserTable from './components/UserTable/UserTable';
import { handleRequestFetchingUser } from 'store/actions/userActions';
import { useSelector } from "react-redux";
import { userSelector } from "store/reducers/userReducer";

const UserHomepage: React.FC = () => {
  const { users, loading, error } = useSelector(userSelector);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">GitHub User Search</h1>
      <SearchBar handleRequestFetchingUser={handleRequestFetchingUser} />
      <UserTable users={users} loading={loading} error={error} />
    </div>
  );
};

export default UserHomepage;
