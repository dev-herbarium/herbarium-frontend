// src/components/Registration/RegistrationForm.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RegistrationForm from "./RegistrationForm";
import registrationService from "../../services/registrationService";

// Mock the registration service
vi.mock("../../services/registrationService");

describe("RegistrationForm", () => {
  it("should render registration form with all fields", () => {
    render(<RegistrationForm />);

    expect(screen.getByLabelText(/^email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^confirm password:/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("should update form data when user types", () => {
    render(<RegistrationForm />);

    const emailInput = screen.getByLabelText(/^email:/i);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(emailInput.value).toBe("test@example.com");
  });

  it("should submit form with user data", async () => {
    const mockRegister = vi
      .spyOn(registrationService, "registerUser")
      .mockResolvedValue({
        userId: 1,
        message: "User registered successfully",
      });

    render(<RegistrationForm />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/^email:/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^password:/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/^confirm password:/i), {
      target: { value: "password123" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(
        "test@example.com",
        "password123",
        "password123"
      );
    });
  });
});
