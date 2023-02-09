import { AuthProvider } from '@pankod/refine-core'
import { notification } from 'antd'
import { login } from 'dataProviders'
import { LoginFormType } from 'types/login'

export const TOKEN_KEY = 'afet-tms'

export const authProvider: AuthProvider = {
  login: async ({ phone, password }: LoginFormType) => {
    if (phone && password) {
      return login({ phone, password })
        .then(() => {
          localStorage.setItem(TOKEN_KEY, JSON.stringify(phone))
        })
        .catch((error) => notification.error({ message: JSON.stringify(error.message) }))
    }
    return Promise.reject(new Error('username: admin, password: admin'))
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY)
    return Promise.resolve()
  },
  checkError: () => Promise.resolve(),
  checkAuth: () => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      return Promise.resolve()
    }

    return Promise.reject()
  },
  getPermissions: () => Promise.resolve(),
  getUserIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      return Promise.reject()
    }

    return Promise.resolve({ phone: JSON.parse(token) })
  }
}
