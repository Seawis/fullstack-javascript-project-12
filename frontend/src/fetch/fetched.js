import { toast } from 'react-toastify'

import axios from 'axios'
import routes from './routes.js'

const {
  channelsPath,
  messagesPath,
  channelPath,
  messagePath,
} = routes

const userId = JSON.parse(localStorage.getItem('userId'))

const getAuthHeader = userId && userId.token
  ? { Authorization: `Bearer ${userId.token}` }
  : {}

const params = {
  headers: getAuthHeader,
}

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
  getChannels: () => axios.get(channelsPath(), params),
  getMessages: () => axios.get(messagesPath(), params),
  addChannel: (name) => axios.post(channelsPath(), { name }, params),
  addMessage: (message) => axios.post(messagesPath(), message, params),
  removeChannel: (id) => axios.delete(channelPath(id), params),
  removeMessage: (id) => axios.delete(messagePath(id), params),
  editChannel: (channel, id) => axios.patch(channelPath(id), channel, params),
  editMessage: (message, id) => axios.patch(messagePath(id), message, params),
}


export {erMessage}
export default fetched
