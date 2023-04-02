import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  colors: ["RD", "BL", "YL", "OR", "GR", "SV", null],
  minCarCount: 0,
  maxCarCount: 10,
  undefinedCarCount: true,
  serviceTypes: ["NoPassengers", "Normal", "Special", "Unknown"],
}

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    toggleColor: (state, action) => {
      if (state.colors.includes(action.payload)) {
        state.colors.splice(state.colors.findIndex((el) => el === action.payload), 1);
      } else {
        state.colors.push(action.payload)
      }
    },
    toggleServiceTypes: (state, action) => {
      if (state.serviceTypes.includes(action.payload)) {
        state.serviceTypes.splice(state.serviceTypes.findIndex((el) => el === action.payload), 1);
      } else {
        state.serviceTypes.push(action.payload)
      }
    },
    setMinCarCount: (state, action) => {
      state.minCarCount = action.payload;
    },
    setMaxCarCount: (state, action) => {
      state.maxCarCount = action.payload;
    },
    toggleUndefinedCarCount: (state) => {
      state.undefinedCarCount = !state.undefinedCarCount;
    }
  }
}
)

export const { setMinCarCount, setMaxCarCount, toggleColor, toggleServiceTypes, toggleUndefinedCarCount } = sortSlice.actions

export default sortSlice.reducer;