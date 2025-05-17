/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState('No Token');
  const [role, setRole] = useState('No Role');

  const fetchSession = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/get-token`, {
        withCredentials: true,
      });

      const freshToken = res.data.token;
      setToken(freshToken);

      const userData = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/get-user`, {
        headers: { Authorization: `Bearer ${freshToken}` },
        withCredentials: true,
      });

      setRole(userData.data.user.role); // NOTE: use `data.user.role`, not just `user.role`
    } catch (error) {
      setToken('Error');
    }
  };

  useEffect(() => {
    if (role && role !== 'No Role') {
      if (role === 'Admin') navigate('/admindashboard');
      else if (role === 'Employee') navigate('/empdashboard');
      else if (role === 'Marketing Agency') navigate('/madashboard');
      else navigate('/login');
    }
  }, [role, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };

    axios.post('http://localhost:8082/login', payload, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })
  .then((res) => {
    alert(res.data); // will show 'Login Successful' or 'Invalid Password'
    if (res.data === 'Login Successful') {
      // Redirect to dashboard, save token, etc.
      navigate('/admindashboard'); // Or based on role
    }
  })
  .catch((err) => {
    console.error(err);
    alert('Login Failed');
  });

  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-md w-full border border-blue-100">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-center">
          <h1 className="text-white text-2xl font-bold">Welcome Back</h1>
          <p className="text-blue-100 mt-1">Sign in to your account</p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                {/* eslint-disable jsx-a11y/label-has-associated-control */}
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                  <a href="/signup" className="text-xs text-blue-600 hover:text-blue-800">
                    Forgot Password?
                  </a>
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />

                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center mb-6">
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-white"
                />
                <span className="ml-2">Remember me</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center mt-8">
            <div className="flex-grow border-t border-gray-300" />
            <span className="flex-shrink mx-4 text-gray-500 text-sm">Or continue with</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => {
                window.location.href = 'http://localhost:8080/oauth2/authorization/google';
              }}
              className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-300 text-gray-700"
              type="button"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button
              className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-300 text-gray-700"
              type="button"
            >
              <svg className="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M20 12a8 8 0 10-9.25 7.903v-5.59H8.719V12h2.031v-1.762c0-2.005 1.194-3.113 3.022-3.113.875 0 1.79.156 1.79.156V9.25h-1.008c-.994 0-1.304.617-1.304 1.25V12h2.219l-.355 2.313H13.25v5.59A8.002 8.002 0 0020 12z" />
              </svg>
              Facebook
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center mt-8 text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
