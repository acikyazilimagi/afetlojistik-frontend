import { VerifyAuthCodeFormType } from 'types/otp'
import { LoginResponseType, VerifyAuthCodeResponseType } from 'types/user'
import { transformResponseData } from 'utils/http'
import { http } from './http'

export const verifyAuthCode = async (data: VerifyAuthCodeFormType): Promise<VerifyAuthCodeResponseType> =>
  http
    .post('user/verify', {
      ...data
    })
    .then(transformResponseData)

export const resendAuthCode = async (phone: string): Promise<LoginResponseType> =>
  http
    .post('verification/resend', {
      phone
    })
    .then(transformResponseData)
