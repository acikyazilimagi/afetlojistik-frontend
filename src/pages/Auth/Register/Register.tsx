import React, { useState } from 'react'
import { LoginPageProps, useModal, useRegister } from '@pankod/refine-core'
import { useTranslation } from 'react-i18next'
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Checkbox,
  CardProps,
  LayoutProps,
  FormProps,
  Space,
  Typography
} from 'antd'
import { RuleObject } from 'antd/es/form'
import { MailOutlined, MobileOutlined } from '@ant-design/icons'
import { Link } from '@pankod/refine-react-router-v6'
import { RegisterFormType } from 'types/register'
import { RegisterTitle } from './RegisterTitle'
import { LoginVerificationModal } from './LoginVerificationModal'
import styles from './Register.module.scss'

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

export const Register: React.FC<LoginProps> = ({ renderContent, formProps }) => {
  const { t } = useTranslation()
  const { mutate: register, isLoading } = useRegister()

  const [form] = Form.useForm<RegisterFormType>()
  const { visible, close } = useModal({})

  const [phoneNumber] = useState<number | undefined>()

  const handlePhoneSubmit = (values: RegisterFormType) => {
    register(values)
  }

  const CardContent = (
    <Card title={<RegisterTitle />} headStyle={{ borderBottom: 0, textAlign: 'center' }} bordered={false}>
      <Form<RegisterFormType>
        layout='vertical'
        form={form}
        onFinish={handlePhoneSubmit}
        requiredMark={false}
        initialValues={{
          consent: false
        }}
        {...formProps}
      >
        <Space direction='horizontal' className='space-flex-item'>
          <Form.Item
            name='name'
            label={t('register.name')}
            rules={[{ required: true, message: t('thisFieldIsRequired') }]}
          >
            <Input size='large' placeholder={t('namePlaceholder')} className={styles.input} />
          </Form.Item>
          <Form.Item
            name='lastName'
            label={t('register.lastName')}
            rules={[{ required: true, message: t('thisFieldIsRequired') }]}
          >
            <Input size='large' placeholder={t('lastNamePlaceholder')} className={styles.input} />
          </Form.Item>
        </Space>
        <Form.Item
          name='phone'
          label={t('register.phoneNumber')}
          rules={[
            { required: true, message: t('thisFieldIsRequired') },
            {
              validator: (rule, value, callback) => validatePhoneNumber(rule, value, callback, t)
            }
          ]}
        >
          <Input prefix={<MobileOutlined />} size='large' placeholder={'(5XX) XXX XXXX'} className={styles.input} />
        </Form.Item>
        <Form.Item
          name='email'
          label={t('register.email')}
          rules={[{ required: true, message: t('thisFieldIsRequired') }]}
        >
          <Input
            type='email'
            prefix={<MailOutlined />}
            size='large'
            placeholder={'user@email.com'}
            className={styles.input}
          />
        </Form.Item>
        <div className={styles.rememberMeWrapper}>
          <Form.Item name='consent' valuePropName='checked' noStyle>
            <Checkbox className='font-12'>{t('gdprConsent')}</Checkbox>
          </Form.Item>
        </div>
        <Form.Item>
          <Button type='primary' size='large' htmlType='submit' loading={isLoading} block>
            {t('register.registerButton')}
          </Button>
        </Form.Item>
        <div style={{ marginTop: 8 }}>
          <Typography.Text style={{ fontSize: 12 }}>
            {t('alreadyHaveAccount')}{' '}
            <Link to='/login' style={{ fontWeight: 'bold' }}>
              {t('login.signin')}
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
