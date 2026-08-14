import { toast } from 'react-toastify'
import axios from 'axios'

import routes from './routes.js'

const {
  channelsPath,
  messagesPath,
  channelPath,
  messagePath,
} = routes

const params = (userId) => ({
  headers: userId && userId.token
    ? { Authorization: `Bearer ${userId.token}` }
    : {},
})

const erMessage = (error, t) => {
  if (error.response) {
    // 1. Сервер ответил кодом, отличным от 2xx (404, 500, 401)
    const errorMessage = error.response.data.message || `${t('error.load.server')}: ${error.response.status}`;
    toast(errorMessage)
  } else if (error.request) {
    // 2. Запрос был сделан, но ответ не получен (проблемы с сетью)
    toast(t('error.load.network'))
  } else {
    // 3. Что-то пошло не так при настройке самого запроса
    toast(error.message)
  }
}

const fetched = {
  getChannels: (userId) => axios.get(channelsPath(), params(userId)),
  getMessages: (userId) => axios.get(messagesPath(), params(userId)),
  addChannel: (name, userId) => axios.post(channelsPath(), { name }, params(userId)),
  addMessage: (message, userId) => axios.post(messagesPath(), message, params(userId)),
  removeChannel: (id, userId) => axios.delete(channelPath(id), params(userId)),
  removeMessage: (id, userId) => axios.delete(messagePath(id), params(userId)),
  editChannel: (channel, id, userId) => axios.patch(channelPath(id), channel, params(userId)),
  editMessage: (message, id, userId) => axios.patch(messagePath(id), message, params(userId)),
}

export {erMessage}
export default fetched
