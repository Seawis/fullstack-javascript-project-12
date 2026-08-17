
import { Hash } from 'react-bootstrap-icons'; // Используем иконки
import { useSelector } from 'react-redux';

import RenderMessage from './Message.jsx';
import AddMessage from './MessageAdd.jsx';
import { selectors } from '../slices/messagesSlice.js';

const MessagesList = () => {
  const channelId = useSelector(state => state.channelReducer.activeId)

  const channelName = () => {
    const currentChannel = useSelector(state => state.channelReducer.channels)
      .find(c => c.id === channelId.toString())
      return currentChannel ? currentChannel.name : ''
  }
 
  const messages = Object.values(useSelector(selectors.selectAll)) // useSelector(state => state.messagesReducer.messages)
    .filter(m => m.channelId.toString() === channelId.toString())
    .reverse()

  return (
    <>
      <div className="p-3 border-bottom bg-white">
        <h5 className="mb-3 fw-bold"><Hash size={20} /> {channelName()}</h5>
      </div>

      <div className="flex-grow-1 p-3 overflow-auto" style={{ maxHeight: '580px'}}>
        <div className="d-flex flex-column gap-3">
          {messages && messages.map(message => (
            <RenderMessage key={message.id} message={message} />
          ))}
        </div>
      </div>

      <AddMessage />
    </>
  );
};

export default MessagesList;
