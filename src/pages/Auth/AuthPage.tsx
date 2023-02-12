import React, { useEffect, useState } from 'react'
import { CardProps, FormProps, LayoutProps } from 'antd'
import { AuthPageProps } from '@pankod/refine-core'
//eslint-disable-next-line
import { useCookies } from 'react-cookie'
import { Register } from './Register'
import { Login } from './Login'
import { PrivacyConsentModal } from './Login/PrivacyConsentModal'

export type AuthProps = AuthPageProps<LayoutProps, CardProps, FormProps>

/**
 * **refine** has a default auth page form served on the `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/authpage/} for more details.
 */
export const AuthPage: React.FC<AuthProps> = (props) => {
  const { type } = props
  const [cookies, setCookie] = useCookies(['privacyConsent'])
  const [isPrivacyConsentModalVisible, setIsPrivacyConsentModalVisible] = useState(false)

  const handlePrivacyConsentModalOk = () => {
    setIsPrivacyConsentModalVisible(false)
    setCookie('privacyConsent', true, { path: '/' })
  }

  const handlePrivacyConsentModalCancel = () => {
    setIsPrivacyConsentModalVisible(false)
  }

  const renderPrivacyConsentModal = () => (
    <PrivacyConsentModal
      visible={isPrivacyConsentModalVisible}
      handleOk={handlePrivacyConsentModalOk}
      handleCancel={handlePrivacyConsentModalCancel}
    />
  )

  useEffect(() => {
    if (cookies.privacyConsent) {
      setIsPrivacyConsentModalVisible(false)
    } else {
      setIsPrivacyConsentModalVisible(true)
    }
  }, [cookies])

  const renderView = () => {
    switch (type) {
      case 'register':
        return <Register {...props} onPrivacyConsentClick={() => setIsPrivacyConsentModalVisible(true)} />
      case 'login':
        return <Login {...props} />
      default:
        return <Login {...props} />
    }
  }

  return (
    <>
      {renderView()} {renderPrivacyConsentModal()}
    </>
  )
}
