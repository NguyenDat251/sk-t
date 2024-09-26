// src/components/SearchBar.tsx
import React, { useState, ChangeEvent } from 'react';
import { fetchUsers } from 'store/actions/userActions';
import { useAppDispatch } from 'store';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    dispatch(fetchUsers(e.target.value));
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search GitHub users..."
      className="p-2 border border-gray-300 rounded"
    />
  );
};

export default SearchBar;
