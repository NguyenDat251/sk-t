// src/components/SearchBar.tsx
import React, { useState, ChangeEvent } from 'react';

interface SearchBarProps {
  handleRequestFetchingUser: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({handleRequestFetchingUser}) => {
  const [query, setQuery] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleRequestFetchingUser(value);
  };

  return (
    <input
      data-testId="user-search-input"
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
