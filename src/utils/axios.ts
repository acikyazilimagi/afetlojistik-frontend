import axios from 'axios'
import { HttpError } from '@pankod/refine-core'
import i18n from 'i18n'

// Error handling with axios interceptors
export const http = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL })

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message ?? i18n.t('errorMessages.unknownError'),
      statusCode: error.response?.status
    }

    return Promise.reject(customError)
  }
)
