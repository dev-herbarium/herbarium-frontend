// src/App.test.jsx

import { test, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// --- ARRANGE: Mock Service for StatusChecker ---
// We must mock the statusService to prevent the async call during the test.
vi.mock("./services/statusService", () => ({
  getAppStatus: vi.fn(() => Promise.resolve("Mocked Active")),
}));

// --- TEST SUITE ---
describe("App Routing Configuration", () => {
  // Helper function to render App with MemoryRouter
  const renderApp = (initialRoute = "/") => {
    // "renderApp" should be "async" to avoid "act() warning. See https://react.dev/link/wrap-tests-with-act"
    // MemoryRouter is used in tests to simulate the browser's history
    // without needing a real browser environment.
    render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    );
  };

  test('should render the Home page by default on "/" route', async () => {
    // ACT & ARRANGE
    renderApp("/");
    // FIX: Explicitly wait for the asynchronous StatusChecker component to finish its state update
    await screen.findByText(/Mocked Active/i);

    // ASSERT: Check for the unique content of the Home page
    expect(screen.getByText(/Welcome to Herbarium/i)).toBeInTheDocument();
  });

  test("should navigate to the About page when the link is clicked", async () => {
    // ARRANGE
    renderApp("/");
    // FIX: Explicitly wait for the asynchronous StatusChecker component to finish its state update
    await screen.findByText(/Mocked Active/i);
    const user = userEvent.setup();

    // ACT: Find the 'About' link and click it
    const aboutLink = screen.getByRole("link", { name: /about/i });
    await user.click(aboutLink);

    // ASSERT: Check for the unique content of the About page
    expect(screen.getByText(/About Page/i)).toBeInTheDocument();
    // Ensure the Home page content is gone
    expect(screen.queryByText(/Welcome to Herbarium/i)).not.toBeInTheDocument();
  });

  test("should display 404 page for an invalid route", async () => {
    // ACT & ARRANGE: Start on a bad route
    renderApp("/non-existent-page");
    // FIX: Explicitly wait for the asynchronous StatusChecker component to finish its state update
    await screen.findByText(/Mocked Active/i);

    // ASSERT: Check for the 404 message
    expect(screen.getByText(/404: Page Not Found/i)).toBeInTheDocument();
  });
});
