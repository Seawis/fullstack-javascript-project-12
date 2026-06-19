import { ListGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { actions as modalActions } from '../slices/modalSlice.js';
import RenderChannel from './Channel.jsx';

const ChannelList = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch();

  const channels = useSelector(state => state.channelReducer.channels);
  /*
  [ { "id": "1", "name": "general", "removable": false },
    { "id": "2", "name": "random", "removable": false } ]
  */
  const handleModal = () => {
    dispatch(modalActions.setShow({type: 'addChannel', dataType: null, data: null}))
  }

  return (
    <>
      <div className="p-3 border-bottom bg-white">
        <h5 className="mb-3 fw-bold">{t('channels')}</h5>
      </div>

      <ListGroup
        variant="flush"
        className="overflow-auto custom-scrollbar"
        style={{ maxHeight: '580px'}}
      >
        {channels && channels.map(channel => (
          <RenderChannel key={channel.id} channel={channel} />
        ))}
      </ListGroup>

      <div className="mt-auto p-3 border-top">
        <button
          onClick={handleModal}
          className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
        >
          <span className="me-1">+</span> {t('createChannel')}
        </button>
      </div>
    </>
  );
};

export default ChannelList;
