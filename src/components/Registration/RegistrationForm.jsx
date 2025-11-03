// src/components/Registration/RegistrationForm.jsx
import { useState } from "react";
import registrationService from "../../services/registrationService";
import './RegistrationForm.css'

/**
 * **Registration Form Component** - Handles user registration with validation
 * 
 * @component
 * @function RegistrationForm
 * @description A controlled form component that handles user registration
 * with client-side validation, error handling, and API integration. Manages
 * form state, validation errors, loading states, and submission feedback.
 * 
 * @example
 * // Usage in parent component:
 * <RegistrationForm />
 * 
 * @returns {JSX.Element} Registration form with email, password, and confirmation fields
 * 
 * @state {Object} formData - Current form field values
 * @state {string} formData.email - User's email address
 * @state {string} formData.password - User's password
 * @state {string} formData.confirmPassword - Password confirmation
 * @state {Object} message - Feedback message after form submission
 * @state {string} message.text - Message content
 * @state {string} message.type - Message type ('success' or 'error')
 * @state {boolean} isLoading - Loading state during form submission
 * @state {Object} errors - Validation error messages per field
 * 
 * @see registrationService
 * @method handleChange - Updates form data and clears field errors
 * @method validateForm - Performs client-side form validation
 * @method handleSubmit - Handles form submission and API call
 * @method getInputClassName - Dynamically generates CSS classes for inputs
 * @method getMessageClassName - Dynamically generates CSS classes for messages
 */
function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  /**
   * Handles input field changes and updates form state
   * @param {Event} event - The change event from the input field
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousState) => ({
      // 1. Take the previous object state ('previousState')
      ...previousState,
      // 2. Overwrite/add a new property: The key '[name]' (e.g., 'email')
      //    is set to the new 'value' typed by the user.
      [name]: value,
    }));
    // Clear error when user starts typing:
    if(errors[name]) {
      setErrors(previousState => ({...previousState, [name]: ""}));
    }
  };

  /**
   * Validates form data and sets error messages
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = () => {
    console.log("Validation triggered")
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email format is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission with validation and API call
   * @param {Event} event - The form submission event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const result = await registrationService.registerUser(
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      setMessage({
        text: `Registration successful! User ID: ${result.userId}`,
        type: "success"
      });

      // Reset form:
      setFormData({ email: "", password: "", confirmPassword: "" });
      setErrors({});

    } catch (error) {
      setMessage({
        text: `Error: ${error.message}`,
        type: "error"
      });

    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Generates CSS class names for input fields based on validation state
   * @param {string} fieldName - The name of the form field
   * @returns {string} CSS class names for the input field
   */
  const getInputClassName = (fieldName) => {
    const baseClass = "registration-form__input";
    return errors[fieldName] ? `${baseClass} ${baseClass}--error` : baseClass;
  };

  /**
   * Generates CSS class names for message display based on message type
   * @returns {string} CSS class names for the message container
   */
  const getMessageClassName = () => {
    const baseClass = `registration-form__message`;
    return message.type ? `${baseClass} ${baseClass}--${message.type}` : baseClass;
  };

  return (
    <div className="registration-form">
      <h2 className="registration-form__title">User Registration</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="registration-form__field">
          <label htmlFor="email" className="registration-form__label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={getInputClassName("email")}
            required
          />
          {errors.email && <span className="registration-form__error">{errors.email}</span>}
        </div>

        <div className="registration-form__field">
          <label htmlFor="password" className="registration-form__label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={getInputClassName("password")}
            required
          />
          {errors.password && <span className="registration-form__error">{errors.password}</span>}
        </div>

        <div className="registration-form__field">
          <label htmlFor="confirmPassword" className="registration-form__label">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={getInputClassName("confirmPassword")}
            required
          />
          {errors.confirmPassword && <span className="registration-form__error">{errors.confirmPassword}</span>}
        </div>

        <button  
          type="submit"
          disabled={isLoading}
          className={`registration-form__button ${isLoading ? "registration-form__button--disabled" : ""}`}>
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      {message.text && (
        <div className={getMessageClassName()}>
          {message.text}
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;
