import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './features/themeSlice'
import { serviceApi } from './api/serviceApi'
import statsReducer from './features/statsSlice'
import serviceReducer from './features/serviceSlice'
import projectReducer from './features/projectSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    stats: statsReducer,
    projects: projectReducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serviceApi.middleware),
})