import { useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'


import { actions as modalActions } from '../slices/modalSlice.js'
import { actions as messagesActions } from '../slices/messagesSlice.js'
import fetched, { erMessage } from '../fetch/fetched.js'
import { toast } from 'react-toastify'
import channelSchema from '../validate/validateChannelName.js'
import filtered from '../validate/leoProfanity.js';

const RenameModal = () => {
  const dispatch = useDispatch()
  const inputRef = useRef()
  const { t } = useTranslation()

  const {show, dataType, data} = useSelector(state => state.modalReducer)

  const channelNames = useSelector(s => s.channelReducer.channels).map(c => c.name)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleClose = () => {
    dispatch(modalActions.setClose())
  }

  const schema = {
    message: '',
    channel: channelSchema(channelNames, t),
  }
  
  const current = {
    message: (newName) => fetched.editMessage({ body: newName }, data.id)
      .then((response) => { // Данные передаются в формате: { id, changes }
        const id = response.data.id
        const changes = { body: response.data.body }
        dispatch(messagesActions.editMessage({ id, changes }))
      }),
    channel: (newName) => fetched.editChannel({ name: newName }, data.id)
      .then(response => response.data),
  }
  
  const formik = useFormik({
    validationSchema: schema[dataType],
    initialValues: {
      newName: data.body || data.name,
    },
    onSubmit: (values) => {
      formik.setSubmitting(true)
      
      try {
        current[dataType](filtered(values.newName))
        toast(`${t('modal.body.successEdit')} ${t(`modal.${dataType}`)} ${data.id}`) 
        handleClose()
      } catch (err) {
        formik.setSubmitting(false)
        erMessage(err, t)
      }
    },
  })
  
  return (
    <Modal show={show} onHide={handleClose} centered>

      <Modal.Header closeButton>
        <Modal.Title>{t('modal.rename') + ' ' + t(`modal.${dataType}`)}</Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formNewName">
            <Form.Label></Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.newName}
              type="text"
              name="newName"              
              autoFocus
              isInvalid={!!formik.errors.newName}
              required
              ref={inputRef}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.newName}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('modal.cancel')}
          </Button>
          <Button variant="primary" type="submit" disabled={!formik.isValid}>
            {t('modal.save')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default RenameModal
