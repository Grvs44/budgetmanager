import { configureStore } from '@reduxjs/toolkit'
import installReducer from './installSlice'
import titleReducer from './titleSlice'
import settingsReducer from './settingsSlice'
import { apiSlice } from './apiSlice'

export default configureStore({
  reducer: {
    install: installReducer,
    title: titleReducer,
    settings: settingsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['install/setDeferredPrompt'],
        ignoredPaths: ['install.deferredPrompt'],
      },
    }).concat(apiSlice.middleware),
})
