import React from 'react'
import { LoginPageProps, useLogin } from '@pankod/refine-core'
import { useTranslation } from 'react-i18next'
import { Row, Col, Card, Form, Input, Button, Checkbox, CardProps, LayoutProps, FormProps } from 'antd'
import { RuleObject } from 'antd/es/form'
import { LoginFormType } from 'types/login'
import { LoginTitle } from './LoginTitle'
//import styles from './Login.module.scss'

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
  const [form] = Form.useForm<LoginFormType>()
  const { t } = useTranslation()

  const { mutate: login, isLoading } = useLogin<LoginFormType>()

  const CardContent = (
    <Card title={<LoginTitle />} headStyle={{ borderBottom: 0, textAlign: 'center' }} bordered={false}>
      <Form<LoginFormType>
        layout='vertical'
        form={form}
        onFinish={(values) => login(values)}
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
            { required: true },
            {
              validator: (rule, value, callback) => validatePhoneNumber(rule, value, callback, t)
            }
          ]}
        >
          <Input type='number' size='large' placeholder={t('login.phoneNumber')} />
        </Form.Item>
        <Form.Item
          name='password'
          label={t('login.password')}
          rules={[{ required: true }]}
          style={{ marginBottom: '12px' }}
        >
          <Input type='password' placeholder='●●●●●●●●' size='large' />
        </Form.Item>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}
        >
          {rememberMe ?? (
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox
                style={{
                  fontSize: '12px'
                }}
              >
                {t('gdprConsent')}
              </Checkbox>
            </Form.Item>
          )}
        </div>
        <Form.Item>
          <Button type='primary' size='large' htmlType='submit' loading={isLoading} block>
            {t('login.signin')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )

  return (
    <Row
      justify='center'
      align='middle'
      style={{
        height: '100vh'
      }}
    >
      <Col md={12} lg={8}>
        {renderContent ? renderContent(CardContent) : CardContent}
      </Col>
    </Row>
  )
}
