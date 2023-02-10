import React from 'react'
import { IResourceComponentsProps, useShow } from '@pankod/refine-core'
import { Show } from '@pankod/refine-antd'
import { Typography, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { FaBoxes, FaTruck } from 'react-icons/fa'
import { ArrowRightOutlined } from '@ant-design/icons'
import { TripType } from 'types/trip'
import { IconTitle } from 'components/IconTitle'
import { ContentDisplay } from 'components/ContentDisplay'
import { convertTimeToDateAndSplit } from 'utils/date'

import styles from './Detail.module.scss'

export const Detail: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult
  const { t } = useTranslation()

  //@ts-ignore
  const record: TripType = data?.data

  if (!record) {
    return null
  }

  const dateAndTime = convertTimeToDateAndSplit(record.estimatedDepartTime, 'DD/MM/YYYY')

  return (
    <div className={styles.detailWrapper}>
      <Show isLoading={isLoading}>
        <Typography.Title level={3}>{`${t('tripNo')}: ${record?.tripNumber}`}</Typography.Title>
        <IconTitle icon={<FaTruck />} label={t('tripDetails')} />
        <Space direction='horizontal' className='mb-12'>
          <ContentDisplay title={t('originCity')} text={record.fromLocation.cityId} />
          <ArrowRightOutlined />
          <ContentDisplay title={t('destination')} text={record.toLocation.cityId} />
        </Space>
        <Space direction='horizontal' className='mb-12'>
          <ContentDisplay title={t('originDistrict')} text={record.fromLocation.districtId} />
          <ArrowRightOutlined />
          <ContentDisplay title={t('destination')} text={record.toLocation.districtId} />
        </Space>
        <Space direction='horizontal' className='mb-12'>
          <ContentDisplay title={t('explicitAddress')} text={record.toLocation.address} />
        </Space>
        <Space direction='horizontal' className='mb-12'>
          <ContentDisplay title={t('plateNo')} text={record.vehicle.plateNumber} />
        </Space>
        <Space direction='horizontal' className='mb-12'>
          <ContentDisplay title={t('estimatedDepartDate')} text={dateAndTime.date} />
          <ContentDisplay title={t('estimatedDepartTime')} text={dateAndTime.time} />
        </Space>
        <div className='mt-12'>
          <IconTitle icon={<FaBoxes />} label={t('tripContent')} />
          {record.products.map((product) => (
            <Space key={product.categoryId} direction='horizontal' className='mb-12'>
              <ContentDisplay title={t('category')} text={product.categoryId} />
              <ContentDisplay title={t('packageCount')} text={product.count.toString()} />
            </Space>
          ))}
        </div>
      </Show>
    </div>
  )
}
