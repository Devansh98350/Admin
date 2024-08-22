import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

// Define async thunks
export const fetchSubjects = createAsyncThunk('subjects/fetchSubjects', async () => {
  const response = await axios.get('/subjects');
  return response.data;
});

export const createSubject = createAsyncThunk('subjects/createSubject', async (subject: any) => {
  const response = await axios.post('/subjects', subject);
  return response.data;
});

// Define the state type
interface SubjectState {
  subjects: any[]; // Replace `any[]` with the actual type for subject data if available
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: SubjectState = {
  subjects: [],
  loading: false,
  error: null,
};

// Create the slice
const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch subjects';
      })
      .addCase(createSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects.push(action.payload);
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create subject';
      });
  },
});

// Export the reducer to be used in the store
export default subjectSlice.reducer;
