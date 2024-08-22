import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

export const fetchChapterProgresses = createAsyncThunk('chapterProgress/fetchChapterProgresses', async () => {
  const response = await axios.get('/chapter_progress/read_chapter_progresses_chapter_progress__get');
  return response.data;
});

export const createChapterProgress = createAsyncThunk('chapterProgress/createChapterProgress', async (progress) => {
  const response = await axios.post('/chapter_progress/create_chapter_progress_chapter_progress__post', progress);
  return response.data;
});

interface ChapterProgressState {
  progresses: any[];  // Replace `any[]` with the correct type for your progress data
  loading: boolean;
  error: string | null;  // Error can be either a string or null
}

const initialState: ChapterProgressState = {
  progresses: [],
  loading: false,
  error: null,
};

const chapterProgressSlice = createSlice({
  name: 'chapterProgress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChapterProgresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChapterProgresses.fulfilled, (state, action) => {
        state.loading = false;
        state.progresses = action.payload;
      })
      .addCase(fetchChapterProgresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";  // Provide a fallback error message
      })
      .addCase(createChapterProgress.pending, (state) => {
        state.loading = true;
      })
      .addCase(createChapterProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progresses.push(action.payload);
      })
      .addCase(createChapterProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";  // Provide a fallback error message
      });
  },
});

export default chapterProgressSlice.reducer;
