// src/components/Registration/RegistrationForm.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import RegistrationForm from "./RegistrationForm";
import registrationService from "../../services/registrationService";

// Mock the registration service
vi.mock("../../services/registrationService");

describe("RegistrationForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render registration form with all fields", () => {
    render(<RegistrationForm />);

    expect(screen.getByLabelText(/^email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^confirm password:/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("should render Registration Form with all fields and BEM classes", () => {
    render(<RegistrationForm />);

    expect(screen.getByText(/user registration/i)).toHaveClass(
      "registration-form__title"
    );

    expect(screen.getByLabelText(/^email:/i)).toHaveClass(
      "registration-form__input"
    );
    expect(screen.getByLabelText(/^password:/i)).toHaveClass(
      "registration-form__input"
    );
    expect(screen.getByLabelText(/^confirm password:/i)).toHaveClass(
      "registration-form__input"
    );

    expect(screen.getByRole("button", { name: /register/i })).toHaveClass(
      "registration-form__button"
    );
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

  it("should show error for short password", async () => {
    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/password must be at least 6 characters/i)
      ).toBeInTheDocument();
    });
  });

  it("should show error when passwords do not match", async () => {
    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password:"), {
      target: { value: "differentpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/^passwords do not match$/i)).toBeInTheDocument();
    });
  });

  it("should show loading state during registration", async () => {
    const mockRegister = vi
      .spyOn(registrationService, "registerUser")
      .mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ userId: 1 }), 100)
          )
      );

    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password:"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(screen.getByRole("button")).toHaveTextContent(/registering/i);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByRole("button")).toHaveClass(
      "registration-form__button--disabled"
    );
  });
});
