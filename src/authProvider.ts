import { AuthProvider } from '@pankod/refine-core'
import { verifyAuthCode } from 'services/otp'
import { VerifyAuthCodeFormType } from 'types/otp'
import { getUser, removeUser, setUser } from 'utils/auth'

export const authProvider: AuthProvider = {
  login: async ({ phone, otpCode }: VerifyAuthCodeFormType) => {
    if (phone) {
      return verifyAuthCode({ phone, otpCode })
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
