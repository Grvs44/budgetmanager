import { configureStore } from '@reduxjs/toolkit'
import titleReducer from './titleSlice'
import settingsReducer from './settingsSlice'
import { apiSlice } from './apiSlice'

export default configureStore({
  reducer: {
    title: titleReducer,
    settings: settingsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
