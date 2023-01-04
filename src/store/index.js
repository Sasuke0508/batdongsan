import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counterSlice'
import settingsSlice from './slices/settingsSlice'
import tokenSlice from './slices/tokenSlice';
import searchSlice from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    counterSlice,
    settingsSlice,
    tokenSlice,
    searchSlice
  }
})