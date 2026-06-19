import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import ChannelList from '../chats/ChannelList.jsx';
import MessagesList from '../chats/MessagesList.jsx';
import fetched from '../fetch/fetched.js';
import Modal from './Modal.jsx';
// import useAuth from '../hooks/index.jsx'
import { erMessage } from '../fetch/fetched.js';

const MainPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  // const auth = useAuth()
  
  useEffect(() => {
    /*
    const userId = JSON.parse(localStorage.getItem('userId'))
    dispatch(setCredentials(userId))

    fetched.getChannels()
      .then(channels => dispatch(channelsActions.setChannels(channels.data)))
      .then(() => fetched.getMessages())
      .then(messages => dispatch(messagesActions.setMessages(messages.data)))
      .catch((error) => {
        erMessage(error, t)
          auth.logOut
          navigate('/login')
      })
    */
    const fetchContent = async () => {
      const userId = JSON.parse(localStorage.getItem('userId'))
      dispatch(setCredentials(userId))

      try {
        const channels = await fetched.getChannels()
        const messages = await fetched.getMessages()

        dispatch(channelsActions.setChannels(channels.data))
        dispatch(messagesActions.setMessages(messages.data))
      } catch (error) {
        erMessage(error, t)
        // auth.logOut
        // navigate('/login')
      }
    }

    fetchContent()
  }, [])
  
  return (
    <Container fluid className="alert alert-success d-flex flex-column" role="alert" style={{ height: '760px' }}>
      <Row className="g-0 h-100">
        <Col md={4} lg={3} className="d-flex flex-column border-end bg-white">
          <ChannelList />
        </Col>
        <Col md={8} lg={9} className="d-flex flex-column">
          <MessagesList />
        </Col>  
      </Row>
      <Modal/>
    </Container >
  )
}

export default MainPage
