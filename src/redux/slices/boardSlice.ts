import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

export const fetchBoards = createAsyncThunk('boards/fetchBoards', async () => {
  const response = await axios.get('/boards');
  return response.data;
});

export const createBoard = createAsyncThunk('boards/createBoard', async (board) => {
  const response = await axios.post('/boards', board);
  return response.data;
});

interface BoardState {
  boards: any[];  // Replace `any[]` with your actual board type if available
  loading: boolean;
  error: string | null;  // Allow `null` or `string`
}

const initialState: BoardState = {
  boards: [],
  loading: false,
  error: null,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";  // Handle undefined case
      })
      .addCase(createBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.boards.push(action.payload);
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";  // Handle undefined case
      });
  },
});

export default boardSlice.reducer;
