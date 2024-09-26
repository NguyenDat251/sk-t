// src/components/SearchBar.tsx
import React, { useState, ChangeEvent } from 'react';
import { handleFetchUsers } from 'store/actions/userActions';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("🚀 ~ handleChange ~ value:", value)
    setQuery(value);
    handleFetchUsers(value);
  };

  return (
    <input
      id="user-search"
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search GitHub users..."
      className="p-2 border border-gray-300 rounded"
    />
  );
};

export default SearchBar;
