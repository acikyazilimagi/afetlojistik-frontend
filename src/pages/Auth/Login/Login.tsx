import React, { useState } from 'react'
import { LoginPageProps, useModal } from '@pankod/refine-core'
import { useTranslation } from 'react-i18next'
import { Row, Col, Card, Form, Input, Button, Checkbox, CardProps, LayoutProps, FormProps, Typography } from 'antd'
import { RuleObject } from 'antd/es/form'
import { Link } from '@pankod/refine-react-router-v6'
import { LoginFormType } from 'types/login'
import { requestAuthCode } from 'services/auth'
import { LoginTitle } from './LoginTitle'
import styles from './Login.module.scss'
import { LoginVerificationModal } from './LoginVerificationModal'

type LoginProps = LoginPageProps<LayoutProps, CardProps, FormProps>

const validatePhoneNumber = (
  rule: RuleObject,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  callback: (error?: string | undefined) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: string) => string
) => {
  if (value) {
    const isValid = /^5(0[5-7]|[3-5]\d)\d{3}\d{4}$/.test(value)
    if (isValid) {
      callback()
    } else {
      callback(t('errors.phoneNumber'))
    }
  } else {
    callback()
  }
}

export const Login: React.FC<LoginProps> = ({ rememberMe, renderContent, formProps }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm<LoginFormType>()
  const { visible, show, close } = useModal({})

  const [isLoading, setIsLoading] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState<number | undefined>()

  const handlePhoneSubmit = (values: LoginFormType) => {
    setIsLoading(true)
    setPhoneNumber(values.phone)
    requestAuthCode(values)
      .then((isSuccess) => {
        if (isSuccess) {
          show()
        }
      })
      .finally(() => setIsLoading(false))
  }

  const CardContent = (
    <Card title={<LoginTitle />} headStyle={{ borderBottom: 0, textAlign: 'center' }} bordered={false}>
      <Form<LoginFormType>
        layout='vertical'
        form={form}
        onFinish={handlePhoneSubmit}
        requiredMark={false}
        initialValues={{
          consent: false
        }}
        {...formProps}
      >
        <Form.Item
          name='phone'
          label={t('login.phoneNumber')}
          rules={[
            { required: true, message: t('thisFieldIsRequired') },
            {
              validator: (rule, value, callback) => validatePhoneNumber(rule, value, callback, t)
            }
          ]}
        >
          <Input size='large' placeholder={'(5XX) XXX XXXX'} className={styles.input} />
        </Form.Item>
        <div className={styles.rememberMeWrapper}>
          {rememberMe ?? (
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox className='font-12'>{t('gdprConsent')}</Checkbox>
            </Form.Item>
          )}
        </div>
        <Form.Item>
          <Button type='primary' size='large' htmlType='submit' loading={isLoading} block>
            {t('login.signin')}
          </Button>
        </Form.Item>
        <div style={{ marginTop: 8 }}>
          <Typography.Text style={{ fontSize: 12 }}>
            {t('dontHaveAccount')}{' '}
            <Link to='/register' style={{ fontWeight: 'bold' }}>
              {t('register.registerButton')}
            </Link>
          </Typography.Text>
        </div>
      </Form>
    </Card>
  )

  return (
    <Row justify='center' align='middle' className={styles.loginRow} style={{ backgroundImage: "url('/bg.svg')" }}>
      <Col md={12} lg={10}>
        {renderContent ? renderContent(CardContent) : CardContent}
        <LoginVerificationModal isVisible={visible} phone={phoneNumber} onClose={close} />
      </Col>
    </Row>
  )
}
