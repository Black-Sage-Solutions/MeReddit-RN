/**
 * 
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type OAuthState = {
  accessToken:  string
  error:        string | null
  expires:      number | null  // change to date?
  refreshToken: string
  tokenType:    'bearer' | null
}

// TODO: need to save, securly, the tokens for app startups
const initialState: OAuthState = {
  accessToken:  '',
  error:        null,
  expires:      null,
  refreshToken: '',
  tokenType:    null,
}

export type UpdateToken = {
  accessToken:   string
  expires:       number
  refreshToken?: string
  tokenType:     'bearer'
}

export const oauthSlice = createSlice({
  name: 'oauth',
  initialState,
  reducers: {
    clear: (state, action: PayloadAction<undefined>) => {
      return initialState
    },
    updateError: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload,
      }
    },
    updateToken: (state, action: PayloadAction<UpdateToken>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { clear, updateError, updateToken } = oauthSlice.actions

export default oauthSlice.reducer
