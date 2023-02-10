import React, { useEffect, useState } from 'react'
import { IResourceComponentsProps } from '@pankod/refine-core'
import { Form, useForm, DatePicker, Button, Edit } from '@pankod/refine-antd'
import dayjs from 'dayjs'
import { Space } from 'antd'

import { useTranslation } from 'react-i18next'
import { FaBoxes, FaRoad, FaTruck } from 'react-icons/fa'
import { ArrowRightOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { CityDropdown } from 'components/CityDropdown'
import { IconTitle } from 'components/IconTitle'
import { DistrictDropdown } from 'components/DistrictDropdown'
import { FormInput } from 'components/Form'
import { getProductCategoryList } from 'services'
import { ProductCategoryType } from 'types/productCategoryType'
import { ProductCategoryDropdown } from 'components/ProductCategoryDropdown'

import styles from './Edit.module.scss'

const DEFAULT_PRODUCT_ROW = {
  categoryId: undefined,
  count: 0
}

export const TripEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, form } = useForm()
  const { t } = useTranslation()

  const { setFieldValue, setFieldsValue, getFieldsValue, getFieldValue } = form

  const [categoryList, setCategoryList] = useState<ProductCategoryType[]>()
  const [fromCity, setFromCity] = useState<string | undefined>()
  const [toCity, setToCity] = useState<string | undefined>()

  useEffect(() => {
    getProductCategoryList().then(setCategoryList)
  }, [])

  const handleFromCityChange = (cityId: string) => {
    setFieldsValue({ ...getFieldsValue(), cityId })
    setFromCity(cityId)
    setFieldValue('fromDistrict', undefined)
  }

  const handleToCityChange = (cityId: string) => {
    setFieldsValue({ ...getFieldsValue(), cityId })
    setToCity(cityId)
    setFieldValue('fromDistrict', undefined)
  }

  const handleDistrictChange = (districtId: string) => {
    setFieldValue('fromDistrict', districtId)
  }

  return (
    <div className={styles.detailWrapper}>
      <Edit saveButtonProps={saveButtonProps}>
        <Form {...formProps} form={form} layout='vertical'>
          <IconTitle icon={<FaRoad />} label={t('location')} />
          <Space direction='horizontal' className={styles.locationContainer}>
            <Space direction='vertical' className='mb-12'>
              <Form.Item
                className={styles.formItem}
                label={t('originCity')}
                name={['fromLocation', 'cityName']}
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <CityDropdown onChange={handleFromCityChange} value={fromCity} />
              </Form.Item>
              <Form.Item
                label={t('originDistrict')}
                name={['fromLocation', 'districtName']}
                className={styles.formItem}
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <DistrictDropdown cityId={getFieldValue('fromDistrictId') as string} onChange={handleDistrictChange} />
              </Form.Item>
            </Space>
            <ArrowRightOutlined />
            <Space direction='vertical' className='mb-12'>
              <Form.Item
                label={t('destinationCity')}
                name={['toLocation', 'cityName']}
                className={styles.formItem}
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <CityDropdown onChange={handleToCityChange} value={toCity} />
              </Form.Item>
              <Form.Item
                label={t('destinationDistrict')}
                name={['toLocation', 'districtName']}
                className={styles.formItem}
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <DistrictDropdown cityId={getFieldValue('toDistrictId') as string} onChange={handleDistrictChange} />
              </Form.Item>
            </Space>
          </Space>
          <div className='mb-20'>
            <FormInput
              name={['toLocation', 'address']}
              label={t('explicitAddress')}
              formProps={{
                rules: [
                  {
                    required: true
                  }
                ]
              }}
            />
          </div>
          <div className={styles.truckIcon}>
            <IconTitle icon={<FaTruck />} label={t('vehicle')} />
          </div>
          <Space direction='horizontal' align='center' className='space-flex-item justify-center'>
            <FormInput
              label={t('plateNo')}
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
          <div className='mb-12'>
            <FormInput label={t('notes')} name={'notes'} />
          </div>
          <div className='mb-20'>
            <Form.Item
              label={t('estimatedDepartDate')}
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
              <div className={styles.dateWrapper}>
                <DatePicker showTime showSecond={false} />
              </div>
            </Form.Item>
          </div>
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
                  <Space key={key} className={styles.categorySpace}>
                    <Form.Item
                      rules={[
                        {
                          required: true
                        }
                      ]}
                      {...restField}
                    >
                      <ProductCategoryDropdown categoryList={categoryList} />
                    </Form.Item>
                    <FormInput
                      // TODO
                      name={name}
                      label={t('packageCount')}
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
                  className='mt-6'
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
      </Edit>
    </div>
  )
}
