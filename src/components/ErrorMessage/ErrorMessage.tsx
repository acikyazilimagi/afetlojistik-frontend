import { useTranslation } from 'react-i18next'

type ErrorMessageProps = {
  error: unknown
}
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  const { t } = useTranslation()
  // @ts-ignore
  const message = error?.error?.data?.message
  // @ts-ignore
  const code = error?.error?.data?.code
  return (
    <>
      {code && (
        <div>
          {t('errorCode')} : {code}
        </div>
      )}
      <div>{message}</div>
    </>
  )
}
