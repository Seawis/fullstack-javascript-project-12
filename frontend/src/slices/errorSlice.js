import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isError: false,
}

const errorSlice = createSlice({
  name: 'isError',
  initialState,
  reducers: {
    setError (state, { payload }) {
      // state.isError = !state.isError
      state.isError = payload
    },
  },
})

// export const { setError } = errorSlice.actions
// export default errorSlice.reducer
