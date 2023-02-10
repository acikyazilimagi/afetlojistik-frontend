import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import styles from './DisplayAddress.module.scss'

export const DisplayAddress = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.displayAddressContainer}>
      <Typography.Title className={styles.displayAddressTitle}>{t('destinationAddress')}</Typography.Title>
      <Typography.Text>Arsuz Mah. Ela Apt. No:5 Arsuz/Hatay</Typography.Text>
    </div>
  )
}
