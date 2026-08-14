import { Modal, Button, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { actions as modalActions } from '../slices/modalSlice.js'
import { actions as messagesActions } from '../slices/messagesSlice.js'
import fetched from '../fetch/fetched.js'
import { erMessage } from '../fetch/fetched.js'

const DeleteModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const {show, dataType, data} = useSelector(state => state.modalReducer)

  const handleClose = () => {
    dispatch(modalActions.setClose())
  }

  const userId = JSON.parse(localStorage.getItem('userId'))

  const current = {
    message: (id) => fetched.removeMessage(id, userId)
      .then(resp => dispatch(messagesActions.removeMessage(resp.data.id))),
    channel: (id) => fetched.removeChannel(id, userId)
      .then(response => response.data.id),
  }

  const handleSubmit = (dataType) => () => { // 'message', 'channel'
    if (!data.removable) {
      toast(t('modal.body.errorDel'))  
      handleClose()
      return
    }

    try {
      current[dataType](data.id)
      toast(`${t('modal.body.successDel')} ${t(`modal.${dataType}`)} ${data.id}`) 
      handleClose()
    } catch (err) {
      erMessage(err, t)
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.delete') + ' ' + t(`modal.${dataType}`)}</Modal.Title>
      </Modal.Header>   
      <Modal.Body>
        <Card>
          <Card.Body>{data.body || data.name}</Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('modal.cancel')}
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit(dataType)}>
          {t('modal.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal
