import { useTranslate } from '@pankod/refine-core'
import { Tag, Typography } from 'antd'

export const LoginTitle = () => {
  const translate = useTranslate()
  return (
    <>
      <Typography.Title level={3}>{translate('pages.login.title', 'Sign in to your account')}</Typography.Title>
      <Tag>{translate('asdsad')}</Tag>
    </>
  )
}
