import React from 'react'
import { IResourceComponentsProps } from '@pankod/refine-core'
import { Edit, Form, useForm, Input, Checkbox } from '@pankod/refine-antd'
import { useTranslation } from 'react-i18next'

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const { t } = useTranslation()

  const { formProps, saveButtonProps } = useForm()

  return (
    <Edit saveButtonProps={saveButtonProps} title={t('pageTitles.editUser')}>
      <Form {...formProps} layout='vertical'>
        <Form.Item
          label={t<string>('name')}
          name={['name']}
          rules={[{ required: true, message: t('thisFieldIsRequired') }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t<string>('surname')}
          name={['surname']}
          rules={[{ required: true, message: t('thisFieldIsRequired') }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t<string>('phoneNumber')}
          name={['phone']}
          rules={[{ required: true, message: t('thisFieldIsRequired') }]}
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
          rules={[{ required: true, message: t('thisFieldIsRequired') }]}
        >
          <Checkbox>Active</Checkbox>
        </Form.Item>
        <Form.Item
          label={t('isAdmin')}
          valuePropName='checked'
          name={['isAdmin']}
          rules={[{ required: true, message: t('thisFieldIsRequired') }]}
        >
          <Checkbox>Is Admin</Checkbox>
        </Form.Item>
      </Form>
    </Edit>
  )
}
