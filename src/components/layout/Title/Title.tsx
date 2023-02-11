import React from 'react'
import { TitleProps } from '@pankod/refine-core'
import routerProvider from '@pankod/refine-react-router-v6'

import styles from './Title.module.scss'

const { Link } = routerProvider

export const Title: React.FC<TitleProps> = ({ collapsed }) => (
  <Link to='/'>
    {collapsed ? (
      <div className={styles.imageWrapper}>
        <img src='/logo.png' alt='Afet Lojistik' className={styles.wrappedImage} />
      </div>
    ) : (
      <img src='/logo.png' alt='Afet Lojistik' className={styles.soloImage} />
    )}
  </Link>
)
