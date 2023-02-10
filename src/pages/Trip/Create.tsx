import React from 'react'
import { IResourceComponentsProps } from '@pankod/refine-core'
import { Create, Form, useForm, DatePicker } from '@pankod/refine-antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { FaTruck } from 'react-icons/fa'
import { CityDropdown } from 'components/CityDropdown'
import { IconTitle } from 'components/IconTitle'
import { FormInput } from 'components/Form'
import styles from './Create.module.scss'

export const TripCreate: React.FC<IResourceComponentsProps> = () => {
  const { t } = useTranslation()
  const { formProps, saveButtonProps } = useForm()

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout='vertical'>
        <IconTitle icon={<FaTruck />} label={t('destination')} />
        <Form.Item
          label={t('vehicle')}
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
          label={t('createdBy')}
          name={['createdBy']}
          rules={[
            {
              required: true
            }
          ]}
          className={styles.formItem}
        >
          <FormInput name='createdBy' />
        </Form.Item>
        <Form.Item
          label={t('estimatedDepartTime')}
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
          label={t('tripNumber')}
          name={['tripNumber']}
          rules={[
            {
              required: true
            }
          ]}
          className={styles.formItem}
        >
          <FormInput name='tripNumber' disabled />
        </Form.Item>
      </Form>
    </Create>
  )
}
