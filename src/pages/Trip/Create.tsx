import React, { useEffect, useState } from 'react'
import { IResourceComponentsProps } from '@pankod/refine-core'
import { Create, Form, useForm, DatePicker, Space, Button } from '@pankod/refine-antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { FaBoxes, FaTruck } from 'react-icons/fa'
import { ArrowRightOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { CityDropdown } from 'components/CityDropdown'
import { IconTitle } from 'components/IconTitle'
import { CreateTripFormType } from 'types/trip'
import { DistrictDropdown } from 'components/DistrictDropdown'
import { ProductCategoryType } from 'types/productCategoryType'
import { getProductCategoryList } from 'services'
import { ProductCategoryDropdown } from 'components/ProductCategoryDropdown'
import { FormInput } from 'components/Form'
import styles from './Create.module.scss'

const DEFAULT_PRODUCT_ROW = {
  categoryId: undefined,
  count: 0
}

export const TripCreate: React.FC<IResourceComponentsProps> = () => {
  const { t } = useTranslation()
  const { formProps, form, saveButtonProps } = useForm<CreateTripFormType>()
  const { setFieldValue, setFieldsValue, getFieldsValue, getFieldValue } = form

  const [categoryList, setCategoryList] = useState<ProductCategoryType[]>()

  useEffect(() => {
    getProductCategoryList().then(setCategoryList)
  }, [])

  const handleCityChange = (cityId: string) => {
    setFieldsValue({ ...getFieldsValue(), cityId })
    setFieldValue('fromDistrict', undefined)
  }

  const handleDistrictChange = (districtId: string) => {
    setFieldValue('fromDistrict', districtId)
  }

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} form={form} layout='vertical'>
        <IconTitle icon={<FaTruck />} label={t('location')} />
        <Space direction='horizontal' className='space-flex-item' align='center'>
          <div className='flex flex-col'>
            <Form.Item
              className={styles.formItem}
              label='Vehicle'
              name={'fromCityId'}
              rules={[
                {
                  required: true
                }
              ]}
            >
              <CityDropdown onChange={handleCityChange} value={getFieldValue('fromCityId')} />
            </Form.Item>
            <Form.Item
              label='Vehicle'
              name={'fromDistrictId'}
              className={styles.formItem}
              rules={[
                {
                  required: true
                }
              ]}
            >
              <DistrictDropdown cityId={getFieldValue('fromDistrictId') as string} onChange={handleDistrictChange} />
            </Form.Item>
          </div>
          <ArrowRightOutlined />
          <div className='flex flex-col'>
            <Form.Item
              label='Vehicle'
              name={'toCityId'}
              className={styles.formItem}
              rules={[
                {
                  required: true
                }
              ]}
            >
              <CityDropdown onChange={handleCityChange} value={getFieldValue('toCityId')} />
            </Form.Item>
            <Form.Item
              label='Vehicle'
              name={'toDistrictId'}
              className={styles.formItem}
              rules={[
                {
                  required: true
                }
              ]}
            >
              <DistrictDropdown cityId={getFieldValue('toDistrictId') as string} onChange={handleDistrictChange} />
            </Form.Item>
          </div>
        </Space>
        <FormInput
          name='destinationAddress'
          label={t('openAddress')}
          formProps={{
            rules: [
              {
                required: true
              }
            ]
          }}
        />
        <IconTitle icon={<FaTruck />} label={t('vehicle')} />
        <Space direction='horizontal' align='center' className='space-flex-item'>
          <FormInput
            label={t('plateNumber')}
            name={['vehicle', 'plateNumber']}
            formProps={{
              rules: [
                {
                  required: true
                }
              ]
            }}
          />
          <FormInput
            label={t('driverName')}
            name={['vehicle', 'name']}
            formProps={{
              rules: [
                {
                  required: true
                }
              ]
            }}
          />
          <FormInput
            label={t('phoneNumber')}
            name={['vehicle', 'phone']}
            formProps={{
              rules: [
                {
                  required: true
                }
              ]
            }}
          />
        </Space>
        <FormInput label={t('notes')} name={'notes'} />
        <Form.Item
          label='Estimated Depart Time'
          name={'estimatedDepartTime'}
          className={styles.formItem}
          rules={[
            {
              required: true
            }
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined
          })}
        >
          <DatePicker showTime showSecond={false} />
        </Form.Item>
        <IconTitle icon={<FaBoxes />} label={t('tripContent')} />
        <Form.List
          name='products'
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 2) {
                  return Promise.reject(new Error(t('errorMessages.minimumProducts')))
                }
              }
            }
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space key={key} align='center'>
                  <Form.Item
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    label={t('category')}
                    {...restField}
                  >
                    <ProductCategoryDropdown categoryList={categoryList} />
                  </Form.Item>
                  <FormInput
                    name={name}
                    label={t('count')}
                    formProps={{
                      ...restField,
                      rules: [
                        {
                          required: true
                        }
                      ]
                    }}
                    mode='number'
                  />
                  <Button
                    danger
                    onClick={() => {
                      remove(index)
                    }}
                    icon={<DeleteOutlined />}
                  />
                </Space>
              ))}
              <Button
                onClick={() => {
                  add(DEFAULT_PRODUCT_ROW)
                }}
                icon={<PlusOutlined />}
              >
                {t('addCategory')}
              </Button>
              <Form.ErrorList errors={errors} />
            </>
          )}
        </Form.List>
      </Form>
    </Create>
  )
}
