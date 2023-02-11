import { Button, Collapse, DatePicker, Form, FormProps, Select } from '@pankod/refine-antd'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { tripStatusOptions } from 'constants/trip'
import { FormInput } from 'components/Form'
import { CityDropdown } from 'components/CityDropdown'
import { DistrictDropdown } from 'components/DistrictDropdown'
import { ProductCategoryType } from 'types/productCategoryType'
import { getProductCategoryList } from 'services'
import { Spinner } from 'components/Spinner'

const { RangePicker } = DatePicker
const { Panel } = Collapse

export interface ICategory {
  id: number
  title: string
}

export const TripListFilter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(true)

  const [categoryList, setCategoryList] = useState<ProductCategoryType[]>()
  const [fromCity, setFromCity] = useState<string | undefined>()
  const [toCity, setToCity] = useState<string | undefined>()

  useEffect(() => {
    getProductCategoryList()
      .then(setCategoryList)
      .then(() => setIsLoading(false))
  }, [])

  const handleFromCityChange = (cityId: string) => {
    setFromCity(cityId)
  }

  const handleToCityChange = (cityId: string) => {
    setToCity(cityId)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Collapse defaultActiveKey={['filters']}>
      <Panel header={t('filters')} key='filters'>
        <Form layout='vertical' {...formProps}>
          <div className='layout__filter-gap'>
            <div className='layout__filter'>
              <Form.Item label={t('status')} name='statuses'>
                <Select
                  allowClear
                  mode='multiple'
                  options={Object.values(tripStatusOptions).map((option) => ({ ...option, label: t(option.label) }))}
                  placeholder={t('statuses')}
                />
              </Form.Item>
              <Form.Item label={t('plates')} name='truckPlateNumber'>
                <FormInput name={'truckPlateNumber'} />
              </Form.Item>
              <Form.Item label={t('trailerNumbers')} name='trailerPlateNumber'>
                <FormInput name={'trailerPlateNumber'} />
              </Form.Item>
              <Form.Item label={t('createdAt')} name='createdAt'>
                <RangePicker />
              </Form.Item>
              <Form.Item label={t('originCity')} name='fromCityId'>
                <CityDropdown onChange={handleFromCityChange} />
              </Form.Item>
              <Form.Item label={t('originDistrict')} name='fromDistrictId'>
                <DistrictDropdown cityId={fromCity} />
              </Form.Item>
              <Form.Item label={t('destinationCity')} name='toCityId'>
                <CityDropdown onChange={handleToCityChange} />
              </Form.Item>
              <Form.Item label={t('destinationDistrict')} name='toDistrictId'>
                <DistrictDropdown cityId={toCity} />
              </Form.Item>
              <Form.Item label={t('category')} name='productCategoryIds'>
                <Select
                  allowClear
                  mode='multiple'
                  options={categoryList?.map((category) => ({ label: category.name, value: category._id }))}
                  placeholder={t('categories')}
                />
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            <Button htmlType='submit' type='primary'>
              {t('filter')}
            </Button>
          </Form.Item>
        </Form>
      </Panel>
    </Collapse>
  )
}
