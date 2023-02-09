import { Tag, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
export const LoginTitle = () => {
  const { t } = useTranslation()

  return (
    <>
      <Typography.Title level={3}>{t('login.title')}</Typography.Title>
      {/* TODO */}
      <Tag>{'adfsfa'}</Tag>
    </>
  )
}
