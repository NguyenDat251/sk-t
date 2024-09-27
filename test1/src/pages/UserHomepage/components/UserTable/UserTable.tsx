// src/components/UserTable.tsx
import React from "react";
import { User } from "types/user";

interface UserTableProps {
  users: User[];
  loading: boolean;
  error: string | null;
}


const UserTable: React.FC<UserTableProps> = ({users, loading, error}) => {
  return (
    <>
      <table className="min-w-full bg-white" data-testid="user-table">
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
              <tr key={user.login} className="text-center">
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
      {loading && <div className="text-center">Loading...</div>}

      {error && (
        <div className="text-center text-red-500 w-full">
          Something went wrong
        </div>
      )}

    </>
  );
};

export default UserTable;
