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
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "ℹ️ Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "ℹ️ Email format is invalid!";
    }

    if (!formData.password) {
      newErrors.password = "ℹ️ Password is required!";
    } else if (formData.password.length < 6) {
      newErrors.password = "ℹ️ Password must be at least 6 characters!";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "ℹ️ Please confirm your password!";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "ℹ️ Passwords do not match!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
        text: `✅️ Registration successful! User ID: ${result.userId}`,
        type: "success"
      });

      // Reset form:
      setFormData({ email: "", password: "", confirmPassword: "" });
      setErrors({});

    } catch (error) {
      setMessage({
        text: `❌ ${error.message}`,
        type: "error"
      });

    } finally {
      setIsLoading(false);
    }
  };

  const getInputClassName = (fieldName) => {
    const baseClass = "registration-form__input";
    return errors[fieldName] ? `${baseClass} ${baseClass}--error` : baseClass;
  };

  const getMessageClassName = () => {
    const baseClass = `registration-form__message`;
    return message.type ? `${baseClass} ${baseClass}--${message.type}` : baseClass;
  };

  return (
    <div className="registration-form">
      <h2 className="registration-form__title">User Registration</h2>
      <form onSubmit={handleSubmit}>
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
