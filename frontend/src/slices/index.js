import { configureStore } from '@reduxjs/toolkit'
import channelReducer from './channelsSlice.js'
import messagesReducer from './messagesSlice.js'
import modalReducer from './modalSlice.js'

export default configureStore({
  reducer: {
    channelReducer,
    messagesReducer,
    modalReducer,
  },
})
