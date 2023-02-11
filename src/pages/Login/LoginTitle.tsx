import { Image, Tag } from 'antd'
import { useTranslation } from 'react-i18next'
import { StockOutlined } from '@ant-design/icons'
import { Colors } from 'constants/color'

export const LoginTitle = () => {
  const { t } = useTranslation()

  return (
    <>
      <Image src='/logo.png' preview={false} />
      <Tag className='ant-tag-secondary' icon={<StockOutlined />} color={Colors.Main}>
        {t('login.subtitle')}
      </Tag>
    </>
  )
}
