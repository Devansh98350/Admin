import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

// Define types for the State and StateState
interface State {
  id?: number; // Optional, for cases where the ID is generated on the server
  country_code: string;
  state_name: string;
  state_code: string;
}

interface StateState {
  states: State[];
  loading: boolean;
  error: string | null;
}

// Async Thunks
export const fetchStates = createAsyncThunk<State[]>('states/fetchStates', async () => {
  const response = await axios.get('/states');
  return response.data;
});

export const createState = createAsyncThunk<State, State>('states/createState', async (state) => {
  const response = await axios.post('/states', state);
  return response.data;
});

// Initial State
const initialState: StateState = {
  states: [],
  loading: false,
  error: null,
};

// Create Slice
const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch states';
      })
      .addCase(createState.pending, (state) => {
        state.loading = true;
      })
      .addCase(createState.fulfilled, (state, action) => {
        state.loading = false;
        state.states.push(action.payload);
      })
      .addCase(createState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create state';
      });
  },
});

export default stateSlice.reducer;
