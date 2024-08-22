import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

export const fetchCertificates = createAsyncThunk('certificates/fetchCertificates', async () => {
  const response = await axios.get('/certificates/read_certificates_certificates__get');
  return response.data;
});

export const createCertificate = createAsyncThunk('certificates/createCertificate', async (certificate) => {
  const response = await axios.post('/certificates/create_certificate_certificates__post', certificate);
  return response.data;
});

interface CertificateState {
  certificates: any[];  // Replace `any[]` with your actual certificate type if available
  loading: boolean;
  error: string | null;  // Allow `null` or `string`
}

const initialState: CertificateState = {
  certificates: [],
  loading: false,
  error: null,
};

const certificateSlice = createSlice({
  name: 'certificate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertificates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCertificates.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates = action.payload;
      })
      .addCase(fetchCertificates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";  // Handle undefined case
      })
      .addCase(createCertificate.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates.push(action.payload);
      })
      .addCase(createCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";  // Handle undefined case
      });
  },
});

export default certificateSlice.reducer;
