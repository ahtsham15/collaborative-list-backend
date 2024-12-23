import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Async thunk to fetch tasks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    // Check if token is available
    if (!token) {
      return rejectWithValue('No token found');
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/task-list/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // This will be the list of tasks
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  },
);

// Tasks slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload; // Store tasks in state
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default tasksSlice.reducer;
