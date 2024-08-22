import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

// Define async thunks
export const fetchTestResults = createAsyncThunk('testResults/fetchTestResults', async () => {
  const response = await axios.get('/test_results/read_test_results_test_results__get');
  return response.data;
});

export const createTestResult = createAsyncThunk('testResults/createTestResult', async (result: any) => {
  const response = await axios.post('/test_results/create_test_result_test_results__post', result);
  return response.data;
});

// Define the state type
interface TestResultState {
  results: any[]; // Replace `any[]` with the actual type for test result data if available
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: TestResultState = {
  results: [],
  loading: false,
  error: null,
};

// Create the slice
const testResultSlice = createSlice({
  name: 'testResult',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchTestResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch test results';
      })
      .addCase(createTestResult.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTestResult.fulfilled, (state, action) => {
        state.loading = false;
        state.results.push(action.payload);
      })
      .addCase(createTestResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create test result';
      });
  },
});

// Export the reducer to be used in the store
export default testResultSlice.reducer;
