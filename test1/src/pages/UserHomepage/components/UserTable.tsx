// src/components/UserTable.tsx
import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "store/reducers/userReducer"; // Adjust the import path if necessary

const UserTable: React.FC = () => {
  const { users, loading, error } = useSelector(userSelector);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Avatar</th>
            <th className="py-2">Username</th>
            <th className="py-2">Type</th>
            <th className="py-2">Score</th>
          </tr>
        </thead>
        {!error && (
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="py-2">
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    width="50"
                    className="rounded-full"
                  />
                </td>
                <td className="py-2">{user.login}</td>
                <td className="py-2">{user.type}</td>
                <td className="py-2">{user.score}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {error && (
        <div className="text-center text-red-500 w-full">
          Something went wrong
        </div>
      )}
    </>
  );
};

export default UserTable;
