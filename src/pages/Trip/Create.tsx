import React from 'react'
import { IResourceComponentsProps } from '@pankod/refine-core'
import { Create, Form, useForm, Input, DatePicker } from '@pankod/refine-antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { FaTruck } from 'react-icons/fa'
import { CityDropdown } from 'components/CityDropdown'
import { IconTitle } from 'components/IconTitle'

export const TripCreate: React.FC<IResourceComponentsProps> = () => {
  const { t } = useTranslation()
  const { formProps, saveButtonProps } = useForm()

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout='vertical'>
        <IconTitle icon={<FaTruck />} label={t('destination')} />
        <Form.Item
          label='Vehicle'
          name={['vehicle', 'name']}
          rules={[
            {
              required: true
            }
          ]}
        >
          <CityDropdown />
        </Form.Item>
        <Form.Item
          label='Created By'
          name={['createdBy']}
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Estimated Depart Time'
          name={['estimatedDepartTime']}
          rules={[
            {
              required: true
            }
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined
          })}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label='Trip Number'
          name={['tripNumber']}
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  )
}
