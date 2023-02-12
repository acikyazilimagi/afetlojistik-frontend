import React from 'react'
import { IResourceComponentsProps } from '@pankod/refine-core'
import { Edit, Form, useForm, Input, Checkbox } from '@pankod/refine-antd'
import { useTranslation } from 'react-i18next'

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const { t } = useTranslation()

  const { formProps, saveButtonProps } = useForm()

  // const userData = queryResult?.data?.data

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout='vertical'>
        <Form.Item
          label={t<string>('name')}
          name={['name']}
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t<string>('surname')}
          name={['surname']}
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t<string>('phoneNumber')}
          name={['phone']}
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={t<string>('email')} name={['email']}>
          <Input />
        </Form.Item>
        <Form.Item
          label={t('isActive')}
          valuePropName='checked'
          name={['active']}
          rules={[
            {
              required: true
            }
          ]}
        >
          <Checkbox>Active</Checkbox>
        </Form.Item>
        <Form.Item
          label={t('isAdmin')}
          valuePropName='checked'
          name={['isAdmin']}
          rules={[
            {
              required: true
            }
          ]}
        >
          <Checkbox>Is Admin</Checkbox>
        </Form.Item>
      </Form>
    </Edit>
  )
}
