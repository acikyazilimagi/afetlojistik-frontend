import { LoginFormType } from 'types/login'
import { UserLoginResponseType } from 'types/user'
import { http } from 'utils/http'

export const login = async (data: LoginFormType): Promise<UserLoginResponseType> =>
  http.post('user/login', {
    ...data
  })
