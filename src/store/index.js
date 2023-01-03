import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../store/slices/counterSlice';
import settingsSlice from '../store/slices/settingsSlice';
import searchSlice from './slices/searchSlice';
import tokenSlice from './slices/tokenSlice';

export const store = configureStore({
  reducer: {
    counterSlice,
    settingsSlice,
    tokenSlice,
    searchSlice
  }
})