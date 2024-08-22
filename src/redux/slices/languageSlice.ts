import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

// Async Thunks
export const fetchLanguages = createAsyncThunk('languages/fetchLanguages', async () => {
  const response = await axios.get('/languages');
  return response.data;
});

export const createLanguage = createAsyncThunk('languages/createLanguage', async (language) => {
  const response = await axios.post('/languages', language);
  return response.data;
});

// Define the initial state using a typesafe interface
interface LanguageState {
  languages: any[]; // Replace `any[]` with the actual type for language data if available
  loading: boolean;
  error: string | null;
}

const initialState: LanguageState = {
  languages: [],
  loading: false,
  error: null,
};

// Create the slice
const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.loading = false;
        state.languages = action.payload;
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch languages';
      })
      .addCase(createLanguage.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLanguage.fulfilled, (state, action) => {
        state.loading = false;
        state.languages.push(action.payload);
      })
      .addCase(createLanguage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create language';
      });
  },
});

// Export the reducer to be used in the store
export default languageSlice.reducer;
