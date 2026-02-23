import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './features/themeSlice'
import { serviceApi } from './api/serviceApi'
import { statsApi } from './api/statsApi'
import { projectApi } from './api/projectApi'
import { skillsApi } from './api/skillsApi'
import { experienceApi } from './api/experienceApi'
import { testimonialsApi } from './api/testimonialsApi'
import { blogsApi } from './api/blogsApi'
import { userApi } from './api/userApi'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [skillsApi.reducerPath]: skillsApi.reducer,
    [experienceApi.reducerPath]: experienceApi.reducer,
    [testimonialsApi.reducerPath]: testimonialsApi.reducer,
    [blogsApi.reducerPath]: blogsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      statsApi.middleware,
      serviceApi.middleware,
      projectApi.middleware,
      skillsApi.middleware,
      experienceApi.middleware,
      testimonialsApi.middleware,
      blogsApi.middleware,
      userApi.middleware,
    ),
})