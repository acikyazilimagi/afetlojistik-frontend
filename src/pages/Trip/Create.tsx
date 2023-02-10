import React, { useEffect, useState } from 'react'
import { IResourceComponentsProps } from '@pankod/refine-core'
import { Create, Form, useForm, DatePicker, Space, Button } from '@pankod/refine-antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { FaBoxes, FaRoad, FaTruck } from 'react-icons/fa'
import { ArrowRightOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { CityDropdown } from 'components/CityDropdown'
import { IconTitle } from 'components/IconTitle'
import { CreateTripFormType } from 'types/trip'
import { DistrictDropdown } from 'components/DistrictDropdown'
import { ProductCategoryType } from 'types/productCategoryType'
import { getProductCategoryList } from 'services'
import { ProductCategoryDropdown } from 'components/ProductCategoryDropdown'
import { FormInput } from 'components/Form'
import { ProductType } from 'types/product'
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
  const [fromCity, setFromCity] = useState<string | undefined>()
  const [toCity, setToCity] = useState<string | undefined>()

  useEffect(() => {
    getProductCategoryList().then(setCategoryList)
  }, [])

  const handleFromCityChange = (cityId: string) => {
    setFieldsValue({ ...getFieldsValue(), cityId })
    setFromCity(cityId)
    setFieldValue('fromDistrictId', undefined)
  }

  const handleToCityChange = (cityId: string) => {
    setFieldsValue({ ...getFieldsValue(), cityId })
    setToCity(cityId)
    setFieldValue('fromDistrictId', undefined)
  }

  const handleFromDistrictChange = (districtId: string) => {
    setFieldValue('fromDistrictId', districtId)
  }

  const handleToDistrictChange = (districtId: string) => {
    setFieldValue('toDistrictId', districtId)
  }

  const handleProductChange = (categoryId: string, index: number) => {
    const current = [...getFieldValue('products')]
    current[index] = { categoryId, count: 0 }
    setFieldValue('products', current)
  }

  return (
    <div className={styles.createWrapper}>
      <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} form={form} layout='vertical'>
          <IconTitle icon={<FaRoad />} label={t('location')} />
          <Space direction='horizontal' className={styles.locationContainer}>
            <Space direction='vertical' className='mb-12'>
              <Form.Item
                className={styles.formItem}
                label={t('originCity')}
                name={'fromCityId'}
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
                name={'fromDistrictId'}
                className={styles.formItem}
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <DistrictDropdown cityId={fromCity} onChange={handleFromDistrictChange} />
              </Form.Item>
            </Space>
            <ArrowRightOutlined />
            <Space direction='vertical' className='mb-12'>
              <Form.Item
                label={t('destinationCity')}
                name={'toCityId'}
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
                name={'toDistrictId'}
                className={styles.formItem}
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <DistrictDropdown cityId={toCity} onChange={handleToDistrictChange} />
              </Form.Item>
            </Space>
          </Space>
          <div className='mb-20'>
            <FormInput
              name='destinationAddress'
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
            <FormInput label={t('driverName')} name={['vehicle', 'name']} />
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
              name={'estimatedDepartDate'}
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
          </div>
          <IconTitle icon={<FaBoxes />} label={t('tripContent')} />
          <Form.List
            name='products'
            initialValue={[
              { categoryId: '', count: 0 },
              { categoryId: '', count: 0 },
              { categoryId: '', count: 0 }
            ]}
            rules={[
              {
                validator: async (_, values) => {
                  if (!values || values.length < 2) {
                    return Promise.reject(new Error(t('errorMessages.minimumProducts')))
                  }
                  if (values.some((value: ProductType) => value.count <= 0)) {
                    return Promise.reject(new Error(t('errorMessages.minimumCount')))
                  }
                }
              }
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <Space direction='vertical' size={8}>
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
                      <ProductCategoryDropdown
                        categoryList={categoryList}
                        onChange={(value) => handleProductChange(value, index)}
                      />
                    </Form.Item>
                    <FormInput
                      label={t('packageCount')}
                      name={[name, 'count']}
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
                  block
                  onClick={() => {
                    add(DEFAULT_PRODUCT_ROW)
                  }}
                  icon={<PlusOutlined />}
                >
                  {t('addCategory')}
                </Button>
                <Form.ErrorList errors={errors} />
              </Space>
            )}
          </Form.List>
        </Form>
      </Create>
    </div>
  )
}
