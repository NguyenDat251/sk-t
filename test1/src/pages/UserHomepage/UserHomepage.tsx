// src/components/UserSearchApp.tsx
import React from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import UserTable from "./components/UserTable/UserTable";
import { handleRequestFetchingUser } from "store/actions/userActions";
import { useSelector } from "react-redux";
import { userSelector } from "store/reducers/userReducer";
import backgroundImg from "assets/bg.webp";  

const UserHomepage: React.FC = () => {
  const { users, loading, error } = useSelector(userSelector);

  return (
    <div 
    className="h-screen"
    style={{
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
  }}>
    <div className="container mx-auto py-10 max-w-3xl h-[100%]"
    >
      <div className="flex flex-col gap-y-4 bg-white/40 p-4 rounded-lg h-[100%]">
      <div className="flex flex-col items-center gap-2 ">
        <h1 className="text-2xl font-bold mb-4 text-purple-500 text-6xl" style={{
          fontFamily: "monospace",
        }}>GitHub User Search</h1>
        <SearchBar handleRequestFetchingUser={handleRequestFetchingUser} />
      </div>
      <div className="overflow-y-scroll grow">
        <UserTable users={users} loading={loading} error={error} />
      </div>
      </div>
    </div>
    </div>
  );
};

export default UserHomepage;
