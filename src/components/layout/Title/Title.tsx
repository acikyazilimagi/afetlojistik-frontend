import React from 'react'
import { TitleProps } from '@pankod/refine-core'
import routerProvider from '@pankod/refine-react-router-v6'

import styles from './Title.module.scss'

const { Link } = routerProvider

export const Title: React.FC<TitleProps> = ({ collapsed }) => (
  <Link to='/'>
    {collapsed ? (
      <div className={styles.imageWrapper}>
        <img
          src='https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine-mini.svg'
          alt='Refine'
          className={styles.wrappedImage}
        />
      </div>
    ) : (
      <img
        src='https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine.svg'
        alt='Refine'
        className={styles.soloImage}
      />
    )}
  </Link>
)
