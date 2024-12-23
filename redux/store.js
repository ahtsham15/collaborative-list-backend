'use client'; // Required to use Redux in the Next.js app directory

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import tasksReducer from '@/features/tasksSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
});

export default store;
