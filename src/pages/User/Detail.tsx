import React from 'react'
import { IResourceComponentsProps, useShow } from '@pankod/refine-core'
import { Show } from '@pankod/refine-antd'
import { Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { ContentDisplay } from 'components/ContentDisplay'

import { Spinner } from 'components/Spinner'

import { UserType } from 'types/user'
import styles from './Detail.module.scss'

export const UserDetail: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult
  const { t } = useTranslation()

  //@ts-ignore
  const record: UserType = data?.data

  if (isLoading) {
    return <Spinner />
  }

  if (!record) {
    return null
  }

  return (
    <div className={styles.detailWrapper}>
      <Show isLoading={isLoading} title={t('pageTitles.userDetails')}>
        <Space direction='horizontal' className={styles.locationContainer}>
          <ContentDisplay title={t('name')} text={record.name} />
          <ContentDisplay title={t('surname')} text={record.surname} />
        </Space>
        <Space direction='horizontal' className={`mt-12 ${styles.locationContainer}`}>
          <ContentDisplay title={t('phoneNumber')} text={record.phone} />
          <ContentDisplay title={t('email')} text={record.email ?? '-'} />
        </Space>
        <Space direction='horizontal' className={`mt-12 ${styles.locationContainer}`}>
          <ContentDisplay title={t('isAdmin')} text={record.isAdmin ? '✓' : 'X'} />
          <ContentDisplay title={t('isActive')} text={record.active ? '✓' : 'X'} />
        </Space>
      </Show>
    </div>
  )
}
