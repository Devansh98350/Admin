import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

// Define async thunks
export const fetchTests = createAsyncThunk('tests/fetchTests', async () => {
  const response = await axios.get('/tests/read_tests_tests__get');
  return response.data;
});

export const createTest = createAsyncThunk('tests/createTest', async (test: any) => {
  const response = await axios.post('/tests/create_test_tests__post', test);
  return response.data;
});

// Define the state type
interface TestState {
  tests: any[]; // Replace `any[]` with the actual type for test data if available
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: TestState = {
  tests: [],
  loading: false,
  error: null,
};

// Create the slice
const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTests.fulfilled, (state, action) => {
        state.loading = false;
        state.tests = action.payload;
      })
      .addCase(fetchTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tests';
      })
      .addCase(createTest.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTest.fulfilled, (state, action) => {
        state.loading = false;
        state.tests.push(action.payload);
      })
      .addCase(createTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create test';
      });
  },
});

export default testSlice.reducer;
