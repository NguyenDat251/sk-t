// src/components/UserSearchApp.tsx
import React from 'react';
import SearchBar from './components/SearchBar';
import UserTable from './components/UserTable';

const UserSearchApp: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">GitHub User Search</h1>
      <SearchBar />
      <UserTable />
    </div>
  );
};

export default UserSearchApp;
