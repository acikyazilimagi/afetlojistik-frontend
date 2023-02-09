import axios from 'axios'
import { HttpError } from '@pankod/refine-core'
import { notification } from 'antd'
import i18n from 'i18n'
import { getToken, removeUser } from '../utils/auth'

// Error handling with axios interceptors
export const http = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL })

http.interceptors.request.use((config) => {
  const token = getToken()
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = token
  // eslint-disable-next-line no-param-reassign
  config.headers.token = token

  return config
})

http.interceptors.response.use(
  (response) => response.data.data,
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message ?? i18n.t('errorMessages.unknownError'),
      statusCode: error.response?.status
    }

    if (error.response?.status === 401) {
      removeUser()
    }

    notification.error({ message: i18n.t('errorMessages.errorTitle') as string, description: customError.message })

    return Promise.reject(customError)
  }
)
