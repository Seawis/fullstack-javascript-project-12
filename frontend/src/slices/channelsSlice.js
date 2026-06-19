import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  channels: [],
  activeId: '1',
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload
    },

    setActiveId(state, { payload }) {
      state.activeId = payload
    },

    addChannel(state, { payload }) {
      state.channels.push(payload)
    },

    removeChannel(state, { payload }) {
      state.activeId = state.activeId === payload.id ? '1' : state.activeId
      state.channels = state.channels.filter(c => c.id !== payload.id)
    },

    renameChannel(state, { payload }) {
      const index = state.channels.findIndex(c => c.id === payload.id)
      state.channels[index] = payload
    },
  },
})

export const { actions } = channelsSlice
export default channelsSlice.reducer
