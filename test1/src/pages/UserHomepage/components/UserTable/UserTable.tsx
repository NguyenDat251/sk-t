// src/components/UserTable.tsx
import React, {useState} from "react";
import { User } from "types/user";
import Loading from "components/Loading";
import {getErrorMessage} from 'types/error';
import classNames from "classnames";

interface UserTableProps {
  users: User[];
  loading: boolean;
  error: Error | string | null;
}

const SkeletonLoaderImg = React.memo(({ user }: { user: User }) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoadImage = () => {
    setLoaded(true);
  };

  return (
    <div className="flex justify-center items-center">
      {!loaded && (
        <div className="animate-pulse bg-purple-500" style={{ width: '50px', height: '50px', borderRadius: '50%' }}></div>
      )}
      <img
        src={user.avatar_url}
        alt={user.login}
        width="50"
        className={`rounded-full ${loaded ? 'block' : 'hidden'}`}
        onLoad={handleLoadImage}
      />
    </div>
  );
});

const UserTable: React.FC<UserTableProps> = ({ users, loading, error }) => {
  return (
    <>
      <table className="min-w-full bg-white/20" data-testid="user-table">
        <thead>
          <tr>
            <th className="py-2 ">Avatar</th>
            <th className="py-2">Username</th>
            <th className="py-2">Type</th>
            <th className="py-2">Score</th>
          </tr>
        </thead>
        {!error && (
          <tbody>
            {users.map((user) => (
              <tr key={user.login} className="text-center">
                <td className={classNames("py-2 flex justify-center items-center")}>
                  <SkeletonLoaderImg user={user} />
                </td>
                <td className="py-2">{user.login}</td>
                <td className="py-2">{user.type}</td>
                <td className="py-2">{user.score}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <div className="mt-4">
        {users.length === 0 && !loading && !error && (
          <div className="text-center w-full">No users found</div>
        )}

        {loading && <Loading classes="mx-auto" />}

        {error && (
          <div className="text-center text-red-500 w-full">
            {getErrorMessage(error)}
          </div>
        )}
      </div>
    </>
  );
};

export default UserTable;
