import React from 'react'
import { LoginPageProps, useLogin, useTranslate } from '@pankod/refine-core'
import { Row, Col, Card, Form, Input, Button, Checkbox, CardProps, LayoutProps, FormProps } from 'antd'
import { LoginFormType } from 'types/login'
import { LoginTitle } from './LoginTitle'

type LoginProps = LoginPageProps<LayoutProps, CardProps, FormProps>

export const Login: React.FC<LoginProps> = ({ providers, rememberMe, renderContent, formProps }) => {
  const translate = useTranslate()
  const [form] = Form.useForm<LoginFormType>()

  const { mutate: login, isLoading } = useLogin<LoginFormType>()

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          {providers.map((provider) => (
            <Button
              key={provider.name}
              type='default'
              block
              icon={provider.icon}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginBottom: '8px'
              }}
              onClick={() =>
                login({
                  providerName: provider.name
                })
              }
            >
              {provider.label}
            </Button>
          ))}
        </>
      )
    }
    return null
  }

  const CardContent = (
    <Card title={<LoginTitle />} headStyle={{ borderBottom: 0, textAlign: 'center' }} bordered={false}>
      {renderProviders()}
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
          name='phoneNumber'
          label={translate('pages.login.fields.phoneNumber', 'Phone Number')}
          rules={[
            { required: true },
            {
              type: 'number',
              message: translate('pages.login.errors.phoneNumber', 'Invalid phone number')
            }
          ]}
        >
          <Input type='number' size='large' placeholder={translate('pages.login.fields.phoneNumber', 'Phone Number')} />
        </Form.Item>
        <Form.Item
          name='password'
          label={translate('pages.login.fields.password', 'Password')}
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
                {translate('gdprConsent', 'Remember me')}
              </Checkbox>
            </Form.Item>
          )}
        </div>
        <Form.Item>
          <Button type='primary' size='large' htmlType='submit' loading={isLoading} block>
            {translate('pages.login.signin', 'Sign in')}
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
      <Col md={8}>{renderContent ? renderContent(CardContent) : CardContent}</Col>
    </Row>
  )
}
