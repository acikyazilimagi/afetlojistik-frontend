import { LoginFormType } from 'types/login'
import { http } from 'utils/axios'

export const login = async (data: LoginFormType) =>
  http.post('user/login', {
    ...data
  })
