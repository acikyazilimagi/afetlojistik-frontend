import { Tag, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { StockOutlined } from '@ant-design/icons'
import { Colors } from 'constants/color'

export const LoginTitle = () => {
  const { t } = useTranslation()

  return (
    <>
      <Typography.Title level={3}>{t('login.title')}</Typography.Title>
      <Tag className='ant-tag-secondary' icon={<StockOutlined />} color={Colors.Main}>
        {t('login.subtitle')}
      </Tag>
    </>
  )
}
