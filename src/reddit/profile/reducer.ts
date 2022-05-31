import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ProfileState = {
  me: any | null
}

const initialState: ProfileState = {
  me: null
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
	reducers: {
    clear: (state, action: PayloadAction<undefined>) => initialState,
    updateMe: (state, action: PayloadAction<any>) => state.me = action.payload,
  }
})

export const { clear, updateMe } = profileSlice.actions

export default profileSlice.reducer