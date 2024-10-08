import React, { act } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserTable from "./UserTable";
import { User } from "types/user";

describe("UserTable", () => {
  const mockUsers: User[] = [
    { avatar_url: "1", login: "John Doe", type: "1", score: 1 },
    { avatar_url: "2", login: "Jane Smith", type: "2", score: 2 },
  ];

  test("renders UserTable component", () => {
    render(<UserTable users={mockUsers} loading={false} error={null} />);
    expect(screen.getByTestId("user-table")).toBeInTheDocument();
  });

  test("displays loading message when loading", () => {
    render(<UserTable users={[]} loading={true} error={null} />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  test("displays Something went wrong error message when there is an error", () => {
    render(
      <UserTable users={[]} loading={false} error={{message: 'random error'} as Error} />
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  test("displays error message for the case query is shorter 3 characters", () => {
    render(<UserTable users={[]} loading={false} error="Query must be at least 3 characters long" />);
    expect(screen.getByText("Query must be at least 3 characters long")).toBeInTheDocument();
  });

  test("displays user data when not loading and no error", () => {
    render(<UserTable users={mockUsers} loading={false} error={null} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  //no users found
  test("displays no users found message when no users", () => {
    render(<UserTable users={[]} loading={false} error={null} />);
    expect(screen.getByText("No users found")).toBeInTheDocument();
  });
});
