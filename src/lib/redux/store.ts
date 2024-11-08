import { configureStore } from '@reduxjs/toolkit' 
import reducer, { LinkAPI } from './features/shortLink/link'

export const makeStore = () => {
  return configureStore({
    reducer: {
      [LinkAPI.reducerPath]: LinkAPI.reducer,
      'link_slice':reducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(LinkAPI.middleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
