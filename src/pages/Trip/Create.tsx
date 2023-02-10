import React from 'react'
import { IResourceComponentsProps } from '@pankod/refine-core'
import { Create, Form, useForm, Input, DatePicker } from '@pankod/refine-antd'
import dayjs from 'dayjs'

export const TripCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm()

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout='vertical'>
        <Form.Item
          label='Vehicle'
          name={['vehicle', 'name']}
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input />
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
