import React from 'react'
import { TitleProps } from '@pankod/refine-core'
import routerProvider from '@pankod/refine-react-router-v6'

import styles from './Title.module.scss'

const { Link } = routerProvider

export const Title: React.FC<TitleProps> = ({ collapsed }) => (
  <Link to='/'>
    {collapsed ? (
      <div className={styles.imageWrapper}>
        <img src='/truck.svg' alt='Afet Lojistik' className={styles.soloImage} />
      </div>
    ) : (
      <img src='/logo.svg' alt='Afet Lojistik' className={styles.soloImage} />
    )}
  </Link>
)
