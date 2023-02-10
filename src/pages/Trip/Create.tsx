import React, { useEffect, useState } from 'react'
import { IResourceComponentsProps } from '@pankod/refine-core'
import { Create, Form, useForm, Input, DatePicker, Space, Button } from '@pankod/refine-antd'
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

const DEFAULT_PRODUCT_ROW = {
  categoryId: undefined,
  count: 0
}

export const TripCreate: React.FC<IResourceComponentsProps> = () => {
  const { t } = useTranslation()
  const { formProps, form, saveButtonProps } = useForm<CreateTripFormType>()
  const { setFieldValue, getFieldsValue } = form

  const [categoryList, setCategoryList] = useState<ProductCategoryType[]>()

  useEffect(() => {
    getProductCategoryList().then(setCategoryList)
  }, [])

  const getValue = (field: keyof CreateTripFormType) => {
    const fields = getFieldsValue() as CreateTripFormType
    return fields[field]
  }

  const handleCityChange = (cityId: string) => {
    setFieldValue('fromCity', cityId)
    setFieldValue('fromDistrict', undefined)
  }

  const handleDistrictChange = (districtId: string) => {
    setFieldValue('fromDistrict', districtId)
  }

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} form={form} layout='vertical'>
        <IconTitle icon={<FaTruck />} label={t('location')} />
        <Space direction='horizontal'>
          <div className='flex flex-col'>
            <Form.Item
              label='Vehicle'
              name={'fromCityId'}
              rules={[
                {
                  required: true
                }
              ]}
            >
              <CityDropdown title={t('sourceCity')} onChange={handleCityChange} value={getValue('fromCityId')} />
            </Form.Item>
            <Form.Item
              label='Vehicle'
              name={'fromDistrictId'}
              rules={[
                {
                  required: true
                }
              ]}
            >
              <DistrictDropdown
                title={t('sourceDistrict')}
                cityId={getValue('fromDistrictId') as string}
                onChange={handleDistrictChange}
              />
            </Form.Item>
          </div>
          <ArrowRightOutlined />
          <div className='flex flex-col'>
            <Form.Item
              label='Vehicle'
              name={'toCityId'}
              rules={[
                {
                  required: true
                }
              ]}
            >
              <CityDropdown title={t('destinationCity')} onChange={handleCityChange} value={getValue('toCityId')} />
            </Form.Item>
            <Form.Item
              label='Vehicle'
              name={'toDistrictId'}
              rules={[
                {
                  required: true
                }
              ]}
            >
              <DistrictDropdown
                title={t('destinationDistrict')}
                cityId={getValue('toDistrictId') as string}
                onChange={handleDistrictChange}
              />
            </Form.Item>
          </div>
        </Space>
        <Form.Item
          label={t('openAddress')}
          name={'destinationAddress'}
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <IconTitle icon={<FaTruck />} label={t('vehicle')} />
        <Space>
          <Form.Item
            label='Created By'
            name={['vehicle', 'plateNumber']}
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
            name={['vehicle', 'phone']}
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Space>
        <Form.Item label={t('notes')} name={'notes'}>
          <Input type='text' />
        </Form.Item>
        <Form.Item
          label='Estimated Depart Time'
          name={'estimatedDepartTime'}
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
        <Form.List name='products'>
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, ...restField }, index) => (
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
                  <Form.Item
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    label={t('count')}
                    {...restField}
                  >
                    <Input type='number' />
                  </Form.Item>
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
