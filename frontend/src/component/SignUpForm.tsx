import React, { useState } from 'react';

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regular expresions for email
    return regex.test(email) && email.endsWith('.com');
  };

  const validateForm = () => {
    const newErrors = {
      firstName: formData.firstName ? '' : 'First Name is required',
      lastName: formData.lastName ? '' : 'Last Name is required',
      username: formData.username ? '' : 'Username is required',
      email: validateEmail(formData.email) ? '' : 'Invalid email (must contain @ and end with .com)',
      password: formData.password ? '' : 'Password is required',
      confirmPassword:
        formData.confirmPassword === formData.password ? '' : 'Passwords do not match',
    };

    setErrors(newErrors);

    // Check if all fields are valid
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Form submitted successfully!');
      console.log('Form Data:', formData);
      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } else {
      alert('Please fix the errors before submitting.');
    }
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.username &&
      validateEmail(formData.email) &&
      formData.password &&
      formData.confirmPassword === formData.password
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <div className='flex gap-4'>
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              maxLength={50}
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              maxLength={50}
              minLength={2}
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="flex gap-2">
          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid()}
          className={`w-full bg-blue-600 text-white p-2 rounded ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;