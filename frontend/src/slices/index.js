import { configureStore } from '@reduxjs/toolkit'
import channelReducer from './channelsSlice.js'
import authReducer from './authSlice.js'
import messagesReducer from './messagesSlice.js';
import modalReducer from './modalSlice.js';
// import errorReducer from './errorSlice.js'

export default configureStore({
  reducer: {
    channelReducer,
    authReducer,
    messagesReducer,
    modalReducer,
    // errorReducer,
  },
})
