import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './features/themeSlice'
import { serviceApi } from './api/serviceApi'
import { statsApi } from './api/statsApi'
import { projectApi } from './api/projectApi'
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      statsApi.middleware,
      serviceApi.middleware,
      projectApi.middleware,
    ),
})