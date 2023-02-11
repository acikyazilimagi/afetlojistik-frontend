import { Space, Tag } from 'antd'
import { useTranslation } from 'react-i18next'
import { StockOutlined } from '@ant-design/icons'
import { Colors } from 'constants/color'

export const LoginTitle = () => {
  const { t } = useTranslation()

  return (
    <Space direction='vertical' size={16}>
      <img src='/logo.svg' alt='logo' />
      <Tag className='ant-tag-secondary' icon={<StockOutlined />} color={Colors.Main}>
        {t('login.subtitle')}
      </Tag>
    </Space>
  )
}
