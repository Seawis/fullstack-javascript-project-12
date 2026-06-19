import { useSelector } from 'react-redux'
import getModal from '../modal/index'

const Modal = () => {
  const modalType = useSelector(state => state.modalReducer.type)
  if (!modalType) return null

  const Component = getModal(modalType)
  return <Component />
}

export default Modal