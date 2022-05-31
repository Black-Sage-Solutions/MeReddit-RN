/**
 * 
 */
import { configureStore } from '@reduxjs/toolkit'

import oauthReducer from '@utils/oauth/reducer'

const middleware = []

if (__DEV__) {
  const createDebugger = require("redux-flipper").default
  middleware.push(createDebugger())
}

export const store = configureStore({
  middleware,
  reducer: {
    oauth: oauthReducer,
  }
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
