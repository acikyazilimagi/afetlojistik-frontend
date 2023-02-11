import { notification } from 'antd'
import { ErrorMessage } from 'components/ErrorMessage'
import i18n from 'i18n'

export const errorKeys = {
  tokenExpired: 'tokenExpired',
  missingHeaders: 'missingHeaders'
}
type EndpointErrors = {
  error: unknown
  customFn?: () => void
} & {
  message: string
}

export const handleEndpointErrorsNotification = ({ error, customFn, ...rest }: EndpointErrors) => {
  // @ts-ignore
  const message = error?.error?.data?.message
  // @ts-ignore
  const code = error?.error?.data?.code
  if (code === errorKeys.tokenExpired) {
    return notification.warning({
      message: i18n.t<string>('errorMessages.tokenExpired'),
      key: errorKeys.tokenExpired,
      description: message + i18n.t('errorMessages.tokenExpiredDescription')
    })
  }
  if (code === errorKeys.missingHeaders) {
    return
  }
  if (customFn) {
    return customFn()
  }
  return notification.error({
    description: <ErrorMessage error={error} />,
    ...rest
  })
}
