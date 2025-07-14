import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { reqLoginUser } from '../../../features/auth/authSlice';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');

    const requestUrl = `${backendUrl}/auth/login`;

    try {
      const response = await axios.post(
        requestUrl,
        { email: email },
        {
          headers: {
            'x-api-key': import.meta.env.VITE_SWAGGER_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
dispatch(reqLoginUser(response.data));

      setSuccess('OTP sent successfully! Check your email.');
      navigate('/verify-otp');

    } catch (error) {
      console.error(' Error:', error);
      if (error.response) {
  
        const errorMessage = error.response.data?.message ||
          error.response.data?.error ||
          `Server error: ${error.response.status}`;
        setError(errorMessage);

      } else if (error.request) {

        setError('Network error. Please check your connection and ensure the server is running.');

      } else {
        setError('An unexpected error occurred: ' + error.message);
      }

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-400 dark:border-blue-800 w-full max-w-md"
      >
        <div className="px-8 py-10 md:px-10">
          <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
            Welcome Back!
          </h2>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
            We missed you, sign in to continue.
          </p>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          <div className="mt-10">
            <div className="relative">
              <label
                htmlFor="email"
                className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
              >
                Email
              </label>
              <input
                placeholder="you@example.com"
                className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                name="email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="mt-10">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : "Let's Go"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;