import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  token: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials (state, { payload }) {
      state.username = payload.username
      state.token = payload.token
    },
  },
})

export const { setCredentials } = authSlice.actions
export default authSlice.reducer
// export const currentUser = (state) => state.auth.username
