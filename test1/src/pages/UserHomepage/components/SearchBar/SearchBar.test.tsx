import React, {act} from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const handleRequestFetchingUser = jest.fn();

  beforeEach(() => {
    handleRequestFetchingUser.mockClear();
  });

  test('renders SearchBar component', () => {
    render(<SearchBar handleRequestFetchingUser={handleRequestFetchingUser} />);
    expect(screen.getByPlaceholderText('Search GitHub users...')).toBeInTheDocument();
  });

  test('calls handleRequestFetchingUser on input change', () => {
    render(<SearchBar handleRequestFetchingUser={handleRequestFetchingUser} />);
    const input = screen.getByPlaceholderText('Search GitHub users...');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleRequestFetchingUser).toHaveBeenCalledWith('test');
  });

  test('updates input value on change', () => {
    render(<SearchBar handleRequestFetchingUser={handleRequestFetchingUser} />);
    const input = screen.getByPlaceholderText('Search GitHub users...');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });
});