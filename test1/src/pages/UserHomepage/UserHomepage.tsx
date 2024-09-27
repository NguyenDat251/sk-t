// src/components/UserSearchApp.tsx
import React from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import UserTable from "./components/UserTable/UserTable";
import { handleRequestFetchingUser } from "store/actions/userActions";
import { useSelector } from "react-redux";
import { userSelector } from "store/reducers/userReducer";

const UserHomepage: React.FC = () => {
  const { users, loading, error } = useSelector(userSelector);

  return (
    <div className="container mx-auto py-10 max-w-3xl flex flex-col h-screen gap-y-4">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold mb-4">GitHub User Search</h1>
        <SearchBar handleRequestFetchingUser={handleRequestFetchingUser} />
      </div>
      <div className="overflow-y-scroll grow">
        <UserTable users={users} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default UserHomepage;
