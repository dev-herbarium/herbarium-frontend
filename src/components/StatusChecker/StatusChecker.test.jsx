// src/components/StatusChecker.test.jsx

import { describe, test, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import StatusChecker from './StatusChecker';
import { getAppStatus } from '../../services/statusService';

// -------------------------------------------------------------
// 1. MOCK the Service Function
// -------------------------------------------------------------

// Tell Vitest to mock the entire "statusService" module.
// The actual function we care about is "getAppStatus".

// Note: Ensure the path matches the actual file path.
vi.mock('../../services/statusService.js', () => ({
    // Mock the exported function to return a promise that resolves
    // with our desired success message.
    getAppStatus: vi.fn(),
}));

// -------------------------------------------------------------
// 1. TEST SUITE
// -------------------------------------------------------------

describe("StatusChecker Component", () => {

    test('It should display "Backend is Active!" on successful API call', async () => {
        // --- Arrange: Set up the mock to simulate a SUCCESS response ---
        getAppStatus.mockResolvedValue("Herbarium-Backend is Active!");

        // --- Act: Render the component ---
        render(<StatusChecker />);

        // --- Assert (Loading State): Check that the loading message appears first
        expect(screen.getByTestId("status-loading")).toBeInTheDocument();

        // --- Assert (Success State): Wait for the asynchronous API call to finish
        // and check for the final status message.
        await waitFor(() => {
            // Check the final rendered text:
            expect(screen.getByTestId("status-message")).toHaveTextContent("Status: Herbarium-Backend is Active!");
        });
    });

    test('It should display "Status check failed" on API call failure', async () => {
        // --- Arrange: Set up the mock to simulate a FAILURE response ---
        getAppStatus.mockRejectedValue(new Error('Network error'));

        // --- Act: Render the component ---
        render(<StatusChecker />);

        // --- Assert (Failure State): Wait for the asynchronous API call to finish
        // and check for the component's error message (defined in StatusChecker.jsx).
        await waitFor(() => {
            expect(screen.getByTestId("status-message")).toHaveTextContent("Status: Error fetching status.");
        });
    });
});