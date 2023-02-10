import React from 'react'
import { TitleProps } from '@pankod/refine-core'
import routerProvider from '@pankod/refine-react-router-v6'

import { Typography } from 'antd'
import styles from './Title.module.scss'

const { Link } = routerProvider

export const Title: React.FC<TitleProps> = ({ collapsed }) => (
  <Link to='/'>
    {collapsed ? (
      <div className={styles.imageWrapper}>
        <Typography.Text className={styles.wrappedImage}>AL</Typography.Text>
      </div>
    ) : (
      <Typography.Text className={styles.wrappedImage}>Afet Lojistik</Typography.Text>
    )}
  </Link>
)
