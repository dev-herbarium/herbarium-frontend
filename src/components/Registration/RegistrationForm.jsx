// src/components/Registration/RegistrationForm.jsx
import { useState } from "react";
import registrationService from "../../services/registrationService";
import './RegistrationForm.css'

/**
 * <b>Registration Form Component</b>
 * 
 * @returns
 */
function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousState) => ({
      // 1. Take the previous object state ('previousState')
      ...previousState,
      // 2. Overwrite/add a new property: The key '[name]' (e.g., 'username')
      //    is set to the new 'value' typed by the user.
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const result = await registrationService.registerUser(
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      setMessage(`Registration successful! User ID: ${result.userId}`);

      // Reset form:
      setFormData({ email: "", password: "", confirmPassword: "" });

    } catch (error) {
      setMessage(`Error: ${error.message}`);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-form">
      <h2 className="registration-form__title">User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="registration-form__field">
          <label htmlFor="email" className="registration-form__label">Email:</label>
          <input
            className="registration-form__input"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="registration-form__field">
          <label htmlFor="password" className="registration-form__label">Password:</label>
          <input
            className="registration-form__input"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="registration-form__field">
          <label htmlFor="confirmPassword" className="registration-form__label">Confirm Password:</label>
          <input
            className="registration-form__input"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button  className="registration-form__button" type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default RegistrationForm;
