import React from 'react'
import { IResourceComponentsProps, useShow } from '@pankod/refine-core'
import { Show } from '@pankod/refine-antd'
import { Typography, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { FaBoxes, FaRoad, FaTruck } from 'react-icons/fa'
import { ArrowRightOutlined } from '@ant-design/icons'
import { TripType } from 'types/trip'
import { IconTitle } from 'components/IconTitle'
import { ContentDisplay } from 'components/ContentDisplay'
import { convertTimeToDateAndSplit } from 'utils/date'

import { Spinner } from 'components/Spinner'

import styles from './Detail.module.scss'

export const Detail: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult
  const { t } = useTranslation()

  //@ts-ignore
  const record: TripType = data?.data

  if (isLoading) {
    return <Spinner />
  }

  if (!record) {
    return null
  }

  const dateAndTime = convertTimeToDateAndSplit(record.estimatedDepartTime, 'DD/MM/YYYY')

  return (
    <div className={styles.detailWrapper}>
      <Show isLoading={isLoading}>
        <Typography.Title level={3}>{`${t('tripNo')}: ${record?.tripNumber}`}</Typography.Title>
        <IconTitle icon={<FaRoad />} label={t('location')} />
        <Space direction='horizontal' className={styles.locationContainer}>
          <Space direction='vertical' className={styles.contentContainer}>
            <ContentDisplay title={t('originCity')} text={record.fromLocation.cityName} />
            <ContentDisplay title={t('originDistrict')} text={record.fromLocation.districtName} />
          </Space>
          <ArrowRightOutlined />
          <Space direction='vertical' className={styles.contentContainer}>
            <ContentDisplay title={t('destinationCity')} text={record.toLocation.cityName} />
            <ContentDisplay title={t('destinationDistrict')} text={record.toLocation.districtName} />
          </Space>
        </Space>
        <Space direction='horizontal' className={`mb-12 ${styles.categorySpace}`}>
          <ContentDisplay title={t('explicitAddress')} text={record.toLocation.address} />
        </Space>
        <IconTitle icon={<FaTruck />} label={t('vehicle')} />
        <Space direction='horizontal' className='mb-12 space-flex-item'>
          <ContentDisplay title={t('plateNo')} text={record.vehicle.plate.truck} />
          <ContentDisplay title={t('trailerNo')} text={record.vehicle.plate.trailer} />
        </Space>
        <Space direction='horizontal' className={`mb-12 ${styles.categorySpace}`}>
          <ContentDisplay title={t('estimatedDepartDate')} text={dateAndTime.date} />
          <ContentDisplay title={t('estimatedDepartTime')} text={dateAndTime.time} />
        </Space>
        <div className='mt-12'>
          <IconTitle icon={<FaBoxes />} label={t('tripContent')} />
          {record.products.map((product) => (
            <Space key={product.categoryId} direction='horizontal' className={`mb-12 ${styles.categorySpace}`}>
              <ContentDisplay title={t('category')} text={product.categoryName} />
              <ContentDisplay title={t('packageCount')} text={product.count.toString()} />
            </Space>
          ))}
        </div>
      </Show>
    </div>
  )
}
