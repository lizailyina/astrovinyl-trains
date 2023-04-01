import { configureStore } from '@reduxjs/toolkit'
import sortSlice from './slices/sort.js'

export const store = configureStore({
  reducer: { sort: sortSlice },
})