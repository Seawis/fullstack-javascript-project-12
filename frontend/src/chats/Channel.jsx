import { ListGroup, Badge, Dropdown, ButtonGroup } from 'react-bootstrap'
import { Hash, Lock } from 'react-bootstrap-icons'; // Используем иконки
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next'

import { actions as channelsActions } from '../slices/channelsSlice'
import { actions as modalActions } from '../slices/modalSlice.js'
import { selectors } from '../slices/messagesSlice.js';

const RenderChannel = ({ channel }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { id, name, removable } = channel
  const isActiveChannel = useSelector(s => s.channelReducer.activeId).toString() === id

  const setActivelChannel = (id) => () => {
    dispatch(channelsActions.setActiveId(id))
  }

  const messagesCount = Object.values(useSelector(selectors.selectAll))
    .reduce((acc, { channelId }) => {
      acc[channelId] = (acc[channelId] || 0) + 1;
      return acc;
    }, {});

  const handleModal = (modalType) => () => {
    dispatch(modalActions.setShow({
      type: modalType,
      dataType: 'channel',
      data: channel,
    }))
  }

  return (
    <Dropdown as={ButtonGroup} className="rounded-0">
      <ListGroup.Item
        action
        active={isActiveChannel}
        className={`d-flex justify-content-between align-items-center border-0 px-3 py-3 ${
          isActiveChannel ? 'bg-primary text-white' : 'text-secondary'
        }`}
      style={{ cursor: 'pointer', transition: '0.2s' }}
      onClick={setActivelChannel(id)}
      >
        <div className="d-flex align-items-center text-truncate">
          <span className="me-2">
            <Hash size={18} />
            {!removable && <Lock size={16} /> }
          </span>
          {/* <span className={`text-truncate ${isActiveChannel ? 'fw-normal' : 'fw-medium text-dark'}`}>
            {name}
          </span> */}
        </div>
        {name}
        {messagesCount[id] && (
          <Badge 
            pill 
            bg={isActiveChannel ? 'light' : 'primary'} 
            className={isActiveChannel ? 'text-primary' : ''}
          >
            {messagesCount[id]}
          </Badge>
        )}
      </ListGroup.Item>
      {removable &&
        <Dropdown.Toggle
          className={`rounded-0 ${!isActiveChannel && 'bg-white border-0 text-primary'}`}
        />}
      <Dropdown.Menu >
        <Dropdown.Item onClick={handleModal('rename')}>{t('rename')}</Dropdown.Item>
        <Dropdown.Item onClick={handleModal('delete')}>{t('del')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default RenderChannel
