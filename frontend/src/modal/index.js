import AddChannelModal from './AddChannelModal'
import RenameModal from './RenameModal'
import DeleteModal from './RemoveModal'

const modals = {
  addChannel: AddChannelModal,
  rename: RenameModal,
  delete: DeleteModal,
}

export default (type) => modals[type]

