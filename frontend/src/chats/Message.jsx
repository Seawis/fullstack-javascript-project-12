import { Card, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { actions as modalActions } from '../slices/modalSlice.js';

const RenderMessage = ({ message }) => {
  const {body, username, timestamp} = message // id
  const dispatch = useDispatch()
  const { t } = useTranslation()
  
  const userId = JSON.parse(localStorage.getItem('userId'))

  const handleModal = (modalType) => () => {
    dispatch(modalActions.setShow({
      type: modalType,
      dataType: 'message',
      data: message,
    }))
  }

  return userId.username === username
    ? (
        <Dropdown as={ButtonGroup} className="align-self-end">
          <Card className="border-0 bg-primary text-white rounded-end-0">
            <Card.Body className="p-2 px-3">
              <div>{body}</div>
              <small className="text-white-50 d-block text-end">{timestamp}</small>
            </Card.Body>
          </Card>
          <Dropdown.Toggle />
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleModal('rename')}>{t('rename')}</Dropdown.Item>
            <Dropdown.Item onClick={handleModal('delete')}>{t('del')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
    : (
        <Card
          className="border-0
          shadow-sm
          align-self-start"
          style={{ maxWidth: '75%' }}
        >
          <Card.Body className="p-2 px-3">
            <small className="text-primary fw-bold">{username}</small>
            <div>{body}</div>
            <small className="text-muted d-block text-end">{timestamp}</small>
          </Card.Body>
        </Card>
      )
}

export default RenderMessage
