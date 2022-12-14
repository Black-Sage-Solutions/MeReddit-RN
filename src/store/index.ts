/**
 * 
 */
import { configureStore } from '@reduxjs/toolkit'

import { setupListeners } from '@reduxjs/toolkit/query'

import oauthReducer from '@utils/oauth/reducer'

import { noauthApi } from '@app/reddit/noauth-api'

const middleware: any[] = []

if (__DEV__) {
  const createDebugger = require("redux-flipper").default
  middleware.push(createDebugger())
}

export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: true,
      immutableCheck: true,
      serializableCheck: {
        warnAfter: 256,
      },
    }).concat(
      noauthApi.middleware,
      ...middleware
    )
  },
  reducer: {
    oauth: oauthReducer,
    [noauthApi.reducerPath]: noauthApi.reducer,
  }
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
