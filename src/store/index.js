import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counterSlice'
import settingsSlice from './slices/settingsSlice'
export const store = configureStore({
  reducer: {
    counterSlice,
    settingsSlice
  },
})