import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

import { actions as channelsActions } from '../slices/channelsSlice.js'

const messagesAdapter = createEntityAdapter() // По умолчанию: { ids: [], entities: {} }
const initialState = messagesAdapter.getInitialState()

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,

    setMessages: messagesAdapter.addMany,

    editMessage: messagesAdapter.updateOne,

    removeMessage(state, { payload }) {
      messagesAdapter.removeOne(state, payload)
    },
  },
  extraReducers: (builder) => {
    const { removeChannel } = channelsActions

    builder.addCase(removeChannel, (state, { payload }) => {
      const idsForRemove = Object.values(state.entities)
        .filter(m => m.channelId === payload)
        .map(message => message.id)
      messagesAdapter.removeMany(state, idsForRemove)
    })
  },
})

export const { actions } = messagesSlice
export const selectors = messagesAdapter.getSelectors(state => state.messagesReducer)
export default messagesSlice.reducer
