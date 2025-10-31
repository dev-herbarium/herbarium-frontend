// src/pages/Home/Home.test.jsx

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "./Home";

describe("Home", () => {
  it("should render homepage with registration button", () => {
    render(<Home />);

    expect(screen.getByText(/^welcome to herbarium!/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^register user/i })
    ).toBeInTheDocument();
  });

  it("should show registration form when button is clicked", () => {
    render(<Home />);

    const button = screen.getByRole("button", { name: /^register user/i });
    fireEvent.click(button);

    expect(screen.getByText(/^user registration/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email:/i)).toBeInTheDocument();
  });
});
