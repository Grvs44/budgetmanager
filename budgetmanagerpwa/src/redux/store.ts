import { configureStore } from '@reduxjs/toolkit'
import titleReducer from './titleSlice'
import userReducer from './userSlice'
import { apiSlice } from './apiSlice'

export default configureStore({
  reducer: {
    title: titleReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
