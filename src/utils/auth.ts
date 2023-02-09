import { LocalStorageKeys } from 'constants/auth'
import { UserLoginResponseType, UserType } from 'types/user'
import { getValueFromLocalStorage } from './localStorage'

export const getUser = (): UserType | undefined => {
  const user = getValueFromLocalStorage<UserType>(LocalStorageKeys.User)
  return user
}

export const getToken = () => {
  const token = getValueFromLocalStorage<string>(LocalStorageKeys.Token)
  return token
}

export const removeUser = () => {
  localStorage.removeItem(LocalStorageKeys.User)
  localStorage.removeItem(LocalStorageKeys.Token)
}

export const setUser = (loginResponse: UserLoginResponseType) => {
  const { user, token } = loginResponse
  localStorage.setItem(LocalStorageKeys.User, JSON.stringify(user))
  localStorage.setItem(LocalStorageKeys.Token, JSON.stringify(token))
}
