import { AuthProvider } from '@pankod/refine-core'
import { login } from 'dataProviders'
import { LoginFormType } from 'types/login'
import { getUser, removeUser, setUser } from 'utils/auth'

export const authProvider: AuthProvider = {
  login: async ({ phone, password }: LoginFormType) => {
    if (phone && password) {
      return login({ phone, password })
        .then((response) => {
          setUser(response)
          return Promise.resolve()
        })
        .catch(() => {})
    }
    return Promise.reject(new Error('username: admin, password: admin'))
  },
  logout: () => {
    removeUser()
    return Promise.resolve()
  },
  checkError: () => Promise.resolve(),
  checkAuth: () => {
    const token = getUser()
    if (token) {
      return Promise.resolve()
    }

    return Promise.reject()
  },
  getPermissions: () => Promise.resolve(),
  getUserIdentity: async () => {
    const user = getUser()
    if (!user) {
      return Promise.reject()
    }

    return Promise.resolve(user)
  }
}
