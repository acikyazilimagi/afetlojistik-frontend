import React from 'react'
import { IResourceComponentsProps, useShow } from '@pankod/refine-core'
import { Show } from '@pankod/refine-antd'
import { Typography, Space, Tag } from 'antd'
import { useTranslation } from 'react-i18next'
import { FaBoxes, FaRoad, FaTruck } from 'react-icons/fa'
import { ArrowRightOutlined } from '@ant-design/icons'
import moment from 'moment'
import { TripType } from 'types/trip'
import { IconTitle } from 'components/IconTitle'
import { ContentDisplay } from 'components/ContentDisplay'
import { convertTimeToDateAndSplit } from 'utils/date'

import { Spinner } from 'components/Spinner'

import { TripStatuses, tripStatusOptions } from 'constants/trip'
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

  const arrived = record.statusChangeLog.find((log) => log.status === TripStatuses.Arrived)

  return (
    <div className={styles.detailWrapper}>
      <Show isLoading={isLoading}>
        <Space direction='horizontal' className='mb-12 space-flex-item'>
          <Typography.Title level={3}>{`${t('tripNo')}: ${record?.tripNumber}`}</Typography.Title>
          <Tag color={tripStatusOptions[record.status].color}>
            {t(tripStatusOptions[record.status].label)}{' '}
            {arrived ? (
              <span className='ml-4'>{moment(arrived.createdAt).locale('tr').format('DD/MM/YYYY HH:mm')}</span>
            ) : null}
          </Tag>
        </Space>
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
          <ContentDisplay title={t('plateNo')} text={record.vehicle?.plate?.truck} />
          <ContentDisplay title={t('trailerNo')} text={record.vehicle?.plate?.trailer} />
        </Space>
        <Space direction='horizontal' className='mb-12 space-flex-item'>
          <ContentDisplay title={t('driverName')} text={record.vehicle?.name} />
          <ContentDisplay title={t('phoneNumber')} text={record.vehicle?.phone} />
        </Space>
        <Space direction='horizontal' className='mb-12 space-flex-item'>
          <ContentDisplay title={t('note')} text={record.notes} />
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
