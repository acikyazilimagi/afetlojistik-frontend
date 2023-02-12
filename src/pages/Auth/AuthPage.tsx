import React from 'react'
import { CardProps, FormProps, LayoutProps } from 'antd'
import { AuthPageProps } from '@pankod/refine-core'

import { Register } from './Register'
import { Login } from './Login'

export type AuthProps = AuthPageProps<LayoutProps, CardProps, FormProps>

/**
 * **refine** has a default auth page form served on the `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/authpage/} for more details.
 */
export const AuthPage: React.FC<AuthProps> = (props) => {
  const { type } = props

  const renderView = () => {
    switch (type) {
      case 'register':
        return <Register {...props} />
      case 'login':
        return <Login {...props} />
      default:
        return <Login {...props} />
    }
  }

  return <>{renderView()}</>
}
