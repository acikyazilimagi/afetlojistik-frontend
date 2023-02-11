import { notification } from 'antd'
import { VerifyAuthCodeFormType } from 'types/otp'
import { VerifyAuthCodeResponseType } from 'types/user'
import { transformResponseData } from 'utils/http'
import { handleEndpointErrorsNotification } from 'utils/error'
import i18n from 'i18n'
import { http } from './http'

export const verifyAuthCode = async (data: VerifyAuthCodeFormType): Promise<VerifyAuthCodeResponseType> =>
  http
    .post('user/verify', {
      ...data
    })
    .then(transformResponseData)

export const resendAuthCode = async (phone: string): Promise<void> =>
  http
    .post('user/verification/resend', {
      phone
    })
    .then(transformResponseData)
    .then(() =>
      notification.success({
        message: i18n.t<string>('messages.resendCode.success')
      })
    )
    .catch((error) =>
      handleEndpointErrorsNotification({
        error,
        message: i18n.t('messages.resendCode.error')
      })
    )
