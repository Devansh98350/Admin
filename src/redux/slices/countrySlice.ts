import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

// Fetch all countries without pagination
export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
  const response = await axios.get('/countries');
  return response.data;
});

export const createCountry = createAsyncThunk('countries/createCountry', async (country) => {
  const response = await axios.post('/countries', country);
  return response.data;
});

interface CountryState {
  countries: any[]; // Replace `any[]` with the correct type for your country data
  loading: boolean;
  error: string | null; // Error can be either a string or null
}

const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      })
      .addCase(createCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.countries.push(action.payload);
      })
      .addCase(createCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
  },
});

export default countrySlice.reducer;
