import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

// Define async thunks
export const fetchTopicProgresses = createAsyncThunk('topicProgress/fetchTopicProgresses', async () => {
  const response = await axios.get('/topic_progress/read_topic_progresses_topic_progress__get');
  return response.data;
});

export const createTopicProgress = createAsyncThunk('topicProgress/createTopicProgress', async (progress: any) => {
  const response = await axios.post('/topic_progress/create_topic_progress_topic_progress__post', progress);
  return response.data;
});

// Define the state type
interface TopicProgressState {
  progresses: any[]; // Replace `any[]` with the actual type for topic progress data if available
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: TopicProgressState = {
  progresses: [],
  loading: false,
  error: null,
};

// Create the slice
const topicProgressSlice = createSlice({
  name: 'topicProgress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopicProgresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopicProgresses.fulfilled, (state, action) => {
        state.loading = false;
        state.progresses = action.payload;
      })
      .addCase(fetchTopicProgresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch topic progresses';
      })
      .addCase(createTopicProgress.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTopicProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progresses.push(action.payload);
      })
      .addCase(createTopicProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create topic progress';
      });
  },
});

export default topicProgressSlice.reducer;
