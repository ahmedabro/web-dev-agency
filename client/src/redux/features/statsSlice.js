import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchStats = createAsyncThunk('stats/fetchStats', async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/stats`);
  return response.data;
});

const initialState = {
  stats: [],
  status: 'idle',
  error: null,
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStats.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchStats.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.stats = action.payload.stats;
    });
    builder.addCase(fetchStats.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
});

export default statsSlice.reducer;