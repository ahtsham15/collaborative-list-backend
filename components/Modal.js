'use client'; // Required to use Redux in the Next.js app directory

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser } from '../features/authSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast

const Modal = ({ closeModal, type }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const action = type === 'signup' ? registerUser : loginUser;
    const result = await dispatch(action(formData));
    console.log('The result is: ', result.payload);

    if (result.meta.requestStatus === 'fulfilled') {
      if (type === 'signin') {
        toast.success('Login successful!'); // Success toast for login
        router.push('/dashboard');
      } else {
        toast.success('Registration successful!'); // Success toast for registration
      }
      closeModal();
    } else {
      toast.error(result.payload.message || 'Something went wrong!'); // Error toast
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-lg w-[90%] max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {type === 'signup' ? 'Sign Up' : 'Sign In'}
        </h2>
        <form onSubmit={handleSubmit}>
          {type === 'signup' && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full border rounded p-2"
                required
                onChange={handleChange}
                value={formData.username}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border rounded p-2"
              required
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border rounded p-2"
              required
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          {error && <p className="text-red-500">{error.message}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-800"
            disabled={isLoading}
          >
            {isLoading
              ? 'Processing...'
              : type === 'signup'
                ? 'Register'
                : 'Login'}
          </button>
        </form>
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Modal;
