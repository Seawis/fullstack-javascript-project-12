import { io } from 'socket.io-client'
import store from '../slices/index';

import { actions as channelsActions } from '../slices/channelsSlice.js'
import { actions as messagesActions } from '../slices/messagesSlice.js'

const URL = 'http://localhost:5002'
// export const socket = io(URL, { autoConnect: false })
const socket = io(URL) // export const socket = io(URL)

const socketIo = () => {
  const { dispatch } = store
  
  // subscribe new messages
  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload))
  })

  // subscribe new channel
  socket.on('newChannel', (payload) => {
    dispatch(channelsActions.addChannel(payload))
  });
  
  // subscribe remove channel
  socket.on('removeChannel', (payload) => { // { id: 6 };
    dispatch(channelsActions.removeChannel(payload))
  });

  // subscribe rename channel
  socket.on('renameChannel', (payload) => {
    dispatch(channelsActions.renameChannel(payload))
  });
  // При уничтожении компонента
  // socket.off('newChannel')
}

export default socketIo
export { socket }
