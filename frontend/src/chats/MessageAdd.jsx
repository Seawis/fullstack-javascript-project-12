import { Form, Button, InputGroup } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import filtered from '../validate/leoProfanity.js';

import fetched, { erMessage } from '../fetch/fetched.js'

const AddMessage = () => {
  const inputRef = useRef(null)
  const { t } = useTranslation()

  const [text, setText] = useState('')
  
  const userId = JSON.parse(localStorage.getItem('userId'))
  const channelId = useSelector(state => state.channelReducer.activeId)

  useEffect(() => {
    inputRef.current.focus()
  }, [text])

  const handleMessage = (e) => setText(e.target.value)

  const sendMessage = (e) => {
    e.preventDefault()

    const newMessage = {
      body: filtered(text),
      channelId: channelId,
      username: userId.username,
      timestamp: new Date().toLocaleString(),
    }

    fetched.addMessage(newMessage, userId)
      .then(() => setText(''))
      .catch((err) => erMessage(err, t))
  }

  return (
    <div className="p-3 border-top">
      <Form onSubmit={sendMessage}>
        <InputGroup>
          <Form.Control
            ref={inputRef}
            placeholder={t('writeMessage')}
            aria-label="message"
            value={text}
            onChange={handleMessage}
          />
          <Button variant="outline-primary" type="submit" disabled={!text}>{t('send')}</Button>
        </InputGroup>
      </Form>
    </div>
  )
}

export default AddMessage
