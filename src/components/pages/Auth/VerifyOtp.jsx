import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addTokens, setVerifyUserInfo } from '../../../features/auth/authSlice';
import { addDetails } from '../../../features/auth/profileSlice';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const userInfo = useSelector((state) => state.auth.user);
  const [error, setError] = useState(null);
  const [errCode, setErrCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    setError(null);
    setErrCode(null);
    setSuccess(false);

    if (enteredOtp.length !== 6) {
      setError('Please enter complete 6-digit OTP');
      setErrCode(400);
      return;
    }

    if (!userInfo?.email) {
      setError('User email not found. Please login again.');
      setErrCode(400);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/verify`,
        {
          otp: enteredOtp,
          email: userInfo.email,
        },
        {
          headers: {
            'x-api-key': import.meta.env.VITE_SWAGGER_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
console.log('OTP verification response:', response.data);
      dispatch(setVerifyUserInfo(response.data));
      dispatch(addDetails(response.data))
      dispatch(addTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      }));
      setSuccess(true);

      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (error) {
      console.log('Error during OTP verification:', error);
      const { response } = error;
      const statusCode = response?.data?.statusCode || response?.status;
      const message = response?.data?.message;

      setErrCode(statusCode);

      if (statusCode === 400) {
        setError(message || 'Invalid OTP. Please try again.');
      } else if (statusCode === 401) {
        setError('OTP has expired. Please request a new one.');
      } else if (statusCode === 404) {
        setError('User not found. Please login again.');
      } else if (statusCode === 429) {
        setError('Too many attempts. Please try again later.');
      } else {
        setError(message || 'Verification failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!userInfo?.email) {
      setError('User email not found. Please login again.');
      return;
    }

    setLoading(true);
    setError(null);
    setErrCode(null);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/login`,
        { email: userInfo.email },
        {
          headers: {
            'x-api-key': import.meta.env.VITE_SWAGGER_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccess(true);
      setError('New OTP sent successfully!');
      setOtp(new Array(6).fill(''));
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
      setErrCode(500);
    } finally {
      setLoading(false);
    }
  };
const userDetails = useSelector((state) => state.auth.user);
  console.log('User details in VerifyOtp:', userDetails);
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 relative"
      >
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {success && !error && (
          <div className="bg-green-500 text-white p-3 rounded mb-4 text-center">
            OTP verified successfully! Redirecting...
          </div>
        )}

        <h2 className="text-2xl font-bold text-center mb-4">OTP Verification</h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Please enter the 6-digit OTP sent to your email.
          {userInfo?.email && (
            <span className="block text-blue-400 mt-1">{userInfo.email}</span>
          )}
        </p>

        <div className="flex justify-between gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-medium bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={loading}
            />
          ))}
        </div>

        <div className="flex flex-col space-y-4">
          <button
            type="submit"
            disabled={loading || otp.join('').length !== 6}
            className="bg-neutral-950 text-neutral-400 border border-neutral-400 border-b-4 font-medium overflow-hidden relative px-10 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="bg-neutral-400 shadow-neutral-400 absolute -top-[150%] left-1/2 -translate-x-1/2 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            {loading ? 'Verifying...' : 'Verify'}
          </button>

          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">Didn't receive the OTP?</p>
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={loading}
              className="text-blue-400 hover:text-blue-300 underline text-sm disabled:opacity-50"
            >
              Resend OTP
            </button>
          </div>

          <Link
            to="/login"
            className="text-center text-gray-400 hover:text-white underline text-sm"
          >
            Back to Login
          </Link>
        </div>

        <div className="absolute -top-16 -left-16 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      </form>
    </div>
  );
};

export default VerifyOtp;