import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

export const fetchClasses = createAsyncThunk('classes/fetchClasses', async () => {
  const response = await axios.get('/classes');
  return response.data;
});

export const createClass = createAsyncThunk('classes/createClass', async (cls) => {
  const response = await axios.post('/classes', cls);
  return response.data;
});

interface ClassState {
  classes: any[];  // Replace `any[]` with the correct type for your class data
  loading: boolean;
  error: string | null;  // Error can be either a string or null
}

const initialState: ClassState = {
  classes: [],
  loading: false,
  error: null,
};

const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      })
      .addCase(createClass.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.loading = false;
        state.classes.push(action.payload);
      })
      .addCase(createClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
  },
});

export default classSlice.reducer;
