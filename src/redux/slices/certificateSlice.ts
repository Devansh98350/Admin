import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store'; // Adjust import according to your store setup

interface Certificate {
  id?: string; // Add an id field if needed
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

// Async thunk to fetch certificates
export const fetchCertificates = createAsyncThunk<
  Certificate[], // Return type
  void, // Argument type (none in this case)
  { rejectValue: string } // Reject value type
>(
  'certificates/fetchCertificates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/certificates');
      if (!response.ok) {
        throw new Error('Failed to fetch certificates');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk to create a certificate
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
      .addCase(fetchCertificates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCertificates.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates = action.payload;
      })
      .addCase(fetchCertificates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
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
        state.error = action.payload as string;
      });
  },
});

export default certificateSlice.reducer;
