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
import { Spinner } from 'components/Spinner'

import styles from './Create.module.scss'

const DEFAULT_PRODUCT_ROW = {
  categoryId: undefined,
  count: 0
}

export const TripCreate: React.FC<IResourceComponentsProps> = () => {
  const { t } = useTranslation()
  const { formProps, form, saveButtonProps } = useForm<CreateTripFormType>()
  const { setFieldValue, getFieldValue } = form

  const [categoryList, setCategoryList] = useState<ProductCategoryType[]>()
  const [fromCity, setFromCity] = useState<string | undefined>()
  const [toCity, setToCity] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getProductCategoryList()
      .then(setCategoryList)
      .then(() => setIsLoading(false))
  }, [])

  const handleFromCityChange = (cityId: string) => {
    setFieldValue(['fromLocation', 'cityId'], cityId)
    setFromCity(cityId)
    setFieldValue(['fromLocation', 'districtId'], undefined)
  }

  const handleToCityChange = (cityId: string) => {
    setFieldValue(['toLocation', 'cityId'], cityId)
    setToCity(cityId)
    setFieldValue(['toLocation', 'districtId'], undefined)
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

  if (isLoading) {
    return <Spinner />
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
                name={['fromLocation', 'cityId']}
                rules={[{ required: true, message: t('thisFieldIsRequired') }]}
              >
                <CityDropdown onChange={handleFromCityChange} value={fromCity} />
              </Form.Item>
              <Form.Item
                label={t('originDistrict')}
                name={['fromLocation', 'districtId']}
                className={styles.formItem}
                rules={[{ required: true, message: t('thisFieldIsRequired') }]}
              >
                <DistrictDropdown cityId={fromCity} onChange={handleFromDistrictChange} />
              </Form.Item>
            </Space>
            <ArrowRightOutlined />
            <Space direction='vertical' className='mb-12'>
              <Form.Item
                label={t('destinationCity')}
                name={['toLocation', 'cityId']}
                className={styles.formItem}
                rules={[{ required: true, message: t('thisFieldIsRequired') }]}
              >
                <CityDropdown onChange={handleToCityChange} value={toCity} />
              </Form.Item>
              <Form.Item
                label={t('destinationDistrict')}
                name={['toLocation', 'districtId']}
                className={styles.formItem}
                rules={[{ required: true, message: t('thisFieldIsRequired') }]}
              >
                <DistrictDropdown cityId={toCity} onChange={handleToDistrictChange} />
              </Form.Item>
            </Space>
          </Space>
          <div className='mb-20'>
            <FormInput
              name={['toLocation', 'address']}
              label={t('explicitAddress')}
              formProps={{
                rules: [{ required: true, message: t('thisFieldIsRequired') }]
              }}
            />
          </div>
          <div className={styles.truckIcon}>
            <IconTitle icon={<FaTruck />} label={t('vehicle')} />
          </div>
          <Space direction='horizontal' align='center' className='space-flex-item justify-center'>
            <FormInput
              label={t('plateNo')}
              name={['vehicle', 'plate', 'truck']}
              formProps={{
                rules: [{ required: true, message: t('thisFieldIsRequired') }]
              }}
            />
            <FormInput label={t('trailerNo')} name={['vehicle', 'plate', 'trailer']} />
          </Space>
          <Space direction='horizontal' align='center' className='space-flex-item justify-center'>
            <FormInput
              label={t('driverName')}
              name={['vehicle', 'name']}
              formProps={{
                rules: [{ required: true, message: t('thisFieldIsRequired') }]
              }}
            />
            <FormInput
              label={t('phoneNumber')}
              name={['vehicle', 'phone']}
              formProps={{
                rules: [{ required: true, message: t('thisFieldIsRequired') }]
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
              rules={[{ required: true, message: t('thisFieldIsRequired') }]}
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
                  if (!values || values.length < 1) {
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
                <Form.ErrorList className='text-red' errors={errors} />
              </Space>
            )}
          </Form.List>
        </Form>
      </Create>
    </div>
  )
}
