import { Typography } from 'antd'
import styles from './ContentDisplay.module.scss'

type ContentDisplayProps = {
  title: string
  text: string
}

export const ContentDisplay: React.FC<ContentDisplayProps> = ({ title, text }) => (
  <div className={styles.contentDisplayContainer}>
    <Typography.Title className={styles.contentDisplayTitle}>{title}</Typography.Title>
    <Typography.Text>{text}</Typography.Text>
  </div>
)
