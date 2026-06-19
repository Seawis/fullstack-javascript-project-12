import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  show: false,
  type: null, // add, rename, delete
  dataType: null, // message, channel
  data: null,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setShow(state, { payload } ) {
      const {type, dataType, data} = payload
      state.type = type
      state.dataType = dataType
      state.data = data
      state.show = true
    },
    setClose(state, { payload } ) {
      state.type = null
      state.dataType = null
      state.data = null
      state.show = false
    },
  },
})

export const { actions } = modalSlice
export default modalSlice.reducer
