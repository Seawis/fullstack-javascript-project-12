import { useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import { toast } from 'react-toastify';

import { actions as modalActions } from '../slices/modalSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice';
import schema from '../validate/validateChannelName.js';
import fetched from '../fetch/fetched.js';
import filtered from '../validate/leoProfanity.js';

const AddChannelModal = () => {
  const dispatch = useDispatch()
  const inputRef = useRef()
  const { t } = useTranslation()

  const show = useSelector(state => state.modalReducer.show)
  const channels = useSelector(state => state.channelReducer.channels)
  const channelNames = channels.map(c => c.name)
  const channelNextID = Math.max(...channels.map(c => c.id)) + 1

  const handleClose = () => {
    dispatch(modalActions.setClose())
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    validationSchema: schema(channelNames, t),
    initialValues: {
      newName: `new channel ${channelNextID}`,
    },
    onSubmit: async (values) => {
      formik.setSubmitting(true)
      const { newName } = values
      try {
        const userId = JSON.parse(localStorage.getItem('userId'))
        const newChannel = await fetched.addChannel(filtered(newName), userId)
        dispatch(channelsActions.setActiveId(newChannel.data.id))
        handleClose()
      }
      catch (err) {
        formik.setSubmitting(false)
        if (err.isAxiosError && err.response.status === 401) {
          formik.errors.newName = t('error.load.axios')
          inputRef.current.select()
          toast(`${t('error.load.axios')} ${err.response.statusText} ${err.response.status} `)
        }
        if (err.response.status >= 500) {
          formik.errors.newName = `${t('error.load.server')} ${err}`
          inputRef.current.select()
          toast(`${t('error.load.server')} ${err.response.statusText} ${err.response.status} `)
        }
      }
    },
  })

  return (
    <Modal show={show} onHide={handleClose} centered>

      <Modal.Header closeButton>
        <Modal.Title>{t('modal.addChannel.title')}</Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formNewName">
            <Form.Label>{t('modal.addChannel.body')}</Form.Label>
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

export default AddChannelModal
