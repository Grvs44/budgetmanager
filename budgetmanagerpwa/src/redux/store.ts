import { configureStore } from '@reduxjs/toolkit'
import titleReducer from './titleSlice'
import { apiSlice } from './apiSlice'

export default configureStore({
  reducer: {
    title: titleReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
