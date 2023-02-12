import React, { useEffect, useState } from 'react'
import { IResourceComponentsProps } from '@pankod/refine-core'
import { Form, useForm, DatePicker, Button, Edit } from '@pankod/refine-antd'
import dayjs from 'dayjs'
import { Space } from 'antd'

import { useTranslation } from 'react-i18next'
import { FaBoxes, FaRoad, FaTruck } from 'react-icons/fa'
import { ArrowRightOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
import { CityDropdown } from 'components/CityDropdown'
import { IconTitle } from 'components/IconTitle'
import { DistrictDropdown } from 'components/DistrictDropdown'
import { FormInput } from 'components/Form'
import { getProductCategoryList } from 'services'
import { ProductCategoryType } from 'types/productCategoryType'
import { ProductCategoryDropdown } from 'components/ProductCategoryDropdown'
import { Spinner } from 'components/Spinner'
import { ProductType } from 'types/product'
import { TripType } from 'types/trip'

import styles from './Edit.module.scss'

const DEFAULT_PRODUCT_ROW = {
  categoryId: undefined,
  count: 0
}

export const TripEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, form, queryResult, onFinish } = useForm<TripType>()
  const { t } = useTranslation()

  const data = queryResult?.data?.data

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [products, setProducts] = useState<ProductType[]>(data?.products ?? [])
  const [fromCity, setFromCity] = useState<string | undefined>()
  const [toCity, setToCity] = useState<string | undefined>()
  const [fromDistrict, setFromDistrict] = useState<string | undefined>()
  const [toDistrict, setToDistrict] = useState<string | undefined>()

  useEffect(() => {
    if (data) {
      setProducts(data.products)
      setFromCity(data.fromLocation.cityId)
      setToCity(data.toLocation.cityId)
      setFromDistrict(data.fromLocation.districtId)
      setToDistrict(data.toLocation.districtId)
    }
  }, [data])

  const { setFieldValue, setFieldsValue, getFieldsValue, getFieldValue } = form

  const [categoryList, setCategoryList] = useState<ProductCategoryType[]>()
  useEffect(() => {
    getProductCategoryList()
      .then(setCategoryList)
      .then(() => setIsLoading(false))
  }, [])

  const handleFromCityChange = (cityId: string) => {
    setFieldsValue({ ...getFieldsValue(), cityId })
    setFromCity(cityId)
    setFieldValue('fromDistrictId', undefined)
    setFromDistrict(undefined)
  }

  const handleToCityChange = (cityId: string) => {
    setFieldsValue({ ...getFieldsValue(), cityId })
    setToCity(cityId)
    setFieldValue('toDistrictId', undefined)
    setToDistrict(undefined)
  }

  const handleFromDistrictChange = (districtId: string) => {
    setFieldValue('fromDistrictId', districtId)
    setFromDistrict(districtId)
  }

  const handleToDistrictChange = (districtId: string) => {
    setFieldValue('toDistrictId', districtId)
    setToDistrict(districtId)
  }

  const handleProductChange = (categoryId: string, index: number) => {
    const current = [...getFieldValue('products')]
    current[index] = { ...current[index], categoryId }
    setProducts(current)
    setFieldValue('products', current)
  }

  if (isLoading) {
    return <Spinner />
  }

  const handleSubmit = (values: TripType) => {
    const products = [...values.products]
    const editedProducts = []

    // CAN POSSIBLY BE DONE WAY MORE CLEANLY WITH .group() or .groupToMap()
    for (let product of products) {
      if (editedProducts.map((product) => product.categoryId).includes(product.categoryId)) {
        //@ts-ignore
        editedProducts.find((el) => el.categoryId === product.categoryId).count += product.count
      } else {
        editedProducts.push(product)
      }
    }

    const newValues = { ...values, products: editedProducts }

    onFinish(newValues)
  }

  return (
    <div className={styles.detailWrapper}>
      <Edit saveButtonProps={saveButtonProps}>
        <Form
          {...formProps}
          form={form}
          layout='vertical'
          id='editTripForm'
          onFinish={(values) => handleSubmit(values as TripType)}
        >
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
                <DistrictDropdown cityId={fromCity} onChange={handleFromDistrictChange} value={fromDistrict} />
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
                <DistrictDropdown cityId={toCity} onChange={handleToDistrictChange} value={toDistrict} />
              </Form.Item>
            </Space>
          </Space>
          <div className='mb-20'>
            <FormInput name={['toLocation', 'address']} label={t('explicitAddress')} maxLength={200} />
          </div>
          <div className={styles.truckIcon}>
            <IconTitle icon={<FaTruck />} label={t('vehicle')} />
          </div>
          <Space direction='horizontal' align='center' className='space-flex-item justify-center'>
            <FormInput label={t('plateNo')} name={['vehicle', 'plate', 'truck']} />
            <FormInput label={t('trailerNo')} name={['vehicle', 'plate', 'trailer']} />
          </Space>
          <Space direction='horizontal' align='center' className='space-flex-item justify-center'>
            <FormInput label={t('driverName')} name={['vehicle', 'name']} />
            <FormInput label={t('phoneNumber')} name={['vehicle', 'phone']} />
          </Space>
          <div className='mb-12'>
            <FormInput label={t('notes')} name={'notes'} maxLength={200} />
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
              <DatePicker
                showTime
                showSecond={false}
                format='YYYY-MM-DD HH:mm'
                disabledDate={(current) => moment().add(-1, 'days') >= current || moment().add(1, 'month') <= current}
              />
            </Form.Item>
          </div>
          <IconTitle icon={<FaBoxes />} label={t('tripContent')} />
          <Form.List
            name='products'
            initialValue={products}
            rules={[
              {
                validator: async (_, values) => {
                  if (!values || values.length < 1) {
                    return Promise.reject(new Error(t('errorMessages.minimumProducts')))
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
                        value={products[index]?.categoryId}
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
                            required: true,
                            message: t('errorMessages.minimumCount'),
                            validator: async (_, values) => {
                              if (values <= 0) {
                                return Promise.reject(new Error(t('errorMessages.minimumCount')))
                              }
                            }
                          }
                        ]
                      }}
                      mode='number'
                      min={0}
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
      </Edit>
    </div>
  )
}
