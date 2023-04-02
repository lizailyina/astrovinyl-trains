import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios.js';

export const fetchTrains = createAsyncThunk(
  'train/fetchTrains',
  async () => {
    const { data } = await axios.get("https://api.wmata.com/TrainPositions/TrainPositions?contentType=json");
    return data.TrainPositions;
  }
)

const initialState = {
  items: [],
  status: ""
}

const trainSlice = createSlice({
  name: 'train',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrains.pending, (state) => {
      state.status = 'loading';
    })

      .addCase(fetchTrains.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'complited';
      })

      .addCase(fetchTrains.rejected, (state) => {
        state.items = [];
        state.status = 'error';
      })
  }
}
)

export default trainSlice.reducer;