import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  color: null,
  minCarCount: 0,
  maxCarCount: 10,
  serviceType: null,
}

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setMinCarCount: (state, action) => {
      state.minCarCount = action.payload;
    },
    setMaxCarCount: (state, action) => {
      state.maxCarCount = action.payload;
    },
    setServiceType: (state, action) => {
      state.serviceType = action.payload;
    }
  }
}
)

export const { setMinCarCount, setMaxCarCount, setColor, setServiceType } = sortSlice.actions

export default sortSlice.reducer;