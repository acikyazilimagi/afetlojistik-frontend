import { AuthProvider } from '@pankod/refine-core'
import { register } from 'services/auth'
import { verifyAuthCode } from 'services/otp'
import { VerifyAuthCodeFormType } from 'types/otp'
import { RegisterFormType } from 'types/register'
import { getUser, removeUser, setUser } from 'utils/auth'

export const authProvider: AuthProvider = {
  login: async ({ phone, code }: VerifyAuthCodeFormType) => {
    if (phone) {
      return verifyAuthCode({ phone, code })
        .then((response) => {
          setUser(response)
          return Promise.resolve()
        })
        .catch(() => {})
    }
    return Promise.reject(new Error('username: admin, password: admin'))
  },
  register: async ({ phone }: RegisterFormType) => {
    if (phone) {
      return register({ phone })
        .then((_response) =>
          // setUser(response)
          Promise.resolve()
        )
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
