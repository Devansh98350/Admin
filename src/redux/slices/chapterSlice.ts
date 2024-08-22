import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

// Async thunk to fetch chapters
export const fetchChapters = createAsyncThunk('chapter/fetchChapters', async () => {
  const response = await axios.get('/chapters');
  return response.data;
});

// Async thunk to create a chapter
export const createChapters = createAsyncThunk('chapter/create', async (chapter: {
  chapter_code: string;
  subject_code: string;
  class_code: string;
  chapter_name: string;
  board_code: string;
}) => {
  const response = await axios.post('/chapters', chapter);
  return response.data;
});

// Create the slice
const chapterSlice = createSlice({
  name: 'chapter',
  initialState: {
    chapters: [] as any[], // Ensuring the type is any[] or specify the exact type if known
    loading: false,
    error: null as string | null | undefined, // Accepting null, undefined, or string
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChapters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChapters.fulfilled, (state, action) => {
        state.loading = false;
        state.chapters = action.payload;
      })
      .addCase(fetchChapters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error';
      });
  },
});

// Export the reducer
export default chapterSlice.reducer;
