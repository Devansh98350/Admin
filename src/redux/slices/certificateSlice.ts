import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store'; // Adjust import according to your store setup

interface Certificate {
  name: string;
  description: string;
}

interface CertificateState {
  certificates: Certificate[];
  loading: boolean;
  error: string | null;
}

const initialState: CertificateState = {
  certificates: [],
  loading: false,
  error: null,
};

// Async thunk action
export const createCertificate = createAsyncThunk<
  Certificate, // Return type
  Certificate, // Argument type
  { rejectValue: string } // Reject value type
>(
  'certificates/createCertificate',
  async (certificate, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(certificate),
      });
      if (!response.ok) {
        throw new Error('Failed to create certificate');
      }
      return await response.json();
    } catch (error) {
      // Cast the error to string or an appropriate type
      return rejectWithValue((error as Error).message);
    }
  }
);

const certificateSlice = createSlice({
  name: 'certificates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates.push(action.payload);
      })
      .addCase(createCertificate.rejected, (state, action) => {
        state.loading = false;
        // Handle error as a string
        state.error = action.payload as string;
      });
  },
});

export default certificateSlice.reducer;
