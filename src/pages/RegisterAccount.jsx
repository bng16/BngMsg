import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../utils/AuthContext';

function RegisterAccount() {

  const { handleUserRegister } = useAuth();

  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.password2) {
      setError("Passwords do not match");
      return;
    }

    // Proceed with registration if passwords match
    handleUserRegister(credentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Create Account</h2>
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              id="username"
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
              placeholder="Enter your username..."
              value={credentials.username}
              onChange={handleInputChange}
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              id="email"
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
              placeholder="Enter your email..."
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              id="password"
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
              placeholder="Enter your password..."
              value={credentials.password}
              onChange={handleInputChange}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}"
              title="Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character."
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password2">
              Confirm Password
            </label>
            <input
              type="password"
              name="password2"
              required
              id="password2"
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
              placeholder="Confirm your password..."
              value={credentials.password2}
              onChange={handleInputChange}
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <input
              type="submit"
              value="Create Account"
              className="w-full bg-pink-600 text-white font-bold py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </form>
        <p className="text-white mt-2">Already have an account? Login <Link className="text-blue-500" to="/login">here</Link></p>
      </div>
    </div>
  );
}

export default RegisterAccount;
