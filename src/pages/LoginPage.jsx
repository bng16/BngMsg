import { useEffect, useState } from 'react';
import { useAuth } from "../utils/AuthContext";
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const { user, handleUserLogin } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]); // Add user and navigate to dependencies

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        <form onSubmit={(e) => { handleUserLogin(e, credentials) }}>
          {/* Error Message */}
          {/* <p className="text-red-500 mb-4">Error message here</p> */}

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name='email'
              required
              id="email"
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
              placeholder="Enter your email..."
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name='password'
              required
              id="password"
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
              placeholder="Enter your password..."
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <input
              type="submit"
              value='Login' // Remove child elements from the input
              className="w-full bg-pink-600 text-white font-bold py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </form>
        <p>Dont have an account? Register <Link to="/register">here</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
